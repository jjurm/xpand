function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function getOrientation() {
    return Math.abs(<number>window.orientation) - 90 == 0 ? "landscape" : "portrait";
}

export function getScreenWidth() {
    return getOrientation() == "landscape" ? window.innerHeight : window.innerWidth;
}

export function getScreenHeight() {
    return getOrientation() == "landscape" ? window.innerWidth : window.innerHeight;
}

export let device_id = guid();


