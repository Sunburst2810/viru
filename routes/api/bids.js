const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation

// Load Bids Model
const Bids = require("../../models/Bids");
// Load User Model
const User = require("../../models/User");

// @route   GET api/bids/test
// @desc    Tests bids route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Bids Works" }));

// @route   GET api/bids
// @desc    Get current users bids
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Bids.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(bids => {
        if (!bids) {
          errors.nobids = "There is no Bids for this user";
          return res.status(404).json(errors);
        }
        res.json(bids);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/bids/all
// @desc    Get all bids
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Bids.find()
    .populate("user", ["name", "avatar"])
    .then(bids => {
      if (!bids) {
        errors.nobids = "There are no bid";
        return res.status(404).json(errors);
      }

      res.json(bids);
    })
    .catch(err => res.status(404).json({ bids: "There are no bids" }));
});

// @route   POST api/bids
// @desc    Plcae Bids or edit Bids
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const bidsFields = {};
    bidsFields.user = req.user.id;
    if (req.body.numbers) bidsFields.numbers = req.body.numbers;
    if (req.body.money) bidsFields.money = req.body.money;
    if (req.body.totalbet) bidsFields.totalbet = req.body.totalbet;
    if (req.body.token) bidsFields.token = req.body.token;
    if (req.body.bets) bidsFields.bets = req.body.bets;
    if (req.body.endGame) bidsFields.endGame = req.body.endGame;
    if (req.body.win) bidsFields.win = req.body.win;
    if (req.body.winningNumber)
      bidsFields.winningNumber = req.body.winningNumber;
    if (req.body.moneyError) bidsFields.moneyError = req.body.moneyError;

    Bids.findOne({ user: req.user.id }).then(bids => {
      if (bids) {
        // Update
        Bids.findOneAndUpdate(
          { user: req.user.id },
          { $set: bidsFields },
          { new: true }
        ).then(bids => res.json(bids));
      } else {
        // Check if handle exists
        Bids.findOne({ numbers: bidsFields.numbers }).then(bids => {
          if (bids) {
            errors.numbers = "That number is already exists";
            res.status(400).json(errors);
          }

          // Save Bids
          new Bids(bidsFields).save().then(bids => res.json(bids));
        });
      }
    });
  }
);

module.exports = router;
