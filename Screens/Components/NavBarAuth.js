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

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const NavBarAuth = props => {
  return (
    <View style={style.main}>
      <View style={style.leftNavContainer}>
        <TouchableOpacity style={style.leftBtn} onPress={props.leftOnPress}>
          <Text style={style.leftText}>{props.leftText}</Text>
        </TouchableOpacity>
      </View>
      <View style={style.rightNavContainer}>
        <TouchableOpacity
          style={props.rightBtnStyle}
          onPress={props.RightOnPress}>
          <Text style={props.rightTextStyle}>{props.rightText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: '#48d38a',
    width: '100%',
    height: 50,
  },
  leftNavContainer: {
    marginLeft: '5%',
  },
  rightNavContainer: {
    marginRight: '5%',
  },
  leftText: {
    fontSize: 30,
    color: '#40196d',
    fontWeight: 'bold',
  },
});

export default NavBarAuth;
