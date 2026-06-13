import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Collections from "./components/Collections";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Stock from "./components/Stock";
import AdminPanel from "./components/AdminPanel";
import WhatsAppFloat from "./components/WhatsAppFloat";

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

/** Shared layout wrapper for all public pages */
function PublicLayout() {
  return (
    <div className="bg-ivory text-earthy-brown overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ── Admin route – no Navbar/Footer ── */}
        <Route path="/admin" element={<AdminPanel />} />

        {/* ── Public routes wrapped in shared layout ── */}
        <Route element={<PublicLayout />}>
          <Route path="/"                      element={<Home />} />
          <Route path="/collections"           element={<Stock />} />
          <Route path="/stock"                 element={<Stock />} />
          <Route path="/collections/wood"      element={<Stock />} />
          <Route path="/collections/decor"     element={<Stock />} />
          <Route path="/collections/painting"  element={<Stock />} />
          <Route path="/collections/furniture" element={<Stock />} />
        </Route>
      </Routes>
    </Router>
  );
}