// не звертайте увагу на цю функцію
// вона потрібна для того, щоб коректно зчитувати вхідні данні
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

// ось цю функцію, власне, і треба написати
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
console.log(JSON.stringify(http, undefined, 2));
