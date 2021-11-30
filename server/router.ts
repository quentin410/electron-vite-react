const Router = require("koa-router");
const router = new Router();

router.get("/(.*)", (ctx: any, next: Function) => {
  if(require("electron-is-dev")){
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <script type="module" src="http://localhost:3000/@vite/client"></script>
        <script type="module">
          import RefreshRuntime from "http://localhost:3000/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="http://localhost:3000/src/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>pre-appx-debug-tool</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="http://localhost:3000/src/main.tsx"></script>
      </body>
    </html>
  `;
  } else {
    const html = require("fs").readFileSync(require('path').resolve(__dirname, "../server/public/index.html"), { encoding: "utf8" });
    const finalHtml = html.replace(/\/assets/g, '');
    ctx.body = finalHtml;
  }
});

module.exports = router;
