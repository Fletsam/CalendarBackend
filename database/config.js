const moongose = require("mongoose");

const dbConnection = async () => {
  try {
    await moongose.connect(process.env.DB_CNN);

    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar el DB");
  }
};

module.exports = { dbConnection };
