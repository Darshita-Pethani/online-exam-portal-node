module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to Demo project");
    });

    // user routes
    app.use("/user", require("./users"));

    // Student routes
    app.use("/student", require("./students"));

    // Subject routes
    app.use("/subject", require("./subjects"));

    // Exam routes
    app.use("/exam", require("./exams"));

    // Questions routes
    app.use("/question", require("./questions"));

    // Role routes
    app.use("/role", require("./roles"));

    // User exam enroll routes
    app.use("/user_exam_enroll", require("./user_exam_enrolls"));

    // User result routes
    app.use("/result", require("./results"));

    //Utils routes
    app.use("/utils", require("./utils"));

    //Exam type routes
    app.use("/exam_type", require("./exam_types"));

    // Utils routes
    app.use("/utils", require("./utils"));

    // standard routes
    app.use("/standard", require("./standards"));

    // Question types routes
    app.use("/question_type", require("./question_types"));

    //Module routes
    app.use("/module", require("./module"));

}