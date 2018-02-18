import http from "http";
import WebSocket from "ws";
//import express from "express";
//import url from "url";

import app from './App';
import {AnchoredScreen, SwipeMessage, UpdateMessage} from "./models";
import {Phone, PhoneCommunicator} from "./PhoneCommunicator";
import {strictEqual} from "assert";
import {getScreenHeight, getScreenWidth} from "./utils";

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const comm = new PhoneCommunicator();

wss.on('connection', function connection(ws: any, req) {
    //const location = url.parse(req.url!, true);

    ws.on('message', function incoming(message: string) {
        let msg = JSON.parse(message) as SwipeMessage;
        console.log(msg);
        if (comm.findPhone(msg.device_id) == null) {
            comm.addPhone(new Phone(
                msg.device_id,
                new AnchoredScreen(0, 0, msg.screenX, msg.screenY, 0),
                ws))
        }
    });

    /*let msg = new UpdateMessage(8);
    ws.send(JSON.stringify(msg));*/
});
wss.on('error', () => console.log('errored'));

server.listen(8080, "0.0.0.0", function listening() {
    console.log('Listening on %d', server.address().port);
});
