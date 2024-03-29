import React from "react";
import HeroSection from "../components/Home/HeroSection";
import TopPlaces from "../components/Home/TopPlaces";
import ValuesWeProvide from "../components/Home/ValuesWeProvide";
import Testimonials from "../components/Home/Testimonials";
import LetGetToKnow from "../components/Home/LetGetToKnow";
import BookTicketBox from "../components/BookTicketBox";

const Home = () => {
  return (
    <section className="px-[30px] md:px-[30px]">
      <HeroSection />
      <ValuesWeProvide />
      <BookTicketBox />
      <TopPlaces />
      <Testimonials />
      <LetGetToKnow />
    </section>
  );
};

export default Home;
