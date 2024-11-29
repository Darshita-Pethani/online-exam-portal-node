'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [
            {
                role_id: 1,
                first_name: "ralph",
                last_name: "adam",
                full_name: "ralph adam",
                username: "ralph_adam",
                email: "ralph@mailinator.com",
                password: "$2b$10$fAz5kUgJaeHcG6qXE0wkuOe4MJeOnH4Ybrfo9W7BvzyuQKYCZtO.C", //123123 
                phone_no: 63524169874,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 2,
                first_name: "amanda",
                last_name: "scott",
                full_name: "amanda scott",
                username: "amanda_scott",
                email: "amanda@mailinator.com",
                password: "$2b$10$i4s2vGv3diL/Lx8.73scaOZeJNfV8fwsSOPTVi38sBECL.m5qdQ4y", //123123
                phone_no: 6352416945,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 1,
                first_name: "Johnny",
                last_name: "Lever",
                full_name: "Johnny Lever",
                username: "johnny_lever",
                email: "johnny@mailinator.com",
                password: "$2a$04$nLlqM9PQPNUYXXShUZusme5YY3ov1v.uNX5QZqt2muq8MP79ytghO", //johnny@123
                phone_no: 83725128237,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 2,
                first_name: "Amolika",
                last_name: "Uppal",
                full_name: "Amolika Uppal",
                username: "amolika_uppal",
                email: "amolika@mailinator.com",
                password: "$2a$04$kJ8X1eY8zlRLVV46qeeHuenLWwwZD1xSUnZEPeFn/9GTgKjrnHbr.", //amolika@123
                phone_no: 5222306308,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 1,
                first_name: "Nakul",
                last_name: "Khatri",
                full_name: "Nakul Khatri",
                username: "nakul_khatri",
                email: "nakul@mailinator.com",
                password: "$2a$04$B/lTlW3A8iNLf2fpGO28hu76IwIB00F7c0Dvs74vEjc2WiH6RjtLi", //nakul@123
                phone_no: 7593871629,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 2,
                first_name: "Umesh",
                last_name: "Rao",
                full_name: "Umesh Rao",
                username: "umesh_rao",
                email: "umesh@mailinator.com",
                password: "$2a$04$dbgkGOOESzh9MW.zDU2DH.msvy9U2boMDYj2qhdW1k.QPDLtWfq0W", //umesh@123
                phone_no: 18002095577,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        const userInsertedData = users.map(async (user) => {
            return queryInterface.bulkInsert('users', [user], {});
        });

        await Promise.all(userInsertedData);

    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete('users', null, {});
    }
};
