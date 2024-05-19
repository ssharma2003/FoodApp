// // screens/HomeScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
// import { fetchRecipes } from '../components/api';
// const HomeScreen = ({ navigation }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getRecipes = async () => {
//       try {
//         const recipesData = await fetchRecipes();
//         setRecipes(recipesData);
//         //console.log(recipesData);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getRecipes();
//   }, []);

  

//   if (error) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.errorText}>Error fetching recipes: {error.message}</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={recipes}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => (
//         <View>
//           <Image source={{ uri: item.image }} style={styles.image} />
//           <TouchableOpacity
//           style={styles.card}
//           onPress={() => navigation.navigate('Details', { id: item.id })}
//         >
          
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.rating}>Rating: {item.spoonacularScore}</Text>
//           <Text style={styles.rating}>Servings: {item.servings}</Text>
//           <Text style={styles.rating}>Preparation time: {item.readyInMinutes} minutes</Text>
//         </TouchableOpacity>
//         </View>
        
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   image:{
//     width: 170,
//     height: 170,
//     borderRadius: 100,
//     marginHorizontal: "30%",
//     position: "relative",
//     top: 100,
//     zIndex: 1,
//   },
//   card: {
//     flex: 1,
//     height:250,
//     width:"90%",
//     justifyContent: 'flex-end',
//     marginHorizontal: "5%",
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   title: {
//     justifyContent: 'end',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   rating: {
//     fontSize: 14,
//     color: '#888',
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
// });

// export default HomeScreen;


// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { fetchRecipes } from '../components/api';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipesData = await fetchRecipes();
        setRecipes(recipesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, []);

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
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Details', { id: item.id })}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.rating}>Rating: {item.spoonacularScore}</Text>
            <Text style={styles.rating}>Servings: {item.servings}</Text>
            <Text style={styles.rating}>Preparation time: {item.readyInMinutes} minutes</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  listContent: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  card: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});

export default HomeScreen;


