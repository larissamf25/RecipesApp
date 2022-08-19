const DRINK_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINK_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const fetchDrinkAPI = async () => {
  const drinkListResponse = await fetch(DRINK_LIST_URL);
  const drinkListData = await drinkListResponse.json();
  return drinkListData.drinks;
};

const fetchDrinkCategories = async () => {
  const drinkCategoriesResponse = await fetch(DRINK_CATEGORIES_URL);
  const drinkCategoriesData = await drinkCategoriesResponse.json();
  console.log(drinkCategoriesData.drinks);
  return drinkCategoriesData.drinks;
};

export {
  fetchDrinkAPI,
  fetchDrinkCategories,
};
