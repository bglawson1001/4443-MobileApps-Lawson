import React from 'react';
import { View , StyleSheet} from 'react-native';
import DataFetcher from '../../components/DataFetcher';


export default function TabOneScreen() {
  return (
    <View style = {styles.container}>
    <DataFetcher />
  </View>
  );
}

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
