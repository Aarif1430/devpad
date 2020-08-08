!function(e){function __webpack_require__(n){if(t[n])return t[n].exports;var s=t[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,__webpack_require__),s.loaded=!0,s.exports}var t={};return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.p="",__webpack_require__(0)}([function(e,t,n){(function(e){"use strict";function asMB(e){return null===e?"null":void 0===e?"undefined":(e/1048576).toFixed(2)+"MB"}function auth(e,t){return function(n,s,o){var a=r(n);return a&&a.name===e&&a.pass===t?void o():(s.set("WWW-Authenticate","Basic realm=Authorization Required"),s.sendStatus(401))}}var t=n(2),s=n(3),o=n(4),r=n(5),a=n(6),i=n(7),u=function(){function Signaler(){this.app=s(),this.useDebug=!1,this.useLog=!0,this.numSockets=0,this.numPadsMemo=null}return Signaler.prototype.start=function(e,n){var s=this;this.port=e,this.host=n,this.server=this.app.listen(e,function(){console.log("Signaler listening on "+n+":"+e)}),this.app.set("json spaces",2),this.app.use("/bpstatus",auth(i.STATUS_USERNAME,i.STATUS_PASSWORD)),this.app.get("/bpstatus",function(e,t){return t.json(s.getStatus())}),this.io=t(this.server),this.io.of("/bp").on("connection",function(e){s.log(e,"connected"),s.numSockets++,e.on(a.PeersRequest.messageType,function(t){s.log(e,a.PeersRequest.messageType,t),s.broadcastToPad(e,t.padId,a.PeersRequest.messageType,t)}),e.on(a.PeersUpdate.messageType,function(t){s.log(e,a.PeersUpdate.messageType,t),s.broadcastToPad(e,t.padId,a.PeersUpdate.messageType,t)}),e.on(a.PadDisconnect.messageType,function(t){s.log(e,a.PadDisconnect.messageType,t),s.broadcastToPad(e,t.padId,a.PadDisconnect.messageType,t)}),e.on(a.ConnectionRequest.messageType,function(t){s.log(e,a.ConnectionRequest.messageType,t),s.broadcastToPad(e,t.padId,a.ConnectionRequest.messageType,t)}),e.on(a.ConnectionResponse.messageType,function(t){s.log(e,a.ConnectionResponse.messageType,t),s.broadcastToPad(e,t.padId,a.ConnectionResponse.messageType,t)}),e.on("disconnect",function(){s.log(e," disconnected"),s.numSockets--})})},Signaler.prototype.broadcastToPad=function(e,t,n,s){t||this.log(e,"Invalid padId: ",t);var o=t.substr(0,50);e.join(o),this.numPadsMemo=null,e.broadcast.to(o).emit(n,s),this.debug(e,n," forwarded")},Signaler.prototype.getStatus=function(){var e=o.loadavg()[0],t=o.totalmem(),n=o.freemem();if(null===this.numPadsMemo){var s=0,r=this.io.sockets.adapter.rooms;for(var a in r)r.hasOwnProperty(a)&&s++;this.numPadsMemo=s}return{app:{numClients:this.numSockets,numPads:this.numPadsMemo},sys:{load:e,totalMemory:t,totalMemoryMB:asMB(t),freeMemory:n,freeMemoryMB:asMB(n),usedMemory:t-n,usedMemoryMB:asMB(t-n)}}},Signaler.prototype.debug=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];this.log.apply(this,[e,"sent DEBUG: "].concat(t)),this.useDebug&&e.emit("DEBUG",t?t.join(""):"")},Signaler.prototype.log=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];this.useLog&&console.log.apply(console,[e.id].concat(t))},Signaler}();if(n.c[0]===e){var c=a.getSignalerPort(),p=a.getSignalerHost();console.log('Attempting to start bp-signaler on "'+p+'" port '+c),(new u).start(c,p)}}).call(t,n(1)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){e.exports=require("socket.io")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("os")},function(e,t){e.exports=require("basic-auth")},function(e,t){"use strict";function getSignalerURI(){return"https://node-server-executor.herokuapp.com/bp"}function getSignalerHost(){return process.env.NODE_IP?process.env.NODE_IP:t.USE_LOCAL_SIGNALER?"127.0.0.1":t.REMOTE_SIGNALER_HOST}function getSignalerPort(){return process.env.NODE_PORT?process.env.NODE_PORT:t.USE_LOCAL_SIGNALER?3e3:t.REMOTE_SIGNALER_PORT}function getSignalerProtocol(){return t.USE_LOCAL_SIGNALER?"http":"https"}t.USE_LOCAL_SIGNALER=!1,t.REMOTE_SIGNALER_HOST="node-server-executor.herokuapp.com",t.REMOTE_SIGNALER_PORT=8443;var n=function(){function PeersRequest(){}return PeersRequest.messageType="PeersRequest",PeersRequest}();t.PeersRequest=n;var s=function(){function PeersUpdate(){}return PeersUpdate.messageType="PeersUpdate",PeersUpdate}();t.PeersUpdate=s;var o=function(){function ConnectionRequest(){}return ConnectionRequest.messageType="ConnectionRequest",ConnectionRequest}();t.ConnectionRequest=o;var r=function(){function ConnectionResponse(){}return ConnectionResponse.messageType="ConnectionResponse",ConnectionResponse}();t.ConnectionResponse=r;var a=function(){function PadUpdate(){}return PadUpdate.messageType="PadUpdate",PadUpdate}();t.PadUpdate=a;var i=function(){function PadDisconnect(){}return PadDisconnect.messageType="PadDisconnect",PadDisconnect}();t.PadDisconnect=i;var u=function(){function UserStatusRequest(){}return UserStatusRequest.messageType="UserStatusRequest",UserStatusRequest}();t.UserStatusRequest=u;var c=function(){function UserStatusResponse(){}return UserStatusResponse.messageType="UserStatusResponse",UserStatusResponse}();t.UserStatusResponse=c;var p=function(){function PadEdit(){}return PadEdit}();t.PadEdit=p;var d=function(){function Cursor(){}return Cursor}();t.Cursor=d,t.getSignalerURI=getSignalerURI,t.getSignalerHost=getSignalerHost,t.getSignalerPort=getSignalerPort,t.getSignalerProtocol=getSignalerProtocol},function(e,t){"use strict";t.STATUS_USERNAME="admin",t.STATUS_PASSWORD="bpstatus"}]);