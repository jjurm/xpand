import {UpdateMessage} from "./models";
import {Swipe} from "./gestures/swipe"

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

    let swipe:Swipe = new Swipe(msg => {
        ws.send(msg);
    });
    swipe.setupGestures()

}

start();
