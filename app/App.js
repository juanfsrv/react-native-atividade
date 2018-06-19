import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import Tempo from './components/Tempo';

export default class App extends React.Component {
  state = {
    carregando: true,
  };

  render() {
    const { carregando } = this.state;
    return (
      <View style={styles.container}>
        {/* {carregando ? (
          <View style={styles.carregandoContainer}>
            <Text style={styles.carregandoText}>Carregando o Tempo...</Text>
          </View>
        ) : (
          <Tempo/>
        )} */}
        <Tempo/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  carregandoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  carregandoText: {
    fontSize: 30
  }
});