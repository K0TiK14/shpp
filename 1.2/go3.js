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

let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body, sum) {
  if (statusCode == 200) {
    console.log(
      "HTTP/1.1 " +
        statusCode +
        " " +
        statusMessage +
        "\n" +
        `Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: ` +
        sum.toString().length +
        "\n\n" +
        sum
    );
  }
  if (statusCode == 400 || statusCode == 404) {
    console.log(
      "HTTP/1.1 " +
        statusCode +
        " " +
        statusMessage +
        "\n" +
        `Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: 9` +
        "\n\nnot found"
    );
  }
}

function processHttpRequest(method, uri, headers, body) {
  const passwords = require("fs").readFileSync("passwords.txt");

  if (uri !== "/api/checkLoginAndPassword") {
    outputHttpResponse("404", "Not Found", headers, body);
  } else if (headers["Content-Type"] !== "application/x-www-form-urlencoded") {
    outputHttpResponse("400", "Bad Request", headers, body);
  } else if (method === "POST") {
    outputHttpResponse("200", "OK", headers, body);
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
