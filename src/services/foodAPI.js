const FOOD_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

const fetchFoodAPI = async () => {
  const FOOD_LIST_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(FOOD_LIST_URL);
  const data = await response.json();
  return data.meals;
};

const fetchFoodAPIByCategory = async (category) => {
  const FOOD_LIST_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(FOOD_LIST_URL);
  const data = await response.json();
  return data.meals;
};

const fetchFoodCategories = async () => {
  const response = await fetch(FOOD_CATEGORIES_URL);
  const data = await response.json();
  return data.meals;
};

export {
  fetchFoodAPI,
  fetchFoodCategories,
  fetchFoodAPIByCategory,
};
