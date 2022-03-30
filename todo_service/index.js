const express = require("express");
const { PORT } = require("./config");
const service = require("./service");

const StartServer = async () => {
    const app = express();

    app.get("/:userId", async (req, res, next) => {
        try {
            const { userId } = req.params;
            const todos = await service.GetAll(userId);

            return res.status(200).json({ status: true, todos });
        } catch (error) {
            return res.status(500).json({ status: false, error });
        }
    });

    // app.get("/f/:todoId", async (req, res, next) => {
    //     try {
    //         const { todoId } = req.params;
    //         const todo = await service.GetOne(todoId);

    //         return res.status(200).json({ status: true, todo });
    //     } catch (error) {
    //         return res.status(500).json({ status: false, error });
    //     }
    // });

    // app.post("/u/", async (req, res, next) => {
    //     try {
    //         const { todo } = req.body;
    //         const success = await service.update(todo);

    //         return res.status(200).json({ status: success });
    //     } catch (error) {
    //         return res.status(500).json({ status: false, error });
    //     }
    // });

    app.post("/c/", async (req, res, next) => {
        try {
            const { todo } = req.body;
            const success = await service.create(todo);

            return res.status(200).json({ status: success });
        } catch (error) {
            return res.status(500).json({ status: false, error });
        }
    });

    app.delete("/d/", async (req, res, next) => {
        try {
            const { todoId } = req.body;
            const success = await service.delete(todoId);

            return res.status(200).json({ status: success });
        } catch (error) {
            return res.status(500).json({ status: false, error });
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
