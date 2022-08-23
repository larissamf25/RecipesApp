const fetchDrinkAPI = async () => {
  const DRINK_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const drinkListResponse = await fetch(DRINK_LIST_URL);
  const drinkListData = await drinkListResponse.json();
  return drinkListData.drinks;
};

const fetchDrinkAPIByCategory = async (category) => {
  const DRINK_LIST_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(DRINK_LIST_URL);
  const data = await response.json();
  return data.drinks;
};

const fetchDrinkCategories = async () => {
  const DRINK_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const drinkCategoriesResponse = await fetch(DRINK_CATEGORIES_URL);
  const drinkCategoriesData = await drinkCategoriesResponse.json();
  return drinkCategoriesData.drinks;
};

const fecthDrinkById = async (id) => {
  const FOOD_LIST_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(FOOD_LIST_URL);
  const data = await response.json();
  return data.drinks[0];
};

const fetchDrinkRecomendations = async () => {
  const RECIPE_RECOMENDATION = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(RECIPE_RECOMENDATION);
  const data = await response.json();
  return data.drinks;
};

export {
  fetchDrinkAPI,
  fetchDrinkCategories,
  fetchDrinkAPIByCategory,
  fecthDrinkById,
  fetchDrinkRecomendations,
};
