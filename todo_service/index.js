const express = require("express");
const { PORT } = require("./config");
const service = require("./service");

const StartServer = async () => {
    const app = express();

    app.use(express.json());

    app.get("/", async (req, res, next) => {
        try {
            const todos = await service.GetAll();

            return res.status(200).json({ status: true, todos });
        } catch (error) {
            return res.status(500).json({ status: false, error });
        }
    });

    app.get("/findByUserId/:userId", async (req, res, next) => {
        try {
            const { userId } = req.params;
            const todos = await service.GetByUserId(userId);

            return res.status(200).json({ status: true, todos });
        } catch (error) {
            return res.status(500).json({ status: false, error });
        }
    });

    app.post("/c/", async (req, res, next) => {
        try {
            console.log(`Have req with body =` + JSON.stringify(req.body));
            const { todo } = req.body;
            console.log(todo);
            const success = await service.Create(todo);

            return res.status(200).json({ status: success });
        } catch (error) {
            return res.status(500).json({ status: false, error: "Server have caught unexpected error" });
        }
    });

    app.delete("/d/", async (req, res, next) => {
        try {
            const { todoId } = req.body;
            const success = await service.Delete(todoId);

            return res.status(200).json({ status: success });
        } catch (error) {
            return res.status(500).json({ status: false, error: "Server have caught unexpected error"  });
        }
    });

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    }).on("error", (err) => {
        console.log(err);
        process.exit();
    });
};

StartServer();
