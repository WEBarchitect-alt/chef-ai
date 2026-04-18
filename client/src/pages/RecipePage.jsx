import { useLocation } from "react-router-dom";
import { getImage } from "../utils/getImage";

export default function RecipePage() {
  const location = useLocation();
  const recipe = location.state;

  if (!recipe) {
    return <div className="text-white p-6">No recipe found ❌</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      {/* IMAGE */}
      <img
        src={getImage(recipe.title)}
        alt={recipe.title}
        className="w-full h-[300px] object-cover rounded-xl mb-6"
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      {/* META INFO */}
      <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
        <span>⏱ {recipe.time}</span>
        <span>🍽 {recipe.servings}</span>
        <span>🔥 {recipe.calories}</span>
        <span>⚡ {recipe.difficulty}</span>
      </div>

      {/* INGREDIENTS */}
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc ml-6 mb-6">
        {(recipe.ingredients || []).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* STEPS */}
      <h2 className="text-xl font-semibold mb-2">Steps</h2>
      <ol className="list-decimal ml-6 space-y-2">
        {(recipe.steps || []).map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}