export async function fetchRecipesByIngredient(ingredient) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const data = await fetch(endpoint)
    .then((response) => response.json());
  return data.meals;
}

export async function fetchRecipesByLetter(letter) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const data = await fetch(endpoint)
    .then((response) => response.json());
  console.log(data.meals);
  return data.meals;
}

export async function fetchRecipesByName(name) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const data = await fetch(endpoint)
    .then((response) => response.json());
  return data.meals;
}
