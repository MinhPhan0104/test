import socketIOClient from "socket.io-client";

const WS_SERVER_HOST = "http://34.16.156.104";
// const WS_SERVER_HOST = "http://localhost";
const WS_SERVER_PORT = 80;

const NUMBER_OF_CONNECTION = 50000;
const CONNECTION_PER_BATCH = 100;
const connections: Array<any> = [];
const conStatus: Array<boolean> = new Array(NUMBER_OF_CONNECTION).fill(false);

let startTime = 0;

function getConnectionStatus() {
  let count = 0;
  let total = connections.length;
  for (let i = 0; i < total; i++) {
    if (connections[i].connected) {
      count++;
    }
  }

  const endTime = performance.now();
  const delta = (endTime - startTime) / 1000;
  console.log(`Number of connection: ${count}/${total} take ${delta} seconds \n`);
  startTime = performance.now();
}

function createBatchConnection(connIdx: number, conInBatch: number) {
  if (connIdx + conInBatch > NUMBER_OF_CONNECTION) {
    // Periodcally check connection status after connecting process is done
    setInterval(() => {
      getConnectionStatus();
    }, 10000);
    return;
  } else if (((connIdx + 1) % 500) === 1) {
    getConnectionStatus();
  }

  const shouldCreateNext = () => {
    return conStatus.slice(connIdx, connIdx + conInBatch).every(v => v);
  };

  for (let i = connIdx; i < connIdx + conInBatch; i++) {
    const con = socketIOClient(
      `${WS_SERVER_HOST}:${WS_SERVER_PORT}`,
      { reconnection: true },
    );
    connections.push(con);

    con.on("connect", () => {
      if (conStatus[i]) {
        return;
      }
      conStatus[i] = true;
      if (shouldCreateNext()) {
        setTimeout(() => {
          createBatchConnection(connIdx + conInBatch, conInBatch);
        });
      }
    });
  }
}

function connect() {
  startTime = performance.now();
  createBatchConnection(0, CONNECTION_PER_BATCH);
}

setTimeout(connect, 5000);





import express from "express";
const app = express();
const port = 8080;
app.get('/', (req, res) => {
  res.send('OK');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
