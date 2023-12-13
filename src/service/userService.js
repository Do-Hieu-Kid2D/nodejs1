import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

import mysql1 from "mysql2";
// create connecton to databse
const connection1 = mysql1.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
});

import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";

// băm mật khẩu
const hashPassword = (userPassword) => {
    const hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

// insert 1 user
const newUser = async (username, email, password, inputNameDisplay) => {
    let passwordHash = hashPassword(password, salt);
    // query insert user
    try {
        await db.User.create({
            username: username,
            email: email,
            password: passwordHash,
            name: inputNameDisplay,
        });
    } catch (e) {
        if (e) {
            console.log("newUser: ", e.message);
        }
    }
};

// get all user
const getAllUsers = async () => {
    let users = [];
    try {
        // query database
        users = await db.User.findAll();
    } catch (err) {
        console.log("getAllUser: ", err);
    }
    return users;
};

// delete user
const deleteUser = async (userid) => {
    try {
        // query database
        await db.User.destroy({
            where: {
                id: userid,
            },
        });
    } catch (err) {
        console.log("DeleteUser: ", err);
    }
};

// get user by id
const getUserByID = async (userid) => {
    let user = {};
    try {
        // query database
        user = await db.User.findOne({
            where: { id: userid },
        });
    } catch (err) {
        console.log("getUserByID: ", err);
    }
    // findOne nó trả về đối tượng sequelize gồm thêm nhiều thuộc tính khác nhưng mk truyền luôn vẫn
    // k lỗi => mót
    // console.log(user);
    return user;
};

const updateUser = async (
    id,
    username,
    email,
    password,
    inputNameDisplay,
    passdefault
) => {
    if (password === undefined || password === "") {
        password = passdefault;
    } else {
        password = hashPassword(password);
    }
    try {
        // query database
        await db.User.update(
            {
                email: email,
                username: username,
                password: password,
                name: inputNameDisplay,
            },
            {
                where: { id: id },
            }
        );
    } catch (err) {
        console.log("getUserByID: ", err);
    }
};

module.exports = {
    newUser,
    getAllUsers,
    deleteUser,
    getUserByID,
    updateUser,
};

// import bcrypt from "bcryptjs";
// const salt = bcrypt.genSaltSync(10);

// import mysql1 from "mysql2";
// // create connecton to databse
// const connection1 = mysql1.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "jwt",
// });

// import mysql from "mysql2/promise";
// import bluebird from "bluebird";

// // băm mật khẩu
// const hashPassword = (userPassword) => {
//     const hashPassword = bcrypt.hashSync(userPassword, salt);
//     return hashPassword;
// };

// // insert 1 user
// const newUser = (username, email, password, inputNameDisplay) => {
//     let passwordHash = hashPassword(password, salt);
//     // query insert user
//     connection1.query(
//         "INSERT INTO `user`(`email`, `password`, `username`, `name`) VALUES (?,?,?,?)",
//         [email, passwordHash, username, inputNameDisplay],
//         function (err, results) {
//             if (err) {
//                 console.log(err);
//             }
//         }
//     );
// };

// // get all user
// const getAllUsers = async () => {
//     // create the connection, specify bluebird as Promise
//     const connection = await mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         database: "jwt",
//         Promise: bluebird,
//     });
//     let user = [];
//     // connection.query("SELECT * FROM `user`;", function (err, results, fields) {
//     //     if (err) {
//     //         console.log(err);
//     //         return user;
//     //     }
//     //     // console.log("all user:", results);
//     //     user = results;
//     //     return user;
//     // });
//     try {
//         // query database
//         const [rows, fields] = await connection.execute(
//             "SELECT * FROM `user`;"
//         );
//         return rows;
//     } catch (err) {
//         console.log("getAllUser: ", err);
//     }
// };

// // delete user
// const deleteUser = async (id) => {
//     const connection = await mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         database: "jwt",
//         Promise: bluebird,
//     });
//     try {
//         // query database
//         const [rows, fields] = await connection.execute(
//             "DELETE FROM `user` WHERE id = ?",
//             [id]
//         );
//     } catch (err) {
//         console.log("DeleteUser: ", err);
//     }
// };

// // get user by id
// const getUserByID = async (id) => {
//     const connection = await mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         database: "jwt",
//         Promise: bluebird,
//     });
//     try {
//         // query database
//         const [rows, fields] = await connection.execute(
//             "SELECT * FROM `user` WHERE id = ?",
//             [id]
//         );
//         return rows;
//     } catch (err) {
//         console.log("getUserByID: ", err);
//     }
// };

// const updateUser = (
//     id,
//     username,
//     email,
//     password,
//     inputNameDisplay,
//     passdefault
// ) => {
//     if (password === undefined || password === "") {
//         password = passdefault;
//     } else {
//         password = hashPassword(password);
//     }
//     connection1.query(
//         "UPDATE `user` SET `email`= ?,`password`= ?,`username`=?,`name`= ? WHERE id = ?",
//         [email, password, username, inputNameDisplay, id],

//         function (err, results) {
//             if (err) {
//                 console.log(err);
//             }
//         }
//     );
// };

// module.exports = {
//     newUser,
//     getAllUsers,
//     deleteUser,
//     getUserByID,
//     updateUser,
// };
