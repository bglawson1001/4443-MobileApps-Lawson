import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, Image } from 'react-native';
import axios from 'axios';
import Colors from '../constants/Colors';

interface Candy {
  id: string;
  name: string;
  prod_url: string;
  img_url: string;
  price: string;
  desc: string;
  category: string;
  category_id: string;
}

const SearchCandies = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<Candy[]>([]);
  const [category, setCategory] = useState<string>('');

  const searchCandies = async () => {
    try {
      let url = 'http://143.198.158.17:8084/search_by_category';
      let queryParams = [];
  
      if (category) {
        queryParams.push(`category=${encodeURIComponent(category)}`);
      }
  
      if (keyword) {
        queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
      }
  
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
  
      const response = await axios.get(url);
      setResults(response.data.candies);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch candies. Please try again later.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setKeyword}
          value={keyword}
          placeholder="Enter candy keyword"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCategory}
          value={category}
          placeholder="Enter category"
        />
        <Button
          title="Search"
          onPress={searchCandies}
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.img_url }} style={styles.image} />
            <Text style={styles.item}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    height: 40,
    width: '30%',
    borderWidth: 1,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    aspectRatio: 1,
    height: 50,
    marginRight: 10,
  },
  item: {
    flex: 1,
    fontSize: 18,
  },
  price: {
    flex: 1,
    fontSize: 18,
    color: Colors.light.tint,
  },
});

export default SearchCandies;
