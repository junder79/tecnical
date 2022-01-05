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
import {List, Button, Card, Title, Paragraph} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
function DetalleDiario(props) {
  useEffect(() => {
    getDetalle();
  }, []);

  const [data, setData] = useState('');
  const [getIndicador, setTipoIndicador] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('');
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [valor, setValor] = useState('');
  const getDetalle = () => {
    /* const fechaConsultada = props.fechaConsultada; */
    const fecha = props.fecha;
    const tipoIndicador = props.tipoIndicador;

    const formatoFecha = fecha => {
      let date = new Date(fecha);

      let day = `${date.getDate()}`.padStart(2, '0');
      let month = `${date.getMonth() + 1}`.padStart(2, '0');
      let year = date.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const url = 'https://mindicador.cl/api/' + tipoIndicador + '/05-01-2022';

    axios
      .get(url)
      .then(response => {
        const dato = Object.values(response.data.serie);

        setData(response.data.serie);
        setTipoIndicador(tipoIndicador);
        setUnidadMedida(response.data.unidad_medida);
        setNombre(response.data.nombre);

        setFecha(formatoFecha(dato[0].fecha));

        setValor(dato[0].valor);
      })
      .catch(e => {
        alert('error' + e);
      });
  };

  return (
    <>
      <Title>{getIndicador}</Title>
      <Title>${valor}</Title>
      <List.Item
        title="Nombre"
        description={nombre}
        left={props => <List.Icon {...props} icon="folder" />}
      />
      <List.Item
        title="Fecha"
        description={fecha}
        left={props => <List.Icon {...props} icon="folder" />}
      />
      <List.Item
        title="Unidad de Medida"
        description={unidadMedida}
        left={props => <List.Icon {...props} icon="folder" />}
      />
      <Card>
        <Card.Cover
          source={{
            uri: 'https://i.picsum.photos/id/136/700/700.jpg?hmac=TlmOl6xjAbS_l42wp9lPaC92c3sheMj-tmnmz-8Jk0c',
          }}
        />
      </Card>
    </>
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
