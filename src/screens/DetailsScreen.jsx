import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import { fetchRecipeDetails } from '../components/api';

const DetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayInstructions, setDisplayInstructions] = useState(false);

  useEffect(() => {
    const getRecipeDetails = async () => {
      try {
        const recipeData = await fetchRecipeDetails(id);
        setRecipe(recipeData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getRecipeDetails();
  }, [id]);

  const showIngredients = () => {
    setDisplayInstructions(false);
  };

  const showInstructions = () => {
    setDisplayInstructions(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error fetching recipe details: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/backarrow.png")} style={{width: 30, height: 30, marginVertical:20}} />
      </View>
      {recipe && (
        <>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <View style={styles.likesContainer}>
              <Image
                source={require("../../assets/Black-Heart-2.png")}
                style={styles.likeImage}
              />
              <Text style={styles.likeText}>{recipe.aggregateLikes}</Text>
            </View>
          <Text style={styles.title}>{recipe.title}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, !displayInstructions && styles.activeButton]} onPress={showIngredients}>
              <Text style={[styles.buttonText, !displayInstructions && styles.activeButtonText]}>Ingredients</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, displayInstructions && styles.activeButton]} onPress={showInstructions}>
              <Text style={styles.buttonText}>Instructions</Text>
            </TouchableOpacity>
          </View>
          {displayInstructions ? (
            <ScrollView>
              <Text style={styles.instructions}>{recipe.instructions}</Text>
            </ScrollView>
          ) : (
            <ScrollView style={styles.ingredientsContainer}>
              {recipe.extendedIngredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientCard}>
                  <Image source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }} style={styles.ingredientImage} />
                  <View style={styles.ingredientDetails}>
                    <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    <Text style={styles.ingredientAmount}>{ingredient.amount} {ingredient.unit}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#484848',
  },
  image: {
    
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    
  },
  button: {
    width: 170,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#129575',
  },
  buttonText: {
    color: '#71b1a1',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#fff',
  },
  instructions: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  ingredientsContainer: {
    paddingVertical: 10,
  },
  ingredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  ingredientImage: {
    width: 50,
    height: 50,
  },
  ingredientDetails: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#484848',
  },
  ingredientAmount: {
    fontSize: 16,
    color: '#d9d9d9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  likeImage: {
    width: 25,
    height: 25,
    tintColor: "#129757",
  },
  likeText: {
    fontSize: 15,
    color: "#000",
  },
  likesContainer: {
    position: "absolute",
    top: 100,
    right: 25,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "space-between",
    padding: 5,
  },
});

export default DetailsScreen;
