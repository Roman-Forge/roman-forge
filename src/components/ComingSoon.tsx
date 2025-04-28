import React, { useEffect, useState } from "react";
import Logo from "./Logo";

const ComingSoon: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <Logo />
      <div className="border-t-white m-4 border w-1/2 opacity-20" />
      <h1 className="text-4xl md:text-6xl font-light text-white tracking-wider">
        COMING SOON
      </h1>
      <p className="mt-4 text-md md:text-xl text-white/80 max-w-md text-center px-4">
        We're just warming up the fires. Stay tuned for a future that we can
        forge together.
      </p>
      <div className="border-t-white m-4 border w-1/2 opacity-20" />
      <form
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col items-center"
      >
        <div className="inline-flex items-center justify-center relative overflow-hidden group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-6 py-3 w-64 md:w-80 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#12403C]/50 transition-all"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="absolute right-1 rounded-full px-4 py-2 bg-[#12403C] text-white hover:bg-[#0D2E2B] transition-all duration-200"
          >
            {status === "loading" ? "Sending..." : "Notify Me"}
          </button>
        </div>
        {status === "success" && (
          <p className="text-green-400 text-xs mt-2">
            Thank you! You'll be notified.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-xs mt-2">
            Something went wrong. Try again.
          </p>
        )}
        <p className="text-white/60 text-sm mt-2 bold">
          We'll notify you when we launch.
        </p>
      </form>
    </div>
  );
};

export default ComingSoon;

