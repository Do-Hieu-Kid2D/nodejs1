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

// băm mật khẩu
const hashPassword = (userPassword) => {
    const hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

// insert 1 user
const newUser = (username, email, password, inputNameDisplay) => {
    let passwordHash = hashPassword(password, salt);
    // query insert user
    connection1.query(
        "INSERT INTO `users`(`email`, `passwords`, `username`, `name`) VALUES (?,?,?,?)",
        [email, passwordHash, username, inputNameDisplay],
        function (err, results) {
            if (err) {
                console.log(err);
            }
        }
    );
};

// get all users
const getAllUsers = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
        Promise: bluebird,
    });
    let users = [];
    // connection.query("SELECT * FROM `users`;", function (err, results, fields) {
    //     if (err) {
    //         console.log(err);
    //         return users;
    //     }
    //     // console.log("all user:", results);
    //     users = results;
    //     return users;
    // });
    try {
        // query database
        const [rows, fields] = await connection.execute(
            "SELECT * FROM `users`;"
        );
        return rows;
    } catch (err) {
        console.log("getAllUser: ", err);
    }
};

// delete user
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
        Promise: bluebird,
    });
    try {
        // query database
        const [rows, fields] = await connection.execute(
            "DELETE FROM `users` WHERE id = ?",
            [id]
        );
    } catch (err) {
        console.log("DeleteUser: ", err);
    }
};

// get user by id
const getUserByID = async (id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
        Promise: bluebird,
    });
    try {
        // query database
        const [rows, fields] = await connection.execute(
            "SELECT * FROM `users` WHERE id = ?",
            [id]
        );
        return rows;
    } catch (err) {
        console.log("getUserByID: ", err);
    }
};

const updateUser = (
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
    connection1.query(
        "UPDATE `users` SET `email`= ?,`passwords`= ?,`username`=?,`name`= ? WHERE id = ?",
        [email, password, username, inputNameDisplay, id],

        function (err, results) {
            if (err) {
                console.log(err);
            }
        }
    );
};

module.exports = {
    newUser,
    getAllUsers,
    deleteUser,
    getUserByID,
    updateUser,
};
