

import React from 'react';
import {View, Text, Button} from 'react-native';

class fundAcct extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>Fund Account</Text>
        <Button
          title="Fund Account"
          onPress={() => navigation.navigate('fundAcct')}
        />
      </View>
    );
  }
}

/*function fundAcct({navigation}){
    return(
        <View>
            <Text>Fund Account</Text>
            <Button
                title = "Fund Account"
                onPress = {()=> navigation.navigate(('fundAcct'))}
            />
        </View>
    )
}
*/
export default fundAcct;
