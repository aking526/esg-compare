import React from "react";
import AboutSection from "../components/AboutSection";

const About: React.FC = () => {
  return (
    <div className="flex flex-col bg-slate-100 font-modern">
      <h1 className="my-5 mx-auto text-6xl">About</h1>
      <div>
        <AboutSection title="Our Purpose" text="This website was made to..." />
        <AboutSection title="About Us" text="Alistair King built this website..." />
      </div>
    </div>
  );
};

export default About;