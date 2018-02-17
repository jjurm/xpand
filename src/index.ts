import app from './App'
import express from "express"

const port = process.env.PORT || 3000;

app.listen(port, (err: express.Errback) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`server is listening on ${port}`)
});
