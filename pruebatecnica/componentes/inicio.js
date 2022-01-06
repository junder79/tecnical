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
import {
  List,
  Button,
  Avatar,
  Card,
  IconButton,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
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
  const [estadoCarga, setEstadoCarga] = useState(true);
  const getData = () => {
    var url = 'https://mindicador.cl/api/';
    setEstadoCarga(true);
    axios
      .get(url)
      .then(response => {
        setDataCars(response.data);
        setEstadoCarga(false);
      })
      .catch(e => {
        alert('error' + e);
      });
  };
  const dato = Object.values(dataCars);

  dato.splice(0, 3);
  const renderItem = ({item}) => (
    <View>
      <Card style={styles.cardEstilo}>
        <List.Item
          title={item.codigo}
          description={item.unidad_medida}
          titleStyle={{color: 'white', fontWeight: 'bold', fontSize: 20}}
          descriptionStyle={{color: 'white'}}
          onPress={() =>
            navigation.navigate('Historial', {
              otherParam: item.unidad_medida,
              tipo: item.codigo,
            })
          }
          right={props => (
            <Button
              icon="information"
              color="white"
              size={50}
              onPress={() =>
                navigation.navigate('Detalle', {
                  fecha: item.fecha,
                  tipoIndicador: item.codigo,
                })
              }
            />
          )}
        />
      </Card>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {estadoCarga ? (
        <ActivityIndicator size={90} animating={true} color={Colors.red800} />
      ) : (
        <FlatList
          data={dato}
          renderItem={renderItem}
          keyExtractor={item => item.codigo}
        />
      )}
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
  cardEstilo: {
    borderRadius: 20,
    backgroundColor: '#34AE7A',
    margin: 10,
    shadow: 20,
  },
});
export default App;
