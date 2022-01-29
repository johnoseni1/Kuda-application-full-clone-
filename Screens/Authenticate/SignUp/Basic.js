


import React from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import NavBarAuth from '../../components/NavBarAuth';
import KudaInputBar from '../../components/InputBar';
import KudaBtn from '../../components/Button';
import QusOpt from '../../components/QusOpt';
import {TouchableOpacity} from 'react-native-gesture-handler';

class TheBasic extends React.Component {
  constructor() {
    super();
    this.state = {
      userGender: null,
      userDOB: null,
      userBVN: null,
      userRefCode: null,
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
    return (
      <View style={style.main}>
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
          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
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
          <QusOpt
            question={'No BVN'}
            option={'Click Here'}
            onPress={() => navigation.navigate('BVN')}
          />
        </View>
        <KudaBtn btnName={'Continue'} onPress={this.nextPage} />
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
    width: '85%',
    marginTop: '10%',
    marginBottom: '40%',
  },
});

export default TheBasic;
