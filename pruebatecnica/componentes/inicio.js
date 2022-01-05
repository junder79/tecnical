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
import {List, Button, Avatar, Card, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    {myIcon}
  </View>
);

function App({screenName}) {
  useEffect(() => {
    getData();
  }, []);
  const navigation = useNavigation();
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
        onPress={() =>
          navigation.navigate('Historial', {
            otherParam: item.unidad_medida,
            tipo: item.codigo,
          })
        }
        right={props => (
          <Button
            icon="camera"
            color="red"
            size={20}
            onPress={() =>
              navigation.navigate('Detalle', {
                fecha: item.fecha,
                tipoIndicador: item.codigo,
              })
            }
          />
        )}
      />
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
