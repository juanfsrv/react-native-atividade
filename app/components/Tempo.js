import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { condicoesTempo } from '../CondicoesTempo';

const Tempo = ({ tempo, temperatura }) => {
    return (
        <View
            style={[
                styles.tempoContainer,
                { backgroundColor: condicoesTempo[tempo].color }
            ]}
        >
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons
                    size={72}
                    name={condicoesTempo[tempo].icon}
                    color={'#fff'}
                />
                <Text style={styles.tempText}>{temperatura}˚</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{condicoesTempo[tempo].title}</Text>
                <Text style={styles.subtitle}>
                    {condicoesTempo[tempo].subtitle}
                </Text>
            </View>
        </View>
    );
};

Tempo.propTypes = {
    temperatura: PropTypes.number.isRequired,
    tempo: PropTypes.string
};

const styles = StyleSheet.create({
    tempoContainer: {
        flex: 1
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    tempText: {
        fontSize: 72,
        color: '#fff'
    },
    bodyContainer: {
        flex: 2,
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
    }
});

export default Weather;