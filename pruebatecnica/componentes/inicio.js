import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {List, Button} from 'react-native-paper';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function App() {
  useEffect(() => {
    getData();
  }, []);

  const [dataCars, setDataCars] = useState('');
  const getData = () => {
    var url = 'https://mindicador.cl/api/';

    axios
      .get(url)
      .then(response => {
        setDataCars(response.data);
      })
      .catch(e => {
        alert('error' + e);
      });
  };
  const dato = Object.values(dataCars);

  dato.splice(0, 3);
  const renderItem = ({item}) => (
    <View>
      <List.Item
        title={item.codigo}
        description={item.unidad_medida}
        left={props => <List.Icon {...props} icon="folder" />}
      />
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Detalle
      </Button>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dato}
        renderItem={renderItem}
        keyExtractor={item => item.codigo}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default App;
