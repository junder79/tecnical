import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import axios from 'axios';
import {List, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
function DetalleDiario(props) {
  useEffect(() => {
    getDetalle();
  }, []);

  const [data, setData] = useState('');

  const getDetalle = () => {
    /* const fechaConsultada = props.fechaConsultada; */
    const fecha = props.fecha;
    const tipoIndicador = props.tipoIndicador;
    alert('FECHA ' + fecha + 'INDICADOR ' + tipoIndicador);
    const url = 'https://mindicador.cl/api/' + tipoIndicador + '/' + fecha;

    axios
      .get(url)
      .then(response => {
        // alert(JSON.stringify(response.data.serie));
        // setData(response.data.serie);
      })
      .catch(e => {
        // alert('error' + e);
      });
  };

  const dato = Object.values(data);
  const renderItem = ({item}) => (
    <View>
      <List.Item
        title={item.fecha}
        description={item.valor}
        left={props => <List.Icon {...props} icon="folder" />}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dato}
        renderItem={renderItem}
        keyExtractor={item => item.valor}
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

export default DetalleDiario;
