import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import StatsBar     from "./components/StatsBar";
import About        from "./components/About";
import Services     from "./components/Services";
import Process      from "./components/Process";
import Pricing      from "./components/Pricing";
import Team         from "./components/Team";
import BookingForm  from "./components/BookingForm";
import Testimonials from "./components/Testimonials";
import WhyUs        from "./components/WhyUs";
import Coverage     from "./components/Coverage";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import FloatButtons from "./components/FloatButtons";
import AdminLogin     from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import "./index.css";

function Home({ isDark, setIsDark }) {
  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <Process />
      <Pricing />
      <Team />
      <BookingForm />
      <Testimonials />
      <WhyUs />
      <Coverage />
      <Contact />
      <Footer />
      <FloatButtons />
    </>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.className = isDark ? "" : "light";
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isDark={isDark} setIsDark={setIsDark} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}