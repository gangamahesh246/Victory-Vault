import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./page.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Overview = () => {
  const { series } = useParams();
  const [match, setMatch] = useState([]);
  const [seri, setseri] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7000/series/${series}`)
      .then((response) => {
        setseri(response.data[0].match);
        setMatch(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const sliced = match.slice(0, 3);
  console.log(sliced);

  const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).replace(',', '');
    };
return (
  <>
    <div className="full bg-[#F2F3F4]">
      <div className="match">
        <div
          style={{ marginLeft: 30 }}
          className="text-3xl fon font-semibold"
        >
          <h3>Featured Matches</h3>
        </div>
        {sliced?.map((item) => {
          return (
            <div className="w-[100%] h-40 rounded-[30px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] border-2 my-4 cursor-pointer"
            onClick={() => {navigate(`/match/${item._id}`)}}
            >
              <div>
                <p className="fonn text-lg text-slate-700 font-bold mt-3 px-4 underline">
                  {formatDate(item?.match?.dates[0]?.date)}
                </p>
                <p className="fonn text-slate-700 font-semibold pl-4">
                  {item?.match?.first_team?.code} Vs{" "}
                  {item?.match?.second_team?.code},{" "}
                  {item?.match?.dates[0]?.match_subtitle} at {item?.match?.venue}
                </p>
              </div>
              <div>
                <div className="flex flex-col-3 -ml-3">
                  <div>
                    <img
                      src={item?.match?.first_team?.flag}
                      width={75}
                      className="mx-20 pt-1"
                    />
                    <p className="relative -top-14 text-2xl font-bold left-40">
                      {item?.match?.first_team?.code}
                    </p>
                  </div>
                  <div className="w-96">
                    <p className="fon text-xl pt-4 pl-16 text-yellow-500">
                      {item?.match_info?.scorecard?.map((item) => item.won)}
                    </p>
                  </div>
                  <div>
                    <div>
                      <img
                        src={item?.match?.second_team?.flag}
                        width={75}
                        className="ml-12 pt-1"
                      />
                      <p className="relative -top-14 text-2xl font-bold -left-3">
                        {item?.match?.second_team?.code}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="seriesinfo rounded-[30px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] border-2 my-4">
          <p className="text-2xl font-semibold fon">Series Info</p>
          <div className="series rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] ">
            <div className="seriesname fon">Series Name -</div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="tour fon">{seri?.series}</div>
          </div>
          <div className="duration rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
            <div className="fon">Duration -</div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="fon">{match?.map((item) => item?.match?.series_period)}</div>
          </div>
          <div className="format fon rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
            <div>Format -</div>
            <div className="ml-[5.5rem]">{match?.map((item) => item?.match?.format)}</div>
          </div>
        </div>
      </div>
      <div className="Keystats bg-slate-500 rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        <h1 className="text-3xl font-semibold fon">key stats</h1>
        <div className="most mt-5 ml-11 bg-white text-slate-700 shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
          <div className="mostruns text-xl underline fon">Mostruns</div>
          <div className="mostwic">
            <div className="name grid grid-cols-3">
              <div className="w-72 h-10 mt-3 ml-5 text-lg uppercase font-semibold pl-8 ">
                  {match?.map((item) => item?.match?.most_runs?.person)}
              </div>
              <div className='text-5xl text-slate-700 mt-[5px] ml-32'>-</div>
              <div className='fon text-xl text-slate-700 mt-[20px] ml-16'>{match?.map((item) => item?.match?.most_runs?.runs)}</div>
            </div>
          </div>
        </div>
        <div className="most mt-5 ml-11 bg-white text-slate-700 shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
          <div className="mostruns text-xl underline fon">Most Wickets</div>
          <div className="mostwic">
          <div className="name grid grid-cols-3">
              <div className="w-72 h-10 mt-3 ml-5 text-lg uppercase font-semibold pl-8">
                  <p>{match?.map((item) => item?.match?.most_wickets?.person)}</p>
              </div>
              <div className='text-5xl text-slate-700 mt-[5px] ml-32'>-</div>
              <div className='fon text-xl text-slate-700 mt-[20px] ml-16'>{match?.map((item) => item?.match?.most_wickets?.wickets)}</div>
            </div>
          </div>
        </div>
        <div className="most mt-5 ml-11 bg-white text-slate-700 shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
          <div className="mostruns text-xl underline fon">Most sixes</div>
          <div className="mostwic">
          <div className="name grid grid-cols-3">
              <div className="w-72 h-10 mt-3 ml-5 text-lg uppercase font-semibold pl-8">
                  <p>{match?.map((item) => item?.match?.most_sixes?.person)}</p>
              </div>
              <div className='text-5xl text-slate-700 mt-[5px] ml-32'>-</div>
              <div className='fon text-xl text-slate-700 mt-[20px] ml-16'>{match?.map((item) => item?.match?.most_sixes?.sixes)}</div>
            </div>
          </div>
        </div>
        <div className="most mt-5 ml-11 bg-white text-slate-700 shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
          <div className="mostruns text-xl underline fon">Best Strike Rate</div>
          <div className="mostwic">
          <div className="name grid grid-cols-3">
              <div className="w-72 h-10 mt-3 ml-5 text-lg uppercase font-semibold pl-8">
                  <p>{match?.map((item) => item?.match?.best_strike_rate?.person)}</p>
              </div>
              <div className='text-5xl text-slate-700 mt-[5px] ml-32'>-</div>
              <div className='fon text-xl text-slate-700 mt-[20px] ml-16'>{match?.map((item) => item?.match?.best_strike_rate?.strike_rate)}</div>
            </div>
          </div>
        </div>
      </div>

     </div>
   </>
 );
};

export default Overview;