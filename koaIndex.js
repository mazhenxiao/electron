const fs = require("fs");
const koa = require("koa");
const Router = require("koa-router");
const serve = require('koa-static');
const app = new koa();
const router = new Router();

router.get("/demo",(ctx,next)=>{
    let txt = fs.readFileSync("./demo.html","utf8");
    ctx.body = txt;
    next(ctx);
})
app.use(serve("."))
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(9090)