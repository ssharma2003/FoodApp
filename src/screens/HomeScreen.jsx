// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView, TextInput } from 'react-native';
// import { fetchRecipes, fetchRecipeDetails } from '../components/api'; // Adjust this path based on your project structure

// const HomeScreen = ({ navigation }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCuisine, setSelectedCuisine] = useState('All');
//   const cuisines = ['All', 'Italian', 'Chinese', 'American', 'Mexican', 'Indian']; // Add more cuisines as needed

//   useEffect(() => {
//     const getRecipes = async () => {
//       setLoading(true);
//       try {
//         const recipesData = await fetchRecipes(selectedCuisine);
//         const detailedRecipes = await Promise.all(
//           recipesData.map(async (recipe) => {
//             const details = await fetchRecipeDetails(recipe.id);
//             return { ...recipe, ...details };
//           })
//         );
//         setRecipes(detailedRecipes);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getRecipes();
//   }, [selectedCuisine]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.errorText}>Error fetching recipes: {error.message}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <View style={styles.headerTop}>
//           <Text style={styles.greeting}>Hello Fola</Text>
//           <Image
//             source={require('../../assets/profile.jpg')}
//             style={styles.profileImage}
//           />
//         </View>
//         <Text style={styles.subGreeting}>What are you cooking today?</Text>
//       </View>
//       <ScrollView horizontal style={styles.cuisineContainer}>
//         {cuisines.map(cuisine => (
//           <TouchableOpacity
//             key={cuisine}
//             style={[
//               styles.cuisineButton,
//               selectedCuisine === cuisine && styles.selectedCuisineButton
//             ]}
//             onPress={() => setSelectedCuisine(cuisine)}
//           >
//             <Text style={[styles.cuisineButtonText,
//               selectedCuisine === cuisine && styles.selectedCuisineButtonText
//             ]}>{cuisine}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <FlatList
//         data={recipes}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => navigation.navigate('Details', { id: item.id })}
//           >
//             <Image source={{ uri: item.image }} style={styles.image} />
//             <View style={styles.likesContainer}>
//               <Image source={require('../../assets/Black-Heart-2.png')} style={styles.likeImage} />
//               <Text style={styles.likeText}>{item.aggregateLikes}</Text>
//             </View>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.rating}>Health Score: {item.healthScore}%</Text>
//             <Text style={styles.rating}>Servings: {item.servings}</Text>
//             <Text style={styles.rating}>Preparation time: {item.readyInMinutes} minutes</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   headerContainer: {
//     marginTop: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//   },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   subGreeting: {
//     fontSize: 18,
//     color: '#666',
//     marginVertical: 10,
//   },
//   cuisineContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//   },
//   cuisineButton: {
//     padding: 10,
//     marginHorizontal: 5,
//     backgroundColor: '#EADBC8',
//     borderRadius: 20,
//     height: 40,
//     marginBottom: 20,
//   },
//   selectedCuisineButton: {
//     backgroundColor: '#129575',
//   },
//   cuisineButtonText: {
//     color: '#129575',
//     fontWeight: 'bold',
//   },
//   selectedCuisineButtonText:{
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 15,
//   },
//   card: {
//     flex: 1,
//     margin: 20,
//     padding: 10,
//     backgroundColor: '#EADBC8',
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     color: '#129575',
//   },
//   rating: {
//     fontSize: 14,
//     color: 'grey',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 18,
//   },
//   likeImage: {
//     width: 25,
//     height: 25,
//     tintColor: 'red',
//   },
//   likeText:{
//     fontSize: 15,
//     color: '#000',
//   },
//   likesContainer:{
//     position: 'absolute',
//     top: 170,
//     right: 20,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     justifyContent:'space-between',
//     padding: 5,
//   },
// });

// export default HomeScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { fetchRecipes, fetchRecipeDetails } from "../components/api"; // Adjust this path based on your project structure


const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const cuisines = [
    "All",
    "Italian",
    "Chinese",
    "American",
    "Mexican",
    "Indian",
  ]; // Add more cuisines as needed

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const recipesData = await fetchRecipes(selectedCuisine);
        const detailedRecipes = await Promise.all(
          recipesData.map(async (recipe) => {
            const details = await fetchRecipeDetails(recipe.id);
            return { ...recipe, ...details };
          })
        );
        setRecipes(detailedRecipes);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [selectedCuisine]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Text style={styles.errorText}>
          Error fetching recipes: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <Text style={styles.greeting}>Hello Fola</Text>
          <Image
            source={require("../../assets/profile.jpg")}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.subGreeting}>What are you cooking today?</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipe"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <ScrollView horizontal style={styles.cuisineContainer}>
        {cuisines.map((cuisine) => (
          <TouchableOpacity
            key={cuisine}
            style={[
              styles.cuisineButton,
              selectedCuisine === cuisine && styles.selectedCuisineButton,
            ]}
            onPress={() => setSelectedCuisine(cuisine)}
          >
            <Text
              style={[
                styles.cuisineButtonText,
                selectedCuisine === cuisine && styles.selectedCuisineButtonText,
              ]}
            >
              {cuisine}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.likesContainer}>
              <Image
                source={require("../../assets/Black-Heart-2.png")}
                style={styles.likeImage}
              />
              <Text style={styles.likeText}>{item.aggregateLikes}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.rating}>Health Score: {item.healthScore}%</Text>
            <Text style={styles.rating}>Servings: {item.servings}</Text>
            <Text style={styles.rating}>
              Preparation time: {item.readyInMinutes} minutes
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  subGreeting: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  cuisineContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  cuisineButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    height: 40,
    marginBottom: 30,
  },
  selectedCuisineButton: {
    backgroundColor: "#129575",
  },
  cuisineButtonText: {
    color: "#71b1a1",
    fontWeight: "bold",
  },
  selectedCuisineButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  card: {
    flex: 1,
    margin: 20,
    padding: 10,
    backgroundColor: "#d9d9d9",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#129575",
  },
  rating: {
    fontSize: 14,
    color: "#484848",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
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
    top: 170,
    right: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "space-between",
    padding: 5,
  },
});

export default HomeScreen;
