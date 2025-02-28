import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./page.css";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "./windowsize";
import { MdSportsCricket } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(items[0]?.id);

  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 2,
    pauseOnHover: true,
    autoplay: true,
    arrows: false,
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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/carousels`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch carousel data:", err);
      });
  }, []);


  return (
    <>
      <div className="w-[80%] h-[100%] py-1">
        <div className="w-[100%] h-[300px] my-14 mx-[10.5%] rounded-3xl">
          <Slider {...settings}>
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/match/${item._id}`)}
                className="cursor-pointer w-52 h-64 border-2 slide rounded-3xl -mx-5 my-[22px] overflow-hidden bg-white flex flex-col justify-between"
              >
                {/* Header */}
                <div className="w-full h-11 fon shadow-[0_10px_25px_rgba(0,0,0,0.1)] text-lg px-3 py-1 text-slate-700 bg-slate-400 font-bold text-center">
                  {item.match.series}
                </div>

                {/* Match Info */}
                <p className="w-full h-7 px-3 py-1 text-center fonn text-sm font-semibold">
                  {item.match.first_team.code}{" "}
                  <span className="text-xs">Vs</span>{" "}
                  {item.match.second_team.code},{" "}
                  {item.match.dates[0].match_subtitle}
                </p>

                {/* Teams Section */}
                <div className="flex justify-center items-center w-full h-[150px] px-4 py-1">
                  {/* Team 1 */}
                  <div className="flex flex-col items-center w-1/2">
                    <img
                      src={item.match.first_team.flag}
                      width="70px"
                      alt="Team 1 flag"
                    />
                    <p className="font-semibold text-xl">
                      {item.match.first_team.name}
                    </p>
                    <p className="text-md -mx-3">
                      {item.match_info.match_summary.first_team_score}
                    </p>
                    <p className="text-xs">
                      Overs: {item.match_info.scorecard[0].overs}
                    </p>
                  </div>

                  {/* Vs */}
                  <p className="text-3xl fonn font-bold text-yellow-500 mx-4">
                    Vs
                  </p>

                  {/* Team 2 */}
                  <div className="flex flex-col items-center w-1/2">
                    <img
                      src={item.match.second_team.flag}
                      width="70px"
                      alt="Team 2 flag"
                    />
                    <p className="font-semibold text-xl">
                      {item.match.second_team.name}
                    </p>
                    <p className="text-md">
                      {item.match_info.match_summary.second_team_score}
                    </p>
                    <p className="text-xs">
                      Overs: {item.match_info.scorecard[1].overs}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center font-bold text-sm py-2">
                  {item.match_info.scorecard[1].won}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <section className="p-4 w-[90%] mx-48">
          <p className="text-center text-slate-700 text-4xl uppercase font-bold underline py-5">news</p>
          <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden">
            {items.map((item) => {
              return (
                <Panel
                  key={item.id}
                  open={open}
                  setOpen={setOpen}
                  id={item.id}
                  title={item.title}
                  imgSrc={item.imgSrc}
                  description={item.description}
                />
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

const Panel = ({ open, setOpen, id, title, imgSrc, description }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className="bg-white hover:bg-slate-50 transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}
      >
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-xl font-light rotate-180"
        >
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light">{title}</span>
        <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white"
            >
              <p className="text-4xl font-semibold fon">{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};

const items = [
  {
    id: 1,
    title: "India Tour of Australia 2024-25",
    imgSrc:
      "https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1729601324799_gaikwad_IND_A.jpg",
    description:
      "Gaikwad In Middle Order; Will Ishan Kishan Play? India As Strongest Playing XI For Australia Tour..",
  },
  {
    id: 2,
    title: "Virat Kohli & Smriti Mandhana",
    imgSrc:
      "https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1729603874321_virat%20kohli.jpg",
    description:
      "RCB Duo Virat Kohli, Mandhana With Messi And Ronaldo: Full List Of Most Marketable Sportspersons..",
  },
  {
    id: 3,
    title: "Indian Premier League",
    imgSrc:
      "https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1729592262754_sl_wi.jpg",
    description:
      "SL vs WI Dream11 Prediction Today Match, Fantasy Cricket Tips, Pitch Report - West Indies Tour Of Sri Lanka 2024, 2nd ODI",
  },
  {
    id: 4,
    title: "South Africa tour of Bangladesh 2024",
    imgSrc:
      "https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1729605640050_Screenshot%202024-10-22%20at%207.29.58%C3%A2%C2%80%C2%AFPM.jpg",
    description:
      "Shaheen Afridi's Long-Term Potential Replacement Likely To Be Out Of PAK Vs ENG 3rd Test",
  },
];
