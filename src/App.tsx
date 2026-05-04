import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Collections from "./components/Collections";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Stock from "./components/Stock";
import WhatsAppFloat from "./components/WhatsAppFloat";
import SearchBar from "./components/SearchBar";
import Newsletter from "./components/Newsletter";
import Blog from "./components/Blog";
import LiveChat from "./components/LiveChat";

function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <SearchBar />
      <div id="about"><About /></div>
      <div id="collection"><Collections /></div>
      <div id="stock"><Stock /></div>
      <div id="services"><Services /></div>
      <FAQ />
      <div id="contact"><Contact /></div>
      <Newsletter />
    </>
  );
}

export default function App(): JSX.Element {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Router>
      <div className={`${isDark ? "dark" : ""} bg-ivory dark:bg-slate-900 text-earthy-brown dark:text-gray-100 overflow-x-hidden min-h-screen flex flex-col transition-colors duration-300`}>
        <Navbar themeToggle={toggleTheme} isDark={isDark} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Stock />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/collections/:category" element={<Stock />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppFloat />
        <LiveChat />
      </div>
    </Router>
  );
}