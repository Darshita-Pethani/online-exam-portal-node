'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const questions = [
      {
        exam_id: 3,
        question: "_____ is an interactive shell that processes Node.",
        ans: "REPL",
        marks:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exam_id: 2,
        question: "Node.js is written in which language?",
        ans: 1,
        marks:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exam_id: 1,
        question: "Which of the following are examples of node modules?",
        ans: 4,
        marks:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exam_id: 4,
        question: "To include the HTTP server in the node module, what function do we use",
        ans: "require() ",
        marks:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exam_id: 5,
        question: "How can we expose node modules?",
        ans: "exports",
        marks:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const userInsertedData = questions.map(async (user) => {
      return queryInterface.bulkInsert('questions', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('questions', null, {});
  }
};