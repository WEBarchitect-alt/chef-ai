const KEY = "favorites";

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const saveFavorite = (recipe) => {
  const existing = getFavorites();

  const already = existing.find((r) => r.title === recipe.title);

  if (!already) {
    const updated = [...existing, recipe];
    localStorage.setItem(KEY, JSON.stringify(updated));
  }
};

export const removeFavorite = (title) => {
  const updated = getFavorites().filter((r) => r.title !== title);
  localStorage.setItem(KEY, JSON.stringify(updated));
};

export const isFavorite = (title) => {
  return getFavorites().some((r) => r.title === title);
};