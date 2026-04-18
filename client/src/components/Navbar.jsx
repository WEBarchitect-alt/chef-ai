import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <h1
        onClick={() => navigate("/")}
        className="text-red-500 text-2xl font-bold cursor-pointer"
      >
        Chef AI
      </h1>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/favorites")}
          className="bg-gray-800 px-4 py-2 rounded"
        >
          ❤️ Favorites
        </button>

        <button
          onClick={() => navigate("/ai")}
          className="bg-red-600 px-4 py-2 rounded"
        >
          AI Chef
        </button>
      </div>
    </div>
  );
}