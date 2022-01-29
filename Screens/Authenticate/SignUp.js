
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
import {View, Text, StyleSheet, Keyboard, KeyboardAvoidingView,} from 'react-native';
import NavBarAuth from '../components/NavBarAuth';
import KudaInputBar from '../components/InputBar';
import KudaBtn from '../components/Button';
import QusOpt from '../components/QusOpt';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RNCamera} from 'react-native-camera';

class signup extends React.Component {
  constructor() {
    super();
    this.state = {
      userGender: null,
      userDOB: null,
      userBVN: null,
      userRefCode: null,
      regPage: 1,
    };
  }

  genderSelectMale = () => {
    this.setState({userGender: 'male'});
  };

  genderSelectFemale = () => {
    this.setState({userGender: 'female'});
  };

  nextPage = () => {
    this.setState({regPage: this.state.regPage + 1});
  };
  prevPage = () => {
    this.setState({regPage: this.state.regPage - 1});
  };
  signinButton = login => {
    Keyboard.dismiss();
    this.setState({loaded: false});

    fetch('http://kudaclone.com/api/user/auth', {
      method: 'POST',
      body: JSON.stringify({
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
      this.props.navigation.navigate('HomeApp');
    }
  };

  error = error => {
    this.setState({loaded: true, error: error.message});
  };

  render() {
    const {navigation} = this.props;
    return this.state.regPage === 1 ? (
      <KeyboardAvoidingView behavior={'padding'} style={style.main}>
        <NavBarAuth
          leftText={'<'}
          rightText={'1/7'}
          rightTextStyle={style.rightText}
          leftOnPress={() => navigation.goBack()}
          rightOnPress={() => navigation.navigate.goBack()}
        />
        <View style={style.headerContainer}>
          <Text style={style.headerTitle}>The basics</Text>
          <Text style={style.headerDescription}>
            Give us a few details about yourself so we know you're a real
            person.
          </Text>
        </View>
        <View style={style.genderContainer}>
          <TouchableWithoutFeedback
            style={style.genderClickMainMale}
            onPress={this.genderSelectMale}>
            <View
              style={
                this.state.userGender === 'male'
                  ? style.genderClickActive
                  : style.genderClickInactive
              }
            />
            <Text
              style={
                this.state.userGender === 'male'
                  ? style.genderTextActive
                  : style.genderTextInactive
              }>
              Male
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={style.genderClickMainFemale}
            onPress={this.genderSelectFemale}>
            <View
              style={
                this.state.userGender === 'female'
                  ? style.genderClickActive
                  : style.genderClickInactive
              }
            />
            <Text
              style={
                this.state.userGender === 'female'
                  ? style.genderTextActive
                  : style.genderTextInactive
              }>
              Female
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={style.inputs}>
          <KudaInputBar
            margin={'2%'}
            keyboardType={'numeric'}
            placeholder={'Bank Verification Number (BVN)'}
            onChangeText={text => this.setState({userBVN: text})}
          />
          <KudaInputBar
            margin={'2%'}
            placeholder={'Referral Code (Optional'}
            onChangeText={text => this.setState({userPassword: text})}
          />
        </View>
        <QusOpt
          question={'No BVN'}
          option={'Click Here'}
          onPress={() => navigation.navigate('BVN')}
        />
        <KudaBtn btnName={'Continue'} onPress={this.nextPage} />
      </KeyboardAvoidingView>
    ) : (
      <View style={style.main}>
        <NavBarAuth
          leftText={'<'}
          rightText={'2/7'}
          rightTextStyle={style.rightText}
          leftOnPress={this.prevPage}
        />
        <View style={style.headerContainer}>
          <Text style={style.headerTitle}>Take a selfie</Text>
          <Text style={style.headerDescription}>
            We need a clear photo of your face to comfirm who you are.
          </Text>
        </View>
        <View style={style.selfie}>
          <Ionicons
            style={style.selfieCamera}
            name={'ios-camera'}
            color={'#40196d'}
            size={50}
          />
        </View>
        <View style={style.selfieIllustration}>
          <View style={style.illustrationContainer}>
            <View style={style.illustration1} />
            <Text style={style.illustration1Text}>Wrong</Text>
          </View>
          <View style={style.illustrationContainer}>
            <View style={style.illustration2} />
            <Text style={style.illustration2Text}>Right</Text>
          </View>
        </View>
        <KudaBtn btnName={'Continue'} onPress={this.signinButton} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  rightText: {
    fontSize: 20,
    color: '#40196d',
  },
  headerContainer: {
    marginTop: '5%',
    marginRight: '7.5%',
    marginLeft: '7.5%',
    marginBottom: '10%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  headerDescription: {
    fontSize: 16,
  },
  genderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderClickMainMale: {
    marginRight: '10%',
    alignItems: 'center',
  },
  genderClickMainFemale: {
    marginLeft: '10%',
    alignItems: 'center',
  },
  genderClickActive: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#48d38a60',
    marginBottom: '10%',
  },
  genderClickInactive: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#00000020',
    marginBottom: '10%',
  },
  genderTextActive: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  genderTextInactive: {
    fontSize: 18,
  },
  inputs: {
    alignItems: 'center',
    width: '80%',
    marginTop: '10%',
  },
  selfie: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#00000020',
    borderRadius: 100,
    marginTop: '10%',
  },
  selfieCamera: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfieIllustration: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginTop: '10%',
  },
  illustrationContainer: {
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration1: {
    alignItems: 'center',
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 60,
    borderColor: 'red',
  },
  illustration1Text: {
    alignItems: 'center',
  },
  illustration2: {
    alignItems: 'center',
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 60,
    borderColor: 'green',
  },
  illustration2Text: {
    alignItems: 'center',
  },
});

export default signup;
