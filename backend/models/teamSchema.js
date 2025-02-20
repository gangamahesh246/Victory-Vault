const mongoose = require('mongoose');
const express = require('express');

const teamSchema = mongoose.Schema({
    series: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
    team: [
        {
            team_name: {
                type: String,
                required: true
            },
            team_logo: {
                type: String
            }
        }
    ]
}, { timestamps: true });

// Adding index on 'series' field for faster querying
// teamSchema.index({ series: 1 });

module.exports = mongoose.model('teams', teamSchema);