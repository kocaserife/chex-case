"use client";
import React, { useState } from "react";
import WordGame from "@/components/home/WordGame";
import LandingWrapper from "../home/LandingWrapper";

const HomeContainer = () => {
  const [landingOpen, setLandingOpen] = useState(true);

  return (
    <div>
      {!landingOpen && <WordGame />}
      <LandingWrapper open={landingOpen} setOpen={setLandingOpen} />
    </div>
  );
};

export default HomeContainer;
