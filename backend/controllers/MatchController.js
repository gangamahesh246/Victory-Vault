const express = require("express");
const asyncHandler = require("express-async-handler");
const MatchDataa = require("../models/MatchModel");
const teamData = require('../models/teamSchema');
const playerInfo = require("../models/playerSchema");
const SquadMem = require("../models/playersSchema");

const mongoose = require("mongoose");

const Fixtures = async (req, res) => {
  try {
    const matches = await MatchDataa.aggregate([
      {
        $project: {
          "match.first_team.code": 1,
          "match.second_team.code": 1,
          "match.dates.match_subtitle": 1,
          "match.dates.date": 1,
          "match.venue": 1,
          "match_info.scorecard.won": 1,
          "match_info.scorecard.overs": 1,
          "match.first_team.flag": 1,
          "match.second_team.flag": 1,
          "match_info.match_summary.first_team_score": 1,
          "match_info.match_summary.second_team_score": 1,
          _id: 1,
        },
      },
    ]);

    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching live matches" });
  }
};

const MatchChecking = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid match ID" });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const matchData = await MatchDataa.aggregate([
      { $match: { _id: objectId } },
      {
        $project: {
          "match.first_team.code": 1,
          "match.second_team.code": 1,
          "match.dates.match_subtitle": 1,
          "match.dates.date": 1,
          "match.venue": 1,
          "match_info.scorecard.won": 1,
          "match_info.scorecard.overs": 1,
          "match.first_team.flag": 1,
          "match.second_team.flag": 1,
          "match_info.match_summary.first_team_score": 1,
          "match_info.match_summary.second_team_score": 1,
          "match_info.match_summary.toss": 1,
          "match_info.officials": 1,
          "match.match_type": 1,
          "graph": 1,
          "players": 1,
          "_id": 1,
        },
      },
    ]);
    if (matchData.length === 0) {
      return res.status(404).json({ error: "Match not found" });
    }

    res.status(200).json(matchData[0]);
  } catch (error) {
    console.error("Error fetching match data:", error);
    res.status(500).json({ error: "Server error while fetching live matches" });
  }
};

const ScoreCard = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid match ID" });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const matchData = await MatchDataa.aggregate([
      { $match: { _id: objectId } },
      {
        $project: {
          "match.first_team.code": 1,
          "match.second_team.code": 1,
          "match_info.scorecard": 1,
          "match.match_type": 1,
          "_id": 0,
        },
      },
    ]);
    if (matchData.length === 0) {
      return res.status(404).json({ error: "Match not found" });
    }

    res.status(200).json(matchData[0]);
  } catch (error) {
    console.error("Error fetching match data:", error);
    res.status(500).json({ error: "Server error while fetching live matches" });
  }
};

const Series = async (req, res) => {
  const { series } = req.params;
  try {
    const matches = await MatchDataa.aggregate([
      {
        $match: {
          "match.series": series,
        },
      },
      {
        $project: {
          "match.series_logo": 1,
          "match.series": 1,
          "match.series_period": 1,
          "match.format": 1,
          "match.first_team.code": 1,
          "match.second_team.code": 1,
          "match.dates.match_subtitle": 1,
          "match_info.scorecard.overs": 1,
          "match.dates.date": 1,
          "match.venue": 1,
          "match_info.scorecard.won": 1,
          "match_info.match_summary.first_team_score": 1,
          "match_info.match_summary.second_team_score": 1,
          "match.first_team.flag": 1,
          "match.second_team.flag": 1,
          "match.most_runs.person": 1,
          "match.most_runs.runs": 1,
          "match.most_wickets.person": 1,
          "match.most_wickets.wickets": 1,
          "match.most_sixes.person": 1,
          "match.most_sixes.sixes": 1,
          "match.best_strike_rate.person": 1,
          "match.best_strike_rate.strike_rate": 1,
          "match.series_of_the_player.person": 1,
          "match.series_of_the_player.country": 1,
          "_id": 1
        },
      },
    ]);

    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching live matches" });
  }
};

const Squads = async (req, res) => {
  const { series } = req.params;
  try {
    const matches = await teamData.aggregate([
      {
        $match: {
          series: series,
        }
      }
    ])
    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching live matches" });
  }
}

const SquadMembers = async (req, res) => {
  const { series } = req.params;
  try {
    const matches = await SquadMem.aggregate([
      {
        $match: {
          series: series,
        },
      },
    ]);

    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching live matches" });
  }
};

const getLiveMatches = async (req, res) => {
  try {
    const matches = await MatchDataa.aggregate([
      {
        $match: {
          "match_info.match_summary.status": "Live",
        },
      },
      {
        $project: {
          "match.first_team.code": 1,
          "match.second_team.code": 1,
          "match.dates.match_subtitle": 1,
          "match.dates.date": 1,
          "match.venue": 1,
          "match.first_team.first_team_captain": 1,
          "match.first_team.second_team_captain": 1,
          "match.first_team.first_team_flag": 1,
          "match.first_team.second_team_flag": 1,
          "match_info.scorecard.overs": 1,
          "match.series": 1,
          "match_info.match_summary.first_team_score": 1,
          "match_info.match_summary.second_team_score": 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching live matches" });
  }
};
const getMatches = async (req, res) => {
  try {
    const matches = await MatchDataa.aggregate([
      {
        $project: {
          "match.first_team.name": 1,
          "match.second_team.name": 1,
          "match.first_team.code": 1,
          "match.second_team.code": 1,
          "match.dates.match_subtitle": 1,
          "match.series": 1,
          "match_info.match_summary.first_team_score": 1,
          "match_info.match_summary.second_team_score": 1,
          "match_info.scorecard.won": 1,
          "match_info.scorecard.overs": 1,
          "match.first_team.flag": 1,
          "match.second_team.flag": 1,
          _id: 1,
        },
      },
    ]);

    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching live matches" });
  }
};

const Player = asyncHandler(async (req, res) => {
  const Data = await playerInfo.find();
  res.status(200).json(Data);
});

const getPlayerByname = async (req, res) => {
  try {
    const playerName = req.params.name;
    console.log("Searching for player:", playerName);
    const player = await playerInfo.findOne({ player_name: { $regex: new RegExp(playerName, "i") } });
    if (!player) {
      return res.status(404).json({ message: 'player not found' });
    }
    res.status(200).json(player);
  }
  catch (error) {
    console.error("Error fetching player by name:", error);
    res.status(500).json({ message: "Server error", error });
  }
}


module.exports = {
  Fixtures,
  MatchChecking,
  Series,
  getLiveMatches,
  getMatches,
  ScoreCard,
  Squads,
  SquadMembers,
  Player,
  getPlayerByname
};
