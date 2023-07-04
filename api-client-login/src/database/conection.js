const mongoose = require("mongoose");
const settings = require("../config/seting")

const urldb = settings.dbpath

mongoose.connect(urldb, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose;