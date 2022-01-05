import * as React from 'react';
import {AppRegistry, View, Text, Button} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './componentes/inicio';
import Historial from './componentes/historial';
import DetalleDiario from './componentes/detalleDiario';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function Inicio({navigation, screenName}) {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

function HistorialScreen({route, navigation}) {
  const {tipo} = route.params;
  return (
    <View style={{flex: 1}}>
      <Historial tipoIndicador={tipo}></Historial>
    </View>
  );
}

function DetalleDiarioScreen({route, navigation}) {
  const {tipoIndicador, fecha} = route.params;

  return (
    <View style={{flex: 1}}>
      <DetalleDiario
        fecha={fecha}
        tipoIndicador={tipoIndicador}></DetalleDiario>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function HomeApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Historial" component={HistorialScreen} />
        <Stack.Screen name="Detalle" component={DetalleDiarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeApp;
