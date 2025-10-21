const http = require("http");

const server = new http.Server();

server.listen(3000, "localhost", () => {
  console.log("Listening");
});

server.on("request", (req, res) => {
  switch (req.method) {
    case "GET":
      handleGetRequests(req, res);
      break;
    case "POST":
      handlePostRequests(req, res);
      break;
    default:
      res.statusCode = 404;
      res.end("What you are looking for, is not here");
  }
});
