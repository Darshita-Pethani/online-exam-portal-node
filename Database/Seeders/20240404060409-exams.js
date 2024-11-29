'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const exams = [
      {
        user_id: 3,
        subject_id: 3,
        standard_id: 1,
        exam_type_id: 1,
        total_questions: 3,
        total_marks: 25,
        Date: new Date(),
        start_time: "03:00",
        end_time: "03:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        subject_id: 2,
        standard_id: 1,
        exam_type_id: 2,
        total_questions: 3,
        total_marks: 10,
        Date: new Date(),
        start_time: "03:00",
        end_time: "03:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        subject_id: 4,
        standard_id: 1,
        exam_type_id: 1,
        total_questions: 3,
        total_marks: 50,
        Date: new Date(),
        start_time: "03:00",
        end_time: "03:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        subject_id: 3,
        standard_id: 1,
        exam_type_id: 2,
        total_questions: 3,
        total_marks: 20,
        Date: new Date(),
        start_time: "03:00",
        end_time: "03:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        subject_id: 2,
        standard_id: 1,
        exam_type_id: 2,
        total_questions: 3,
        total_marks: 30,
        Date: new Date(),
        start_time: "03:00",
        end_time: "03:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const userInsertedData = exams.map(async (user) => {
      return queryInterface.bulkInsert('exams', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('exams', null, {});
  }
};