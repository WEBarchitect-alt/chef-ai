import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const recipes = [
    {
      id: 1,
      title: "Cheesy Paneer Burger",
      time: 15,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000",
    },
    {
      id: 2,
      title: "Chocolate Lava Cake",
      time: 20,
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000",
    },
    {
      id: 3,
      title: "Mango Smoothie",
      time: 5,
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000",
    },
    {
      id: 4,
      title: "Veg Sandwich",
      time: 10,
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000",
    },
    {
      id: 5,
      title: "Cold Coffee",
      time: 5,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <div
        className="h-[90vh] flex items-center px-10 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        <div className="relative z-10 max-w-xl">
          <h1 className="text-6xl font-bold leading-tight">
            Cook Anything.
            <br />
            Anytime.
          </h1>

          <p className="mt-4 text-gray-300">
            AI-powered recipes based on what you have.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/ai")}
              className="bg-red-600 px-6 py-3 rounded font-semibold hover:bg-red-700"
            >
              Explore
            </button>

            <button
              onClick={() => navigate("/ai")}
              className="bg-white text-black px-6 py-3 rounded font-semibold"
            >
              AI Chef
            </button>
          </div>
        </div>
      </div>

      {/* TRENDING */}
      <div className="px-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </div>

      {/* QUICK PICKS */}
      <div className="px-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">⚡ Quick Recipes</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </div>
    </div>
  );
}