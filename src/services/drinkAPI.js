const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const fetchDrinkAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
};

export default fetchDrinkAPI;
