


import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Splash extends React.Component {
  render() {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashText}>KUDA CLONE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40196d',
  },
  splashText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Splash;