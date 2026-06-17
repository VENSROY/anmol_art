import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Collections from "./components/Collections";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

// ── Lazy-loaded heavy routes ──────────────────────────────────────────────────
const Stock      = lazy(() => import("./components/Stock"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));

// ── Loading fallback ──────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" />
        <p className="text-earthy-brown/40 text-xs uppercase tracking-widest">Loading…</p>
      </div>
    </div>
  );
}

// ── 404 Not Found page ────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-32">
      <p className="text-royal-gold font-serif italic text-lg mb-3">404</p>
      <h1 className="font-serif text-5xl font-bold text-royal-maroon mb-6">Page Not Found</h1>
      <p className="text-earthy-brown/60 max-w-md mb-8">
        The page you're looking for doesn't exist. Browse our collections or return home.
      </p>
      <a
        href="/"
        className="bg-royal-maroon text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-royal-gold hover:text-royal-maroon transition-all duration-300"
      >
        Back to Home
      </a>
    </div>
  );
}

// ── Home page (all sections) ──────────────────────────────────────────────────
function Home() {
  return (
    <>
      <Hero />
      <div id="about"><About /></div>
      <div id="collection"><Collections /></div>
      <div id="stock">
        <Suspense fallback={<PageLoader />}>
          <Stock />
        </Suspense>
      </div>
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
      <main className="flex-grow" id="main-content">
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
        <Route
          path="/admin"
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminPanel />
            </Suspense>
          }
        />

        {/* ── Public routes wrapped in shared layout ── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          {/* Stock / Collections gallery */}
          <Route
            path="/collections"
            element={
              <Suspense fallback={<PageLoader />}>
                <Stock />
              </Suspense>
            }
          />
          <Route
            path="/stock"
            element={
              <Suspense fallback={<PageLoader />}>
                <Stock />
              </Suspense>
            }
          />
          <Route
            path="/collections/:category"
            element={
              <Suspense fallback={<PageLoader />}>
                <Stock />
              </Suspense>
            }
          />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}