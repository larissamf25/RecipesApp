const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const fetchFoodAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
};

export default fetchFoodAPI;
