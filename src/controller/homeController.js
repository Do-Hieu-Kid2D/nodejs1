import userServie from "../service/userService";

const handleHomeHello = (req, res) => {
    return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
    let allUser = await userServie.getAllUsers();
    // console.log("xxx", allUser);
    return res.render("user.ejs", { allUser: allUser });
};

const handleCreateNewUser = async (req, res) => {
    // console.log(req.body);
    // Thông tin đi theo form reqets đến rồi lấy đc ngon như nàu là nhờ vào body-parser
    try {
        let username = req.body.inputUsername;
        let email = req.body.inputEmail;
        let password = req.body.inputPassword;
        let inputNameDisplay = req.body.inputNameDisplay;

        await userServie.newUser(username, email, password, inputNameDisplay);
        // Gửi phản hồi về client hoặc thực hiện chuyển hướng
        res.redirect("/user");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

const handleDeleteUser = (req, res) => {
    userServie.deleteUser(req.params.id);
    return res.redirect("/user");
};

const handleGetUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let currentUser = await userServie.getUserByID(id);
    let userData = {};
    if (currentUser && currentUser.length > 0) {
        userData = currentUser[0];
    }
    res.render("user-update.ejs", { userData });
};

const handleUpdateUser = (req, res) => {
    let id = req.params.id;
    let username = req.body.inputUsername;
    let email = req.body.inputEmail;
    let password = req.body.inputPassword;
    let inputNameDisplay = req.body.inputNameDisplay;
    let passdefault = req.body.passdefault;
    userServie.updateUser(
        id,
        username,
        email,
        password,
        inputNameDisplay,
        passdefault
    );
    return res.redirect("/user");
};

module.exports = {
    handleHomeHello,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    handleGetUpdateUserPage,
    handleUpdateUser,
};
