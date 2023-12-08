import express from "express";
import configViewEngine from "./views/viewEngine";
import initWebRouter from "./routers/web";
require("dotenv").config();

const app = express();

// tạo views engine là cái để tạo ra html ??
configViewEngine(app);

// khởi tạo webrouter là thằng điều hướng ??
initWebRouter(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(">>>>>>>>>>> app listening on port vip a: " + PORT);
});
