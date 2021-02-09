const mongoose = require("mongoose");

module.exports = {
  connectMongo: () => {
    mongoose
      .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then((con) => {
        console.log(`Connected to Database on ${con.connection.host}`);
      })
      .catch((err) => console.log(err));
  },
};
