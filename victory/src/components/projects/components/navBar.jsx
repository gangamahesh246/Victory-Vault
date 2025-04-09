import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdSportsCricket } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "../page.css";
import { useNavigate } from "react-router-dom";
import { FcSportsMode } from "react-icons/fc";

const NavBar = () => {
  const [show, setShow] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [series, setSeries] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/live/match`)
      .then((res) => {
        setShow(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(series);

  const active = ({ isActive }) =>
    isActive ? "w-fit h-fit p-1 bg-slate-400 text-slate-700 rounded-3xl " : "";


  return (
    <div>
        <div className="bg-white rounded-full w-14 h-14 p-1 absolute left-[95.5%] top-1 shadow-[0_10px_25px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)] "><FcSportsMode onClick={()=>{navigate("/")}} className="text-4xl" /></div>
      <div className="w-[90%] h-[350px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden mx-[75px] my-[50px]">
        <nav className="w-full border-2 shadow-lg flex justify-between items-center h-20 sticky top-0 xl:px-4 font-semibold rounded-3xl">
          <ul className="flex justify-evenly items-center w-[700px] h-full font-sans text-slate-700">
            <li>
              <Link to="/home" className={active}>
                Home
              </Link>
            </li>
            <li style={{cursor: "pointer"}} className={active} onClick={()=>setIsOpen(true)}>
                <Link to="/series" >Series</Link>
            </li>
            <li>
              <Link to="/fixtures" className={active}>
                Fixtures
              </Link>
            </li>
            <li>
              <Link to="/rules" className={active}>
                Rules
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-1">
            <p>
              VICTORY<span className="text-3xl font-light">vault</span>
            </p>
            <MdSportsCricket className="text-xl text-ore-700" />
          </div>
        </nav>
        {show && (
          <div className="w-full h-full grid grid-cols-2 relative shadow-lg shadow-[#aba9da]">
            <div className="w-full h-full">
              <div className="flex items-center justify-around w-12 h-4 mx-3 my-3">
                <span className="w-1 h-1 bg-red-600 rounded-full animate-ping"></span>
                <span className="text-lg">Live</span>
              </div>

              {show.map((item, index) => {
                return (
                  <>
                    <p key={index} className="fonn text-lg absolute top-3 left-32">
                      {item?.match?.first_team?.code}
                      <span className="text-xs">Vs</span>
                      {item?.match?.second_team?.code},
                      {item?.match?.dates[0]?.match_subtitle}
                    </p>
                    <div className="border-4 border-black w-[250px] mx-32 my-10 p-1">
                      <img
                        src={item?.match?.first_team?.first_team_flag}
                        width={250}
                      />
                    </div>
                    <p className="absolute top-7 text-lg left-[470px] uppercase font-semibold underline fon">
                      {item?.match?.series}
                    </p>
                    <div className="w-[200px] absolute top-[34px] left-[191px]">
                      <img
                        src={item?.match?.first_team?.first_team_captain}
                        width={250}
                      />
                    </div>
                    <p className="absolute top-[40%] text-3xl left-[600px] uppercase font-extrabold text-yellow-500">
                      Ball
                    </p>
                    <p className="absolute top-[40%] text-2xl left-[470px] font-bold fonn">
                      {item?.match_info?.match_summary?.first_team_score}
                    </p>
                    <p className="text-sm absolute top-[48%] left-[470px] ">
                      Overs: ({item?.match_info?.scorecard[0]?.overs})
                    </p>
                  </>
                );
              })}
            </div>
            <div className="w-full h-full">
              {show.map((item,index) => {
                return (
                  <>
                    <div key={index} className="border-4 border-black w-[250px] mx-72 my-[70px] p-1">
                      <img
                        src={item?.match?.first_team?.second_team_flag}
                        width={250}
                      />
                    </div>
                    <div className="w-[190px] absolute top-[42px] right-[160px]">
                      <img
                        src={item?.match?.first_team?.second_team_captain}
                        width={250}
                      />
                    </div>
                    <p className="absolute top-[40%] text-xl right-[450px] fonn font-bold">
                      {item?.match_info?.match_summary?.second_team_score}
                    </p>
                    <p className="text-sm absolute top-[48%] right-[450px] ">
                      Overs: ({item?.match_info?.scorecard[1]?.overs})
                    </p>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} setSeries={setSeries} navigate={navigate} />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen, navigate }) => {

  const settings = {
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1220, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375, // xs
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="text-white pt-12 rounded-lg w-[85%] h-80 relative overflow-hidden"
          >
          <Slider {...settings}>
            {
              items.map((item) =>(
                <div onClick={()=>{navigate(`/series/${item.series}`); setIsOpen(false)}} className="cursor-pointer">
                  <img src={item.imgSrc} width={170}/>
                  <p className="fon pt-1 font-semibold">{item.title}</p>
                </div>
              ))
            }
          </Slider>  
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavBar;

const items = [
  {
    id: 1,
    title: "NZ vs IND 2024",
    imgSrc:
      "https://cricketvectors.akamaized.net/Series/1MB.png?impolicy=default_web",
  },
  {
    id: 2,
    title: "ENG vs PAK 2024",
    imgSrc:
      "https://cricketvectors.akamaized.net/Series/1MO.png?impolicy=default_web",
  },
  {
    id: 3,
    title: "WI vs SL 2024",
    imgSrc:
      "https://cricketvectors.akamaized.net/Series/1OA.png?impolicy=default_web",
  },
  {
    id: 4,
    title: "BAN vs IND 2024",
    series: "Bangladesh tour of India 2024",
    imgSrc:
      "https://cricketvectors.akamaized.net/Series/1MC.png?impolicy=default_web",
  },
  {
    id: 5,
    title: "WT20 World Cup 2024",
    series: "WT20 World Cup 2024",
    imgSrc:
      "https://cricketvectors.akamaized.net/Series/1J0.png?impolicy=default_web",
  },
  {
    id: 6,
    title: "SA vs BAN 2024",
    imgSrc:
      "https://cricketvectors.akamaized.net/Series/1OG.png?impolicy=default_web",
  },
  {
    id: 7,
    title: "NZW vs INDW 2024",
    imgSrc:
      "https://cricketvectors.akamaized.net/Series/1OR.png?impolicy=default_web",
  },
  {
    id: 8,
    title: "ECS Malta 2024",
    imgSrc:
      "https://cricketvectors.akamaized.net/Series/1OX.png?impolicy=default_web",
  }
];
