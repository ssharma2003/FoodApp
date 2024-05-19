// api.js
import axios from 'axios';

const API_KEY = '20ef87dd82cd47329d443368c9e3fcaa';
const BASE_URL = 'https://api.spoonacular.com/recipes';


export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/random?apiKey=${API_KEY}&number=10`);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
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
