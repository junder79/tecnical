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
import {List, Card, ActivityIndicator, Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
function DetalleDiario(props) {
  useEffect(() => {
    getHistorial();
  }, []);

  const [data, setData] = useState('');
  const [tipoIndicador, setTipoIndicador] = useState('');
  const [estadoCarga, setEstadoCarga] = useState(true);
  const navigation = useNavigation();
  const formatoFecha = fecha => {
    let date = new Date(fecha);

    let day = `${date.getDate()}`.padStart(2, '0');
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const getHistorial = () => {
    const tipoIndicador = props.tipoIndicador;
    const url = 'https://mindicador.cl/api/' + tipoIndicador;
    setEstadoCarga(true);
    axios
      .get(url)
      .then(response => {
        setData(response.data.serie);
        setTipoIndicador(response.data.codigo);
        setEstadoCarga(false);
      })
      .catch(e => {
        alert('error' + e);
      });
  };

  const dato = Object.values(data);
  const renderItem = ({item}) => (
    <View>
      <Card>
        <List.Item
          title={formatoFecha(item.fecha)}
          description={'$ ' + item.valor}
          descriptionStyle={{color: 'black', fontWeight: 'bold', fontSize: 20}}
          left={props => <List.Icon {...props} icon="trending-up" />}
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
          keyExtractor={item => item.valor}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default DetalleDiario;
