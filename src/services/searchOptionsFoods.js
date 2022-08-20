export async function fetchRecipesByIngredient(ingredient) {
  try {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const data = await fetch(endpoint)
      .then((response) => response.json());
    return data.meals;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRecipesByLetter(letter) {
  try {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    const data = await fetch(endpoint)
      .then((response) => response.json());
    return data.meals;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRecipesByName(name) {
  try {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const data = await fetch(endpoint)
      .then((response) => response.json());
    return data.meals;
  } catch (error) {
    console.log(error);
  }
}
