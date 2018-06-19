import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { condicoesTempo } from '../components/CondicoesTempo';

export default class Tempo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: 'Salvador',
            temperatura: 0,
            minTemp: 0,
            maxTemp: 0,
            condicoesTempo: 'Rain',
            cidade: null,
            pais: null,
            error: null
        }
    }

    componentDidMount() {
        this.obterTempo(this.state.text);
      }

    render() {
        return (
            <View
                style={[
                    styles.tempoContainer,
                    { backgroundColor: condicoesTempo[this.state.condicoesTempo].color }
                ]}
            >
                <View style={styles.headerContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Informe uma cidade..."
                        placeholderTextColor="#fff"
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                    <Button
                        color="#fff"
                        onPress={() => this.obterTempo(this.state.text)}
                        title="Buscar"
                    />
                </View>
                <View style={styles.tempContainer}>
                    <MaterialCommunityIcons
                        size={72}
                        name={condicoesTempo[this.state.condicoesTempo].icon}
                        color={'#fff'}
                    />
                    <Text style={styles.tempText}>{this.state.temperatura}˚</Text>
                </View>
                <View style={styles.localContainer}>
                    <Text style={{fontSize: 20, color: '#fff'}}>Min {this.state.minTemp}˚ /  Máx{this.state.maxTemp}˚</Text>
                    <Text style={styles.localText}>{this.state.cidade}, {this.state.pais}</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.title}>{condicoesTempo[this.state.condicoesTempo].title}</Text>
                    <Text style={styles.subtitle}>
                        {condicoesTempo[this.state.condicoesTempo].subtitle}
                    </Text>
                </View>
            </View>
        );
    };

    obterTempo(cidade) {
        const API_KEY = '19607e6ea7ab40f6690269ad2ecb9cf0';
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&APPID=${API_KEY}&units=metric`
        )
          .then(res => res.json())
          .then(json => {
            console.log(json);
            this.setState({
              temperatura: json.main.temp,
              minTemp: json.main.temp_min,
              maxTemp: json.main.temp_max,
              condicoesTempo: json.weather[0].main,
              cidade: json.name,
              pais: json.sys.country
            });
          });
      }
}

const styles = StyleSheet.create({
    tempoContainer: {
        flex: 1
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 80
    },
    tempContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    tempText: {
        fontSize: 72,
        color: '#fff'
    },
    localContainer: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    localText: {
        fontSize: 40,
        color: '#fff'
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 60,
        color: '#fff'
    },
    subtitle: {
        fontSize: 24,
        color: '#fff'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        borderRadius: 8,
        padding: 5,
        height: 40,
        width: 220,
        fontSize: 20,
        color: '#fff'
      }
});