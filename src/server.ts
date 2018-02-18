import http from "http";
import WebSocket from "ws";
//import express from "express";
//import url from "url";

import app from './App';
import {SwipeMessage, UpdateMessage} from "./models";
import {PhoneCommunicator} from "./PhoneCommunicator";

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const comm = new PhoneCommunicator();

wss.on('connection', function connection(ws, req) {
    //const location = url.parse(req.url!, true);

    ws.on('message', function incoming(message: string) {
        let msg = JSON.parse(message) as SwipeMessage;
        console.log(msg);
    });

    /*let msg = new UpdateMessage(8);
    ws.send(JSON.stringify(msg));*/
});
wss.on('error', () => console.log('errored'));

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});
