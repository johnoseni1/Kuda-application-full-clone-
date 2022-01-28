

import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';

class Home extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={style.main}>
        <Text>Home Screen</Text>
        <Button
          title="Fund Account"
          onPress={() => navigation.navigate('Fund Account')}
        />
        <Button
          title="Welcome"
          onPress={() => navigation.navigate('Welcome')}
        />
      </View>
    );
  }
}

/*function Home({navigation}){
    return(
        <View style = {style.main}>
            <Text>Home Screen</Text>
            <Button
                title = "Fund Account"
                onPress = {()=> navigation.navigate(('fundAcct'))}
            />
        </View>
    )
}
*/

const style = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Home;