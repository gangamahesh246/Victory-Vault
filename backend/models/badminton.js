const mongoose = require("mongoose");
const express = require("express");

const BadmintonSchema = mongoose.Schema({
        match_details: {
          name: {
            type: String
          },
          tour_name: {
            type: String
          },
          tour_dates:[],
          tour_place: {
            type: String
          },
          status: {
            type: String
          },
          tour_image: {
            type: String
          },
          first_team: {
            type: String
          },
          first_team_image: {
            type: String
          },
          second_team: {
            type: String
          },
          second_team_image: {
            type: String
          },
          first_team_score: {
            score: {
              type: Array,
              items: {
                type: Number
              }
            },
            rounds: {
              type: Array,
              items: {
                type: Object,
                properties: {
                  round: {
                    type: Number
                  },
                  score: {
                    type: Number
                  }
                }
              }
            }
          },
          second_team_score: {
            score: {
              type: Array,
              items: {
                type: Number
              }
            },
            rounds: {
              type: Array,
              items: {
                type: Object,
                properties: {
                  round: {
                    type: Number
                  },
                  score: {
                    type: Number
                  }
                }
              }
            }
          },
          tour_start_time: {
            type: String
          },
          tour_end_time: {
            type: String
          }
        },
        players_details: {
          type: Array,
          items: {
            type: Object,
            properties: {
              doubles: {
                type: Object,
                properties: {
                  player_1: {
                    type: String
                  },
                  player1_photo: {
                    type: String
                  },
                  player_2: {
                    type: String
                  },
                  player2_photo: {
                    type: String
                  },
                  player_3: {
                    type: String
                  },
                  player3_photo: {
                    type: String
                  },
                  player_4: {
                    type: String
                  },
                  player4_photo: {
                    type: String
                  }
                }
              }
            }
          }
        }
      });
      

module.exports = mongoose.model("badminton", BadmintonSchema);
