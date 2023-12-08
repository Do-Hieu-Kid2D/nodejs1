import express from "express";

const router = express.Router();

const initWebRouters = (app) => {
    router.get("/", (req, res) => {
        return res.send("Trang chủ init vip quá đi ƠI ơi í í");
    });
    return app.use("/", router);
};

export default initWebRouters;
