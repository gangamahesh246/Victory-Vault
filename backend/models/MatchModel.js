const mongoose = require("mongoose");
const express = require("express");

const MatchSchema = mongoose.Schema({
        match: {
          first_team: {
            code: {
              type: String
            },
            id: {
              type: Number
            },
            name: {
              type: String
            },
            flag: {
              type: String
            },
            first_team_flag: {
              type: String
            },
            first_team_captain: {
              type: String
            },
            second_team_flag: {
              type: String
            },
            second_team_captain: {
              type: String
            }
          },
          dates: [
            {
              date: {
                type: String
              },
              match_subtitle: {
                type: String
              }
            }
          ],
          end_date: {
            type: String
          },
          second_team: {
            code: {
              type: String
            },
            id: {
              type: Number
            },
            name: {
              type: String
            },
            flag: {
              type: String
            }
          },
          id: {
            type: Number
          },
          match_title: {
            type: String
          },
          series: {
            type: String
          },
          series_logo: {
            type: String
          },
          series_period: {
            type: String
          },
          start_date: {
            type: String
          },
          venue: {
            type: String
          },
          match_type: {
            type: String
          },
          most_runs: {
            person: {
              type: String
            },
            runs: {
              type: String
            }
          },
          most_wickets: {
            person: {
              type: String
            },
            wickets: {
              type: String
            }
          },
          most_sixes: {
            person: {
              type: String
            },
            sixes: {
              type: String
            }
          },
          best_strike_rate: {
            person: {
              type: String
            },
            strike_rate: {
              type: String
            }
          },
          series_of_the_player: {
            person: {
              type: String
            },
            country: {
              type: String
            }
          },
          format: {
            type: String
          }
        },
        match_info: {
          match_summary: {
            first_team_score: {
              type: String
            },
            second_team_score: {
              type: String
            },
            status: {
              type: String
            },
            toss: {
              type: String
            }
          },
          officials: {
            On_field_Umpire: {
              type: String
            },
            Third_Umpire: {
              type: String
            },
            Referee: {
              type: String
            }
          },
          scorecard: [
            {
              batting: [
                {
                  balls: {
                    type: Number
                  },
                  bat_order: {
                    type: Number
                  },
                  fours: {
                    type: Number
                  },
                  how_out: {
                    type: String
                  },
                  id: {
                    type: Number
                  },
                  player_name: {
                    type: String
                  },
                  runs: {
                    type: Number
                  },
                  sixes: {
                    type: Number
                  },
                  strike_rate: {
                    type: String
                  }
                }
              ],
              bowling: [
                {
                  economy: {
                    type: Number
                  },
                  id: {
                    type: Number
                  },
                  maidens: {
                    type: Number
                  },
                  overs: {
                    type: Number
                  },
                  player_name: {
                    type: String
                  },
                  runs_conceded: {
                    type: Number
                  },
                  wickets: {
                    type: Number
                  }
                }
              ],
              extras: {
                type: Number
              },
              extras_detail: {
                type: String
              },
              innings_number: {
                type: String
              },
              overs: {
                type: String
              },
              runs: {
                type: String
              },
              title: {
                type: String
              },
              wickets: {
                type: Number
              }
            }
          ]
        },
        graph: {
            first_team_first_innings_overs: [],
            first_team_first_innings_runs: [],
            second_team_first_innings_overs: [],
            second_team_first_innings_runs: [],
            first_team_second_innings_overs: [],
            first_team_second_innings_runs: [],
            second_team_second_innings_overs: [],
            second_team_second_innings_runs: [],
            first_team_run_rate: [],
            second_team_run_rate: []
          },
        players:{
          first_team: [],
          second_team: []
        }
    });
      

module.exports = mongoose.model("Match", MatchSchema);
