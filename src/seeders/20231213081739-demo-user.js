"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "User",
            [
                {
                    email: "Anhhieu123@gmail.com",
                    name: "Anh hieu 1",
                    username: "Pro Hieu 1",
                    password: "113",
                },
                {
                    email: "Anhhieu345@gmail.com",
                    name: "Anh hieu 2",
                    username: "Pro Hieu 2",
                    password: "113",
                },
                {
                    email: "Anhhieu456@gmail.com",
                    name: "Anh hieu 3",
                    username: "Pro Hieu 3",
                    password: "113",
                },
                {
                    email: "Anhhieu678@gmail.com",
                    name: "Anh hieu 4",
                    username: "Pro Hieu 5",
                    password: "113",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
