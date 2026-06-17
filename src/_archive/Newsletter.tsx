import { FC, useState } from "react";
import { trackEvent } from "../hooks/useAnalytics";

const Newsletter: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      trackEvent({
        category: "Newsletter",
        action: "Subscribe",
        label: email,
      });

      // Send to newsletter API
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert("Subscribed! Check your email.");
        setEmail("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-royal-maroon to-royal-maroon/80 dark:from-slate-800 dark:to-slate-900 py-16 px-6 text-center">
      <h2 className="font-serif text-4xl font-bold text-white mb-4">
        Stay Updated
      </h2>
      <p className="text-gray-200 mb-8 max-w-md mx-auto">
        Get new collections, special offers & behind-the-scenes stories
      </p>

      <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-lg focus:outline-none dark:bg-slate-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-royal-gold text-royal-maroon font-bold rounded-lg hover:bg-white transition disabled:opacity-50"
        >
          {loading ? "..." : "Subscribe"}
        </button>
      </form>
    </section>
  );
};

export default Newsletter;