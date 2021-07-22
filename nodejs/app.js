const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Greeting title</title></head>");
    res.write(
      '<body><h1>Greetings!</h1><form action="/create-user"method="POST"><input type="text" name="username"><input type="submit" value="Submit"></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/create-user" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      console.log(message);
    });
  }

  if (req.url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write(
      "<body><ul><li>User1</li><li>User2</li><li>User3</li><li>User4</li><li>User5</li></ul</body>"
    );
    res.write("</html>");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Greeting title</title></head>");
  res.write("<body>Default</body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
