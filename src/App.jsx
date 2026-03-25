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
      <div id="about"><About /></div>
      <div id="collection"><Collections /></div>
      <div id="stock"><Stock /></div>
      <div id="services"><Services /></div>
      <FAQ />
      <div id="contact"><Contact /></div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="bg-ivory text-earthy-brown overflow-x-hidden min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Stock />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/collections/wood" element={<Stock />} />
            <Route path="/collections/decor" element={<Stock />} />
            <Route path="/collections/painting" element={<Stock />} />
            <Route path="/collections/furniture" element={<Stock />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}