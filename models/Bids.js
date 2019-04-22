const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BidSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  numbers: {
    type: String,
    required: true
  },
  money: {
    type: String
  },
  totalBet: {
    type: String
  },
  token: {
    type: String
  },
  bets: {
    type: String
  },
  endgame: {
    type: String
  },
  win: {
    type: String
  },
  winningnumber: {
    type: String
  },
  moneyerror: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Bids = mongoose.model("bids", BidSchema);
