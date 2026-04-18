export default function RecipeCard({ recipe }) {
  return (
    <div className="min-w-[220px] h-[150px] rounded-xl overflow-hidden relative cursor-pointer transform hover:scale-110 hover:z-10 transition duration-300">
      
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
        <h3 className="text-sm font-semibold">{recipe.title}</h3>
        <p className="text-xs">⏱ {recipe.time} min</p>
      </div>

    </div>
  );
}