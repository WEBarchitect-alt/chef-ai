import { getFavorites } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { getImage } from "../utils/getImage";

export default function Favorites() {
  const navigate = useNavigate();
  const data = getFavorites();

  if (!data.length) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        No saved recipes yet 😢
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">❤️ My Favorites</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((recipe, i) => (
          <div
            key={i}
            onClick={() =>
              navigate(`/recipe/${recipe.title}`, { state: recipe })
            }
            className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 cursor-pointer"
          >
            <img
              src={getImage(recipe.title)}
              className="w-full h-[120px] object-cover"
            />

            <div className="p-3">
              <h3 className="text-sm font-semibold">{recipe.title}</h3>
              <p className="text-xs text-gray-400">{recipe.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}