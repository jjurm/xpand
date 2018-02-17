import {UpdateMessage} from "./models";

let ws : WebSocket;

function start() {

    ws = new WebSocket("ws://localhost:8080/");
    ws.onopen = event => {

        // socket opened
        console.log("Socket opened")
    };
    ws.onmessage = event => {
        let data: UpdateMessage = JSON.parse(event.data);
        console.log("Got time " + data.time)
    }

}

start();
