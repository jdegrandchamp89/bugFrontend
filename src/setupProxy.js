const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("http://localhost:3000/bugs*", { target: "https://jrd-bugtracker.herokuapp.com/" }));
};