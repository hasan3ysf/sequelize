/*global require:false, process:false, console:false*/

var nodeStatic = require('node-static')
  , http       = require('http')
  , fileServer = new nodeStatic.Server('./')

http.createServer(function (request, response) {
  request.addListener('end', function () {
    var url = request.url

    if (!!url.match(/^\/[^\.]+$/)) {
      // is it a normal route ?
      // render the index.html... backbone will do the rest for us

      fileServer.serveFile('index.html', 200, {}, request, response)
    } else {
      // is it an asset file ?
      // let the static file server deliver it

      fileServer.serve(request, response)
    }
  })
}).listen(process.env.PORT || 8080, process.env.HOST, function() {
  console.log("sequelizejs.com listening on port %s:%d", this.address().address, this.address().port)
})