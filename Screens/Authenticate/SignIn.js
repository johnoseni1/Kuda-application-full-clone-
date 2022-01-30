
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
import {View, Text, StyleSheet, Keyboard, AsyncStorage} from 'react-native';
import NavBarAuth from '../components/NavBarAuth';
import Logo from '../components/logo';
import KudaInputBar from '../components/InputBar';
import KudaBtn from '../components/Button';
import QusOpt from '../components/QusOpt';

class Signin extends React.Component {

  constructor() {
    super();
    this.state = {
      userEmail: null,
      userPassword: null,
      loaded: true,
      userToken: null,
    };
  }
  signinButton = login => {
    Keyboard.dismiss();
    this.setState({loaded: false});

    fetch('http://api.kudaclone.tk/api/user/auth', {
      method: 'POST',
      body: JSON.stringify({
        action: 'login',
        email: this.state.userEmail,
        password: this.state.userPassword,
      }),
      redirect: 'follow',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(this.validate)
      .catch(this.error);
  };

  validate = response => {
    if (response.status === 'failed') {
      this.setState({loaded: true, error: response.message});
    } else {
      this.setState({loaded: true, userToken: response.token});
      const setUserToken = async () => {
        try {
          await AsyncStorage.setItem('userToken', response.token);
        } catch (error) {
          console.warn(error);
        }
      };
      setUserToken();
      this.props.navigation.navigate('Home');
    }
  };

  error = error => {
    this.setState({loaded: true, error: error.message});
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={style.main}>
        <NavBarAuth
          leftText={'<'}
          rightText={'?'}
          rightTextStyle={style.rightText}
          rightBtnStyle={style.rightBtn}
          leftOnPress={() => navigation.goBack()}
          rightOnPress={() => navigation.navigate.goBack()}
        />
        <View style={style.logoContainer}>
          <Logo />
          <Text style={style.logoText}>Hey there!</Text>
        </View>
        <View style={style.inputs}>
          <KudaInputBar
            margin={'2%'}
            keyboardType={'email-address'}
            placeholder={'Email Address'}
            onChangeText={text => this.setState({userEmail: text})}
          />
          <KudaInputBar
            margin={'2%'}
            placeholder={'password'}
            onChangeText={text => this.setState({userPassword: text})}
            secureTextEntry={true}
          />
        </View>
        {this.state.error ? (
          <View>
            <Text>{this.state.error}</Text>
            <Text>{this.state.userToken}</Text>
          </View>
        ) : (
          <View />
        )}
        <KudaBtn
          btnName={this.state.loaded ? 'Next' : 'loading'}
          onPress={() => navigation.navigate('2FA')}
        />
        <View style={style.signinBtn}>
          <QusOpt
            question={'Forgot password'}
            option={'Reset now'}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  rightBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#40196d40',
    borderRadius: 150,
  },
  rightText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#40196d',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  inputs: {
    alignItems: 'center',
    width: '80%',
    marginTop: '10%',
  },
  signinBtn: {
    alignItems: 'center',
  },
});

export default Signin;
