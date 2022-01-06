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
import {
  List,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
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
  const [estadoCarga, setEstadoCarga] = useState(true);
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
    setEstadoCarga(true);
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
        setEstadoCarga(false);
      })
      .catch(e => {
        alert('error' + e);
      });
  };

  return (
    <>
      {estadoCarga ? (
        <ActivityIndicator size={90} animating={true} color={Colors.red800} />
      ) : (
        <>
          <Card>
            <Card.Content style={styles.cardEstilo}>
              <Title>Indicador: {getIndicador}</Title>
              <Paragraph>
                Valor: <Text style={styles.texto}>${valor}</Text>
              </Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.cardContenido}>
            <List.Item
              title="Nombre"
              titleStyle={{color: 'white'}}
              descriptionStyle={{color: 'white', fontWeight: 'bold'}}
              description={nombre}
              left={props => (
                <List.Icon {...props} color="white" icon="information" />
              )}
            />
            <List.Item
              title="Fecha"
              titleStyle={{color: 'white'}}
              descriptionStyle={{color: 'white', fontWeight: 'bold'}}
              description={fecha}
              left={props => (
                <List.Icon {...props} color="white" icon="calendar" />
              )}
            />
            <List.Item
              title="Unidad de Medida"
              titleStyle={{color: 'white'}}
              descriptionStyle={{color: 'white', fontWeight: 'bold'}}
              description={unidadMedida}
              left={props => (
                <List.Icon {...props} color="white" icon="hexagram" />
              )}
            />
            <Card.Cover
              source={{
                uri: 'https://i.picsum.photos/id/136/700/700.jpg?hmac=TlmOl6xjAbS_l42wp9lPaC92c3sheMj-tmnmz-8Jk0c',
              }}
            />
          </Card>
        </>
      )}
    </>
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

  cardEstilo: {
    borderRadius: 20,
    backgroundColor: '#73C6DD',
    margin: 10,
    shadow: 20,
  },
  cardContenido: {
    borderRadius: 20,
    backgroundColor: '#6235BA',
    margin: 10,
    borderBottomEndRadius: 40,
  },
  texto: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default DetalleDiario;
