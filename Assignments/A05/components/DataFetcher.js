import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const DataFetcher = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [candiesData, setCandiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://165.227.222.91:8084/categories')
      .then((response) => {
        setCategoriesData(response.data.categories);
      })
      .catch((error) => {
        Alert.alert(
          'Failed!',
          'Failed to get categories data.'
        );
      });

    axios.get('http://165.227.222.91:8084/candies')
      .then((response) => {
        setCandiesData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert(
          'Failed!',
          'Failed to get candies data.'
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (categoriesData.length > 0 && candiesData.length > 0) {
      setLoading(false);
    }
  }, [categoriesData, candiesData]);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
         
          <FlatList
            data={candiesData.data}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.img_url }} style={styles.image} />
                <Text style = {styles.title}>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
           
          />
        </View>
      )}
    </View>
  );
};

export default DataFetcher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white' ,
    padding: 10,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    borderWidth: 1/2,
    borderColor: 'lightgrey',
  },
  image: {
    width: 100, // Set the width to a specific value (e.g., 100)
    aspectRatio: 1, // Set the height to a specific value (e.g., 100)
    borderRadius: 10, // Add border radius for rounded corners
    resizeMode: 'cover', // Make sure the image covers the entire space
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
