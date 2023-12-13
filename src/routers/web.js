import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRouters = (app) => {
    router.get("/", homeController.handleHomeHello);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    // tham số động dùng dấu :
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.get("/update-user/:id", homeController.handleGetUpdateUserPage);
    router.post("/users/update-user/:id", homeController.handleUpdateUser);

    // khai báo này là app bắt đầu từ domain luôn
    return app.use("/", router);
    // Còn nếu ghi abc thì mọi route đều phải đi qua abc trước
    // return app.use("/abc", router); http://localhost:8888/abc/about
};

export default initWebRouters;
