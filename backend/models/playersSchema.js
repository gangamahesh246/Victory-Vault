const mongoose = require('mongoose');
const express = require('express');

const playersSchema = mongoose.Schema({
    Series: {
        type: String,
        required: true
    },
    first_team: [
        {
        format: {type: String},
        players: [
            {
            player_name: {
                type: String,
                required: true
            },
            type: {
                type: String
            }
        }
        ]
    }
    ],
    second_team: [
        {
        format: {type: String},
        players: [
            {
            player_name: {
                type: String,
                required: true
            },
            type: {
                type: String
            }
        }
        ]
    }
    ]
});

module.exports = mongoose.model('players_data', playersSchema);