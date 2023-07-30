const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  Guild: String,
  Channel: String,
  Ticket: String,
});

module.exports = mongoose.model("tickets", ticketSchema);
