import http from "http";
import WebSocket from "ws";
//import express from "express";
//import url from "url";

import app from './App';
import {UpdateMessage} from "./models";

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
    //const location = url.parse(req.url!, true);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    let msg = new UpdateMessage(8);
    ws.send(JSON.stringify(msg));
});

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});
