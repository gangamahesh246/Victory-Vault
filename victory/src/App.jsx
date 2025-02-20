import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/projects/components/navBar";
import Footer from "./components/projects/components/footer";


import HomePage from "./components/projects/homePage";
import Fixture from "./components/projects/Fixtures";
import Rules from "./components/projects/rules";
import MatchNav from "./components/projects/matchNav";
import Matches from "./components/projects/matches";
import Overview from "./components/projects/OverView";
import MainMatch from "./components/projects/MainMatch";
import ScoreCard from "./components/projects/Scorecard";
import MatchInfo from "./components/projects/MatchInfo";
import Squads from "./components/projects/Squads";
import DragBlocks from "./components/projects/dragblocks";


function AppContent() {
  const location = useLocation();
  
  const noNavFooterRoutes = ['/'];

  return (
    <>
      {!noNavFooterRoutes.includes(location.pathname) && <NavBar />}
      <div className="bg-[#F2F3F4]">
        <Routes>
          <Route path="/" element={<DragBlocks />} /> 
          <Route path="/home" element={<HomePage />} />
          <Route path="/fixtures" element={<Fixture />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/series/:series" element={<MatchNav />}>
            <Route index element={<Overview />} />
            <Route path="matches" element={<Matches />} />
            <Route path="squads" element={<Squads />} />
          </Route>
          <Route path="/match/:id" element={<MainMatch />}>
            <Route index element={<MatchInfo />} />
            <Route path="scorecard" element={<ScoreCard />} />
          </Route>
        </Routes>
      </div>
      {!noNavFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


