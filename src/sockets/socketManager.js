//@TODO Convert to a class to allow variable functionality

let AlertSeverity = Object.freeze({
  critical: 'critical',
  error: 'error',
  warning: 'warning',
  info: 'info'
})

let AlertType = Object.freeze({
  notif: "notification",
  command: "command",
  webhook: "webhook",
  log: "log",
  push: "push_notification",
  sms: "sms",
  email: "email",
  shutdown: "shutdown",
  restart: "restart"
})

function socket() {
  const WebSocket = require("ws");

  const wss = new WebSocket.Server({ port: 8081 });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    let welcomeText = {
      message: "welcome to the IoConnect server",
      timestamp: new Date().toLocaleString(),
      timeformat: "locale_string",
      senderId: "server",
    };

    // Send a welcome message to the connected client
    ws.send(JSON.stringify(welcomeText));

    // Listen for messages from the client
    ws.on("message", (message) => {
      let payload = JSON.parse(message);
      console.log(
        `Received msg: ${payload.message} sent at ${payload.timestamp} by ${payload.senderId}`
      );

      // Send the received message back to all connected clients (broadcast)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`${JSON.stringify(payload)}`);
        }
      });
    });

    // Handle the connection close event
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
}

module.exports = socket;
