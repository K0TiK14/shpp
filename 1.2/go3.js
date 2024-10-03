// task 1.2.4
function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (;;) {
    try {
      fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      break; /* windows */
    }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10) break;
      was10++;
    } else was10 = 0;
    res += new String(buffer);
  }

  return res;
}
const log = (s) => console.log(s);
let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body) {
  log(
    "HTTP/1.1 " +
      statusCode +
      " " +
      statusMessage +
      `\nServer: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8`
  );

  if (statusCode == 200) {
    log("Content-Length: " + body.length + "\n\n" + body);
  }
  if (statusCode == 400 || statusCode == 404) {
    log("Content-Length: 9" + "\n\nnot found");
  }
}

function processHttpRequest(method, uri, headers, body) {
  let passwordsLines = undefined;
  try {
    passwordsLines = require("fs")
      .readFileSync("passwords.txt", "utf8")
      .split("\n")
      .map((line) => line.trim());
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    outputHttpResponse("500", "Internal Server Error", headers, body);
    return;
  }
  const [bodyLogin, bodyPassword] = body.split("&");
  const loginPassword = (
    bodyLogin.split("=")[1] +
    ":" +
    bodyPassword.split("=")[1]
  ).trim();
  const searchResultIndex = passwordsLines.findIndex(
    (passwordsLine) => passwordsLine == loginPassword
  );

  if (uri !== "/api/checkLoginAndPassword") {
    outputHttpResponse("404", "Not Found", headers, body);
  } else if (headers["Content-Type"] !== "application/x-www-form-urlencoded") {
    outputHttpResponse("400", "Bad Request", headers, body);
  } else if (searchResultIndex === -1) {
    outputHttpResponse("200", "OK", headers, "user not found");
  } else if (searchResultIndex !== -1) {
    outputHttpResponse(
      "200",
      "OK",
      headers,
      '<h1 style="color:green">FOUND</h1>'
    );
  }
}

function parseTcpStringAsHttpRequest(string) {
  const lines = string.split("\n");
  const emptyLineIndex = lines.findIndex((line) => line.trim() === "");
  const method = lines[0].split(" ")[0];
  const uri = lines[0].split(" ")[1];
  const body = lines[emptyLineIndex + 1];
  const headersLines = lines.splice(1, emptyLineIndex - 1);

  const headers = headersLines.reduce((acc, header) => {
    const [key, value] = header.split(": ");
    if (key.toUpperCase() === "HOST") {
      acc["Host"] = value;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});

  return {
    method: method,
    uri: uri,
    headers: headers,
    body: body,
  };
}

let http = parseTcpStringAsHttpRequest(contents);
// console.log(http);
processHttpRequest(http.method, http.uri, http.headers, http.body);
