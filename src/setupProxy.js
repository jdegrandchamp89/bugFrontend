const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/*", { target: "https://jrd-bugtracker.herokuapp.com/" }));
};