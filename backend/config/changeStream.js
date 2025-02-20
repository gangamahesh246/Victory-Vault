const mongoose = require('mongoose');
const Player = require('../models/playerSchema'); 
const { wss } = require('../app'); 

const setupChangeStream = () => {
    const changeStream = Player.watch();

    changeStream.on('change', async (change) => {
        if (change.operationType === 'update') {
            const updatedPlayers = await Player.find();
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(updatedPlayers));
                }
            });
        }
    });
};

module.exports = setupChangeStream;
