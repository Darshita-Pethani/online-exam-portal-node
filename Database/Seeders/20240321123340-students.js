'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const students = [
      {
        role_id: 1,
        first_name: "Vidhi",
        last_name: "Barot",
        full_name: "Vidhi Barot",
        email: "vidhi123@mailinator.com",
        password: "$2y$10$t24SX1vibFYTdciWSuvmrudgF8tWjEkYOj/DVsixE5InYNhCiYQyO",//vidhi@123
        gender: "Female",
        birth_date: "2001-04-11",
        address: "Ahemadabad",
        phone_no: 9375582856,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 2,
        first_name: "Devang",
        last_name: "Rathod",
        full_name: "Devang Rathod",
        email: "devang123@mailinator.com",
        password: "$2y$10$w6XQ8K6rd1Q1Tz63888jouO7PS2q4srS3SGDcLWDiSDY2Jd1sfCEq",//devang@123
        gender: "Male",
        birth_date: "2001-26-07",
        address: "Ahemadabad",
        phone_no: 9375582856,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 1,
        first_name: "Chelsy",
        last_name: "Ladani",
        full_name: "Chelsy Ladani",
        email: "chelsy123@mailinator.com",
        password: "$2y$10$WppAhGSRMAaiNvZuCC/rh.QtPmuExKQXJ0bqK5wCTN2C6x3su2p0u",//chelsy@123
        gender: "Female",
        birth_date: "2001-04-10",
        address: "Surat",
        phone_no: 6754678967,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 2,
        first_name: "Darshita",
        last_name: "Pethani",
        full_name: "Darshita Pethani",
        email: "darshita123@mailinator.com",
        password: "$2y$10$CVdF7W.Nk1lUyE5L279r/OGhwtP2RE3dM7PY47xuqySsKkoJkQEdq",//darshita@123
        gender: "Female",
        birth_date: "2001-28-10",
        address: "Ahemadabad",
        phone_no: 7573991223,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 1,
        first_name: "Richa",
        last_name: "Desai",
        full_name: "Richa Desai",
        email: "richa123@mailinator.com",
        password: "$2y$10$HeEwKcOdX5mgMnmiycdaIevGiCuyYJGz75rApPHg.XJTewE35p5He",//richa@123
        gender: "Female",
        birth_date: "2001-04-11",
        address: "Rajkot",
        phone_no: 9909316563,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const userInsertedData = students.map(async (user) => {
      return queryInterface.bulkInsert('students', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('students', null, {});
  }
};
