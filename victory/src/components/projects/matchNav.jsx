import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./page.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

const MatchNav = () => {
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

  return (
    <>
      <div className="pt-5 bg-slate-700">
        <div className="w-[95%] pt-3 pl-16 h-60 ml-10 shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden border-2 mb-5 bg-white">
          {match.map((item) => {
            return (
              <>
                <div className="flex">
                  <img src={item.match.series_logo} width={170} />
                  <p className="text-xl relative top-[7.4rem] left-[4.4rem] font-bold fon text-slate-700">
                    {item.match.series_period}
                  </p>
                </div>
                <p className="text-xl font-bold relative -top-14 left-60 fon text-slate-700">
                  {item.match.format}
                </p>
              </>
            );
          })}
          <div className="text-3xl underline font-bold fon text-slate-700 relative -top-36 left-60">
            <p>{seri.series}</p>
          </div>
        </div>
        <nav className="navbar bg-slate-700 text-[#e3eaf0]">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="." className="nav-link">
                Overview
              </Link>
            </li>
            <li className="nav-item"
            >
              <Link to={`/series/${seri?.series}/matches`} className="nav-link">
                Matches
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/series/${seri?.series}/squads`} className="nav-link">
                Squads
              </Link>
            </li>
          </ul>
        </nav>
      </div>
        <Outlet />
    </>
  );
};

export default MatchNav;
