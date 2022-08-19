const FOOD_LIST_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const FOOD_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

const fetchFoodAPI = async () => {
  const response = await fetch(FOOD_LIST_URL);
  const data = await response.json();
  return data.meals;
};

const fetchFoodCategories = async () => {
  const response = await fetch(FOOD_CATEGORIES_URL);
  const data = await response.json();
  console.log(data.meals);
  return data.meals;
};

export {
  fetchFoodAPI,
  fetchFoodCategories,
};
