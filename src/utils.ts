
export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function getOrientation(){
    return Math.abs(<number>window.orientation) - 90 == 0 ? "landscape" : "portrait";
}
export function getMobileWidth(){
    return getOrientation() == "landscape" ? screen.availHeight : screen.availWidth;
}
export function getMobileHeight(){
    return getOrientation() == "landscape" ? screen.availWidth : screen.availHeight;
}
