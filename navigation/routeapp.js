// MIT License

// Copyright (c) 2022 John Oseni

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


import React from 'react';
import {AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Splash from '../Screens/Splash';
import Welcome from '../Screens/Authenticate/Welcome';
import Signin from '../Screens/Authenticate/SignIn';
import TwoFA from '../screen/Auth/2FA';
import TwoFAComfirmed from '../screen/Auth/2FAComfirmed';
import TheBasic from '../screen/Auth/signup/theBasic';
import AuthWelcome from '../screen/Auth/AuthWelcome';
import ResetPassword from '../screen/Auth/resetPassword';
import Home from '../screen/home';
import budget from '../screen/budget';
import payments from '../screen/payments';
import card from '../screen/card';
import settings from '../screen/settings';
import fundAcct from '../screen/fundAcct';
import ResetPin from '../screen/Auth/resetPin';
import PinAuth from '../screen/Auth/pinAuth';
import Signup from '../screen/Auth/signup';

const homeStack = createStackNavigator();

function homeStackScreen() {
  return (
    <homeStack.Navigator headerMode={'none'}>
      <homeStack.Screen name="Home" component={Home} />
      <homeStack.Screen name="Fund Account" component={fundAcct} />
    </homeStack.Navigator>
  );
}

const authStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <authStack.Navigator headerMode={'none'}>
      <authStack.Screen name="Welcome" component={Welcome} />
      <authStack.Screen name="AuthWelcome" component={AuthWelcome} />
      <authStack.Screen name="Signin" component={Signin} />
      <authStack.Screen name="2FA" component={TwoFA} />
      <authStack.Screen name="2FAComfirmed" component={TwoFAComfirmed} />
      <authStack.Screen name="ResetPin" component={ResetPin} />
      <authStack.Screen name="PinAuth" component={PinAuth} />
      <authStack.Screen name="Signup2" component={TheBasic} />
      <authStack.Screen name="Signup" component={Signup} />
      <authStack.Screen name="ResetPassword" component={ResetPassword} />
    </authStack.Navigator>
  );
}

// Create bottome nav
const Tab = createBottomTabNavigator();

function HomeApp() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            size = focused ? 28 : 24;
          } else if (route.name === 'Payments') {
            iconName = focused ? 'send' : 'send';
            size = focused ? 28 : 24;
          } else if (route.name === 'Budget') {
            iconName = focused ? 'chart-donut-variant' : 'chart-donut';
            size = focused ? 28 : 24;
          } else if (route.name === 'Card') {
            iconName = focused ? 'credit-card' : 'credit-card-multiple';
            size = focused ? 28 : 24;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'view-grid' : 'grid';
            size = focused ? 28 : 24;
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#40196d',
        inactiveTintColor: '#ccccccff',
      }}>
      <Tab.Screen name="Home" component={homeStackScreen} />
      <Tab.Screen name="Payments" component={payments} />
      <Tab.Screen name="Budget" component={budget} />
      <Tab.Screen name="Card" component={card} />
      <Tab.Screen name="Settings" component={settings} />
    </Tab.Navigator>
  );
}

const appStack = createStackNavigator();

function AppStackScreen() {
  return (
    <NavigationContainer>
      <appStack.Navigator headerMode={'none'}>
        <appStack.Screen name="Welcome" component={Welcome} />
        <appStack.Screen name="AuthWelcome" component={AuthWelcome} />
        <appStack.Screen name="Signin" component={signin} />
        <appStack.Screen name="2FA" component={TwoFA} />
        <appStack.Screen name="2FAComfirmed" component={TwoFAComfirmed} />
        <appStack.Screen name="ResetPin" component={ResetPin} />
        <appStack.Screen name="PinAuth" component={PinAuth} />
        <appStack.Screen name="Signup2" component={TheBasic} />
        <appStack.Screen name="Signup" component={Signup} />
        <appStack.Screen name="ResetPassword" component={ResetPassword} />
        <appStack.Screen name="Home" component={HomeApp} />
      </appStack.Navigator>
    </NavigationContainer>
  );
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userToken: null,
      isSignedin: false,
      isOnboarded: false,
      isLoading: true,
      welcomeLast: null,
      error: null,
    };
    const getUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        return userToken;
      } catch (error) {
        this.setState({error: error});
      }
    };

    getUserToken().then(userToken => {
      this.setState({userToken: userToken});
    });
    getUserToken().then(userToken => {
      this.setState({isLoading: false});
    });
  }

  render() {
    return this.state.isLoading === true ? (
      <Splash />
    ) : (
      <NavigationContainer>
        <appStack.Navigator headerMode={'none'}>
          {this.state.userToken === null ? (
            <>
              <appStack.Screen name="Auth" component={AuthStackScreen} />
            </>
          ) : (
            <>
              <appStack.Screen name="Home" component={HomeApp} />
            </>
          )}
        </appStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;