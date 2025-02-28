import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from 'react-router-dom';
import './page.css';

const Squads = () => {
  const { series } = useParams();
  const [squad, setSquad] = useState([]);
  const [teamname, setTeamName] = useState('');

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      { breakpoint: 1220, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 375, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/squads/${series}`)
      .then(res => {
        setSquad(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [series]);

  const members = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/squadmem/${series}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="w-[100%] h-[100%] py-1">
      <div className="w-[40%] h-[200px] my-14 mx-[8%]">
        <Slider {...settings}>
          {squad[0]?.team?.map((item, index) => (
            <div key={index} className="cursor-pointer w-fit h-fit -mx-4">
              <div>
                <img src={item?.team_logo} alt={item?.team_name} />
              </div>
              <div className='w-36 h-10 fonn shadow-[0_10px_25px_rgba(0,0,0,0.1)] text-center text-lg border-2 font-semibold pt-[5px] relative -top-12 left-10 bg-white'>
                {item?.team_name}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-[70%] h-[200px] my-14 border-2 border-black mx-[8%]">
        <button onClick={members}>BTN</button>
      </div>
    </div>   
  );
};

export default Squads;
