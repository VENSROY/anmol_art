import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Collections from "./components/Collections";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Stock from "./components/Stock";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Collections />
      <Services />
      <FAQ />
      <Contact />
    </>
  );
}

function CollectionsPage() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl font-bold">All Collections</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="bg-ivory text-earthy-brown overflow-x-hidden">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/collections/wood" element={<Stock />} />
          <Route path="/collections/decor" element={<Stock />} />
          <Route path="/collections/painting" element={<Stock />} />
          <Route path="/collections/furniture" element={<Stock />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}