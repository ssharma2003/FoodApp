import axios from 'axios';
const API_KEY = '91cf12f069234ed48b4a6db649d52ae1';
const BASE_URL = 'https://api.spoonacular.com/recipes';


export const fetchRecipes = async (cuisine) => {
  try {
    const params = {
      apiKey: API_KEY,
      number: 0, // Number of recipes to fetch
    };
    if (cuisine && cuisine !== 'All') {
      params.cuisine = cuisine;
    }
    const response = await axios.get(`${BASE_URL}/complexSearch`, { params });
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};

export const fetchRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};
