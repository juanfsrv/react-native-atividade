import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import Weather from './components/Weather';

export default class App extends React.Component {
  state = {
    carregando: true,
    temperatura: 0,
    condicoesTempo: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.obterTempo(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Erro obtendo o Tempo'
        });
      }
    );
  }

  obterTempo(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperatura: json.main.temp,
          condicoesTempo: json.weather[0].main,
          carregando: false
        });
      });
  }

  render() {
    const { carregando, condicoesTempo, temperatura } = this.state;
    const API_KEY = 'ffce6245c935c0052b3609b1a83510a1';
    return (
      <View style={styles.container}>
        {carregando ? (
          <View style={styles.carregandoContainer}>
            <Text style={styles.carregandoText}>Carregando o Tempo...</Text>
          </View>
        ) : (
          <Weather tempo={condicoesTempo} temperatura={temperatura} />
        )}
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