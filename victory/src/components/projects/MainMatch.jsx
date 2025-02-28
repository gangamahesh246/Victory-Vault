import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./page.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const MainMatch = () => {
  const { id } = useParams();
  const [match, setMatch] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/match/${id}`)
      .then((response) => {
        setMatch(response.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
      .replace(",", "");
  };

  return (
    <>
      <div className="pt-5 bg-slate-700">
        <div className="w-[95%] pt-3 pl-16 h-60 ml-10 shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden border-2 mb-5 bg-white">
          <div>
            <p className="fonn text-lg text-slate-700 font-bold mt-3 px-4 underline">
              {formatDate(match?.match?.dates[0]?.date)}
            </p>
            <p className="fonn text-slate-700 font-semibold pl-4">
              {match?.match?.first_team?.code} Vs{" "}
              {match?.match?.second_team?.code},{" "}
              {match?.match?.dates[0]?.match_subtitle} at {match?.match?.venue}
            </p>
          </div>
          <div>
            <div className="flex flex-col-3 ml-12">
              <div>
                <img
                  src={match?.match?.first_team?.flag}
                  width={85}
                  className="mx-20 mt-4 pt-1"
                />
                <p className="relative -top-[4.5rem] text-2xl font-bold left-48">
                  {match?.match?.first_team?.code}
                </p>
                <p className="relative -top-[5rem] text-lg fonn left-48">
                  {match?.match_info?.match_summary?.first_team_score}
                </p>
                <p className="relative -top-[5.5rem] text-[16px] fonn left-48">
                  ({match?.match_info?.scorecard[0]?.overs})
                </p>
              </div>
              <div className="w-96">
                <p className="fon text-2xl font-semibold pt-14 pl-28 relative left-28  text-yellow-500">
                  {match?.match_info?.scorecard.map((item) => item.won)}
                </p>
              </div>
              <div className="mt-1 ml-48">
                <img
                  src={match?.match?.second_team?.flag}
                  width={85}
                  className="ml-52 pt-1"
                />
                <p className="relative -top-16 text-2xl font-bold left-16">
                  {match?.match?.second_team?.code}
                </p>
                <p className="relative -top-[4.7rem] text-lg fonn left-16">
                  {match?.match_info?.match_summary?.second_team_score}
                </p>
                <p className="relative -top-[5.1rem] text-[16px] fonn left-16">
                  ({match?.match_info?.scorecard[1]?.overs})
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar bg-slate-700 text-[#e3eaf0]">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="." className="nav-link">
                Match Info
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/match/${match._id}/scorecard`} className="nav-link">
                Scorecard
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default MainMatch;
