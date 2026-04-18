// src/utils/getImage.js

export const getImage = (recipe) => {
  const map = {
    "paneer butter masala":
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000",
    "paneer bhurji":
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000",
    "paneer sandwich":
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000",
    "veg sandwich":
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=1000",
    "bread pizza":
      "https://images.unsplash.com/photo-1594007654729-407eedc4fe24?q=80&w=1000",
    "cold coffee":
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000",
    "mango smoothie":
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000",
  };

  const key = recipe.toLowerCase().trim();

  return (
    map[key] ||
    `https://source.unsplash.com/featured/400x300/?food,${recipe}`
  );
};