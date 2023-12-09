import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const handerAbout = (req, res) => {
    return res.send("<h1>About z</h1>");
};
const initWebRouters = (app) => {
    router.get("/", homeController.handleHomeHello);

    router.get("/about", handerAbout);
    router.get("/user", homeController.handleUserPage);

    // khai báo này là app bắt đầu từ domain luôn
    return app.use("/", router);
    // Còn nếu ghi abc thì mọi route đều phải đi qua abc trước
    // return app.use("/abc", router); http://localhost:8888/abc/about
};

export default initWebRouters;
