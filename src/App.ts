import express from "express"

class App {
    public express: express.Express;

    constructor () {
        this.express = express();
        this.mountRoutes()
    }

    private mountRoutes (): void {
        const router = express.Router();
        router.get("/", (req, res) => {
            res.sendFile("index.html", { root: __dirname })
        });
        router.get('/test', (req, res) => {
            res.json({
                message: 'Hello World!'
            })
        });
        this.express.use('/', router)
    }
}

export default new App().express
