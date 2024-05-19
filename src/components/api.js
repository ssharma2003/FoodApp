// api.js
import axios from 'axios';

const API_KEY = '20ef87dd82cd47329d443368c9e3fcaa';
const BASE_URL = 'https://api.spoonacular.com/recipes';


export const fetchRecipes = async (cuisine) => {
  try {
    const params = {
      apiKey: API_KEY,
      number: 20, // Number of recipes to fetch
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
