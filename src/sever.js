import express from "express";
import configViewEngine from "./views/viewEngine";
import initWebRouter from "./routers/web";
require("dotenv").config();
import bodyParser from "body-parser";
const app = express();

// tạo views engine là cái để tạo ra html ??
// nói cho nó biết templete nào để tạo views và các file view đó nằm ở đâu!
configViewEngine(app);

// congig body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

// khởi tạo webrouter là thằng điều hướng ??
initWebRouter(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(">>>>>>>>>>> app listening on port vip a: " + PORT);
});
