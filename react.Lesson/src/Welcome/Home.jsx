import React from "react";
import FullPage from "./CoursesSection";
import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import Footer from "./Footer";
import Navbar from "./NavBar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <StatsBar /> */}
      <FullPage />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
