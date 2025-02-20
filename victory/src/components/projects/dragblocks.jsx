import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import "./page.css";
import Marquee from 'react-fast-marquee';

const DragBlocks = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/home");
  };
  return (
    <div>
      <section
        className="w-full h-screen z-0 bg-slate-700 realative grid place-items-center"
        style={{ overflowX: "hidden" }}
      >
        <Marquee 
        className="text-[300px] z-0 text-slate-400 font-bold uppercase"
        gradient={false} speed={200} 
        style={{ transform: "rotate(12deg)" }}
        >
        sports
      </Marquee>
        <Cards handleclick={handleclick} />
      </section>
    </div>
  );
};

const Cards = ({ handleclick }) => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="https://img.freepik.com/premium-vector/dynamic-vector-art-cricket-player-action-vibrant-colors-fluid-motion_968957-4848.jpg?w=740"
        alt="Example image"
        rotate="8deg"
        top="20%"
        left="25%"
        className="w-36 md:w-64"
        handleclick={handleclick}
      />
      <Card
        containerRef={containerRef}
        src="https://img.freepik.com/premium-vector/badminton-player-watercolor-vector_646696-10597.jpg?w=740"
        alt="Example image"
        rotate="12deg"
        top="45%"
        left="60%"
        className="w-24 md:w-64 "
      />
      <Card
        containerRef={containerRef}
        src="https://img.freepik.com/premium-vector/dynamic-football-players-action-stadium_906149-74944.jpg?w=1380"
        alt="Example image"
        rotate="-6deg"
        top="20%"
        left="40%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src="https://img.freepik.com/premium-vector/ice-hockey-player-with-number-10-his-jersey_1235303-3399.jpg?w=740"
        alt="Example image"
        rotate="8deg"
        top="50%"
        left="40%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://img.freepik.com/premium-photo/volleyball-player-spiking-ball_1106493-443863.jpg?w=1380"
        alt="Example image"
        rotate="18deg"
        top="20%"
        left="65%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="https://img.freepik.com/free-photo/american-football-character-with-equipment_23-2151154219.jpg?t=st=1730180849~exp=1730184449~hmac=45b1c03068b88a6fb2cddc0d9f01968f701968fe8e4ab19d525c6cffc2bcd87e&w=360"
        alt="Example image"
        rotate="-3deg"
        top="35%"
        left="55%"
        className="w-24 md:w-48"
      />
    </div>
  );
};

const Card = ({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  className,
  handleclick,
}) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      onClick={handleclick}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-[#babcbe] p-1 pb-5 cursor-pointer",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};

export default DragBlocks;
