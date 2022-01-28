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

const KudaBtn = props => {
  return (
    <View style={style.main}>

      <TouchableOpacity style={style.btn} onPress={props.onPress}>

        <Text style={style.btnText}>{props.btnName}</Text>
        
      </TouchableOpacity>

    </View>
  );
};

const style = StyleSheet.create({
  main: {
    justifyContent: 'center',
    backgroundColor: '#40196d',
    height: 50,
    width: '85%',
    borderRadius: 4,
    marginTop: 40,
    marginBottom: 40,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default KudaBtn;
