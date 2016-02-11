'use strict'
module.exports = function openConnection(self) {
  //var self = this;
  var conn = {};
  if (conn.readyState === undefined || conn.readyState > 1) {
    // Connect to the web socket server
    var uri = "ws://jukebox.local:8081";
    conn = new WebSocket(uri);

    conn.onopen = function(){
      console.log("Socket opened");
    }

    conn.onmessage = function(msg){
      var data = JSON.parse(msg.data);
      console.log(data);
      if ("track" in data) {
        console.log('update track');
        self.setState({
          track: data["track"]
        })
      }
      if ("rating" in data) {
        console.log('update rating');
        self.setState({
          rating: data["rating"]
        })
      }
    }
  }
}
