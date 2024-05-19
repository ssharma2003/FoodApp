

// screens/HomeScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
// import { fetchRecipes } from '../components/api';

// const HomeScreen = ({ navigation }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [filteredRecipes, setFilteredRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCuisine, setSelectedCuisine] = useState('All');

//   const cuisines = ['All', 'Italian', 'Chinese', 'Indian', 'Mexican', 'French', 'Mediterrenean'];

//   useEffect(() => {
//     const getRecipes = async () => {
//       setLoading(true);
//       try {
//         const recipesData = await fetchRecipes();
//         setRecipes(recipesData);
//         filterRecipes(recipesData, selectedCuisine);
//         console.log(recipesData);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getRecipes();
//   }, []);

//   useEffect(() => {
//     filterRecipes(recipes, selectedCuisine);
//   }, [selectedCuisine, recipes]);

//   const filterRecipes = (recipes, cuisine) => {
//     if (cuisine === 'All') {
//       setFilteredRecipes(recipes);
//     } else {
//       const filtered = recipes.filter(recipe => recipe.cuisines === cuisine);
//       setFilteredRecipes(filtered);
//     }
//   };


//   if (error) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.errorText}>Error fetching recipes: {error.message}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cuisineScroll}>
//         {cuisines.map((cuisine) => (
//           <TouchableOpacity
//             key={cuisine}
//             style={[
//               styles.cuisineButton,
//               selectedCuisine === cuisine && styles.selectedCuisineButton,
//             ]}
//             onPress={() => setSelectedCuisine(cuisine)}
//           >
//             <Text
//               style={[
//                 styles.cuisineText,
//                 selectedCuisine === cuisine && styles.selectedCuisineText,
//               ]}
//             >
//               {cuisine}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <FlatList
//         data={filteredRecipes}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => navigation.navigate('Details', { id: item.id })}
//           >
//             <Image source={{ uri: item.image }} style={styles.image} />
//             <View style={styles.textContainer}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.rating}>Rating: {item.spoonacularScore}</Text>
//               <Text style={styles.rating}>Servings: {item.servings}</Text>
//               <Text style={styles.rating}>Preparation time: {item.readyInMinutes} minutes</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 18,
//     paddingHorizontal: 20,
//     textAlign: 'center',
//   },
//   listContent: {
//     padding: 10,
//   },
//   card: {
//     flex: 1,
//     marginVertical: 10,
//     marginHorizontal: 15,
//     backgroundColor: '#ffffff',
//     borderRadius: 15,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//   },
//   textContainer: {
//     padding: 15,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   rating: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 5,
//   },
//   cuisineScroll: {
//     paddingHorizontal: 10,

//     backgroundColor: '#fff',
//     height: 120,
//   },
//   cuisineButton: {
//     height: 40,
//     marginTop: 50,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 20,
//     marginRight: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   selectedCuisineButton: {
//     backgroundColor: '#ff6347',
//   },
//   cuisineText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   selectedCuisineText: {
//     color: '#fff',
//   },
// });

// export default HomeScreen;


// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { fetchRecipes } from '../components/api'; // Adjust this path based on your project structure

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const cuisines = ['All','Italian', 'Chinese', 'American', 'Mexican', 'Indian']; // Add more cuisines as needed

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const recipesData = await fetchRecipes(selectedCuisine);
        setRecipes(recipesData);
        console.log(recipesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [selectedCuisine]);

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
        <Text style={styles.errorText}>Error fetching recipes: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.cuisineContainer}>
        {cuisines.map(cuisine => (
          <TouchableOpacity
            key={cuisine}
            style={[
              styles.cuisineButton,
              selectedCuisine === cuisine && styles.selectedCuisineButton
            ]}
            onPress={() => setSelectedCuisine(cuisine)}
          >
            <Text style={styles.cuisineButtonText}>{cuisine}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { id: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.rating}>Rating: {item.spoonacularScore}</Text>
            <Text style={styles.rating}>Servings: {item.servings}</Text>
            <Text style={styles.rating}>Preparation time: {item.readyInMinutes} minutes</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cuisineContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: 150,
  },
  cuisineButton: {
    padding: 10,
    height: 40,
    marginTop: 50,
    marginHorizontal: 5,
    backgroundColor: '#bec5ad',
    borderRadius: 20,
  },
  selectedCuisineButton: {
    backgroundColor: '#5c8001',
  },
  cuisineButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fcefb4',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  rating: {
    fontSize: 14,
    color: '#888',
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
});

export default HomeScreen;
