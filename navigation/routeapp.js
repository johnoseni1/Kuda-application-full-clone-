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

import Splash from '../screen/splash';
import Welcome from '../screen/Auth/welcome';
import signin from '../screen/Auth/signin';
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
