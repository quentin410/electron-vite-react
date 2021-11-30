const Koa = require("koa");
const Open = require("open");
const serve = require("koa-static");
const route = require("./router");
const bodyParser = require('koa-body-parser')

const App = new Koa();

module.exports = async () => {
  App.use(bodyParser())
  App.use(serve(require('path').resolve(__dirname, '../server/public/assets')));
  App.use(route.routes());
  App.listen(9000);
};
