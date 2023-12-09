const handleHomeHello = (req, res) => {
    return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
    const name = "Hiếu";
    return res.render("user.ejs", { name });
};

module.exports = {
    handleHomeHello,
    handleUserPage,
};
