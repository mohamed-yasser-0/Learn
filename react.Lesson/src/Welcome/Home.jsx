import React from "react";
import CoursesSection from "./CoursesSection";
import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import Footer from "./Footer";
import Navbar from "./NavBar";
import StatsBar from "./StatsBar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <StatsBar /> */}
      <CoursesSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
