const express = require('express');
const Route = express.Router();
const {Fixtures, MatchChecking,ScoreCard, SquadMembers, Series, Squads, getLiveMatches, getMatches, Player , getPlayerByname } = require('../controllers/MatchController');

Route.get('/live/match', getLiveMatches);
Route.get('/carousels', getMatches);
Route.get('/fixtures', Fixtures);
Route.get('/match/:id', MatchChecking);
Route.get('/match/:player', Player);
Route.get('/series/:series', Series);
Route.get('/matches/:series', Series);
Route.get('/squads/:series', Squads);
Route.get('/squadmem/:series', SquadMembers);
Route.get('/scorecard/:id', ScoreCard);
Route.get('/player/:name', getPlayerByname);

module.exports = Route;