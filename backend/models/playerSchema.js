const mongoose = require("mongoose");
const express = require("express");

const playerSchema = mongoose.Schema({
  player_name: {
    type: String,
  },
  player_photo: {
    type: String,
  },
  country: {
    type: String,
  },
  age: {
    type: Number,
  },
  type: {
    type: String,
  },
  title: {
    type: String,
  },
  formats: [ 
    {
      format: { 
        type: String,
        required: true,
      },
      batting: {
        matches: {
          type: Number,
        },
        innings: {
          type: Number,
        },
        runs: {
          type: Number,
        },
        centuries: {
          type: Number,
        },
        fifties: {
          type: Number,
        },
        highest_score: {
          type: Number,
        },
        average: {
          type: Number,
        },
        strike_rate: {
          type: String,
        },
        fours: {
          type: Number,
        },
        sixes: {
          type: Number,
        },
      },
      bowling: {
        matches: {
          type: Number,
        },
        innings: {
          type: Number,
        },
        wickets: {
          type: Number,
        },
        economy: {
          type: Number,
        },
        average: {
          type: Number,
        },
        best: {
          type: String,
        },
        hatricks: {
          type: Number,
        },
        strike_rate: {
          type: String,
        },
        maiden: {
          type: Number,
        },
      },
    }
  ],
});

module.exports = mongoose.model("Player", playerSchema);
