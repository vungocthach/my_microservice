const express = require("express");
const { PORT } = require("./config");
const service = require("./service");

const StartServer = async () => {
    const app = express();
    
    app.use(express.json());

    app.get("/", async (req, res, next) => {
        try {
            const users = await service.GetAll();

            return res.status(200).json({ status: true, users });
        } catch (error) {
            return res.status(500).json({ status: false, error });
        }
    });

    app.get("/findById/:id", async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await service.GetById(id);

            return res.status(200).json({ status: true, user: user });
        } catch (error) {
            return res.status(500).json({ status: false, error });
        }
    });

    app.get("/f/:username", async (req, res, next) => {
        try {
            const { username } = req.params;
            const user = await service.FindUser(username);

            return res.status(200).json({ status: true, user });
        } catch (error) {
            return res.status(500).json({ status: false, error });
        }
    });

    app.get("/setToDos/:number", async (req, res, next) => {
        try {
            const { number } = req.params;
            const newNumber = await service.SetNumberTask(number);

            return res.status(200).json({ status: true, newNumber });
        } catch (error) {
            return res.status(500).json({ status: false, error });
        }
    });

    app.post("/c/", async (req, res, next) => {
        try {
            const { user } = req.body;
            const success = await service.create(user);

            return res.status(200).json({ status: success });
        } catch (error) {
            return res.status(500).json({ status: false, error });
        }
    });

    app.delete("/d/", async (req, res, next) => {
        try {
            const { userId } = req.body;
            const success = await service.delete(userId);

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
