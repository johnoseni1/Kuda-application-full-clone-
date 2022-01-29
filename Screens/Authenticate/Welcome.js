

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
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, StatusBar, Animated} from 'react-native';
import {WelcomeIllustration} from '../../Data/data';
import KudaBtn from '../Components/Button';

function Next() {
  return (
    <TouchableOpacity
      style={style.nextButton}
      onPress={() => this.setState({isOnBoarded: true})}>
      <Text style={style.nextButtonText}>Next</Text>
    </TouchableOpacity>
  );
}

function Gotit() {
  return (
    <TouchableOpacity
      style={style.nextButton}
      onPress={() => this.setState({isOnBoarded: true})}>
      <Text style={style.nextButtonText}>Got It</Text>
    </TouchableOpacity>
  );
}

const {width, height} = Dimensions.get('window');

function IllustrationRender({id, image, titleImage, title, description}) {
  return (
    <View style={style.illustrationContent}>
      <Image style={style.illustrationImage} source={image} />
      <View style={style.illustrationText}>
        <View style={style.illustrationHead}>
          <Image style={style.titleImage} source={titleImage} />
          <Text style={style.illustrationTitle}>{title}</Text>
        </View>
        <Text style={style.illustrationDescription}>{description}</Text>
      </View>
    </View>
  );
}

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      welcomeLast: null,
      scrollX: new Animated.Value(0),
    };
  }

  Steps() {
    const stepPosition = Animated.divide(this.state.scrollX, width);
    return (
      <View style={style.stepsContainer}>
        {WelcomeIllustration.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              animated
              backgroundColor={'#48d38a'}
              key={`step-${index}`}
              style={[style.steps, {opacity}]}
            />
          );
        })}
      </View>
    );
  }
  render() {
    const {navigation} = this.props;
    return (
      <View animated style={style.main}>
        <StatusBar barStyle="dark-content" backgroundColor="#00000008" />
        <TouchableOpacity
          style={style.skip}
          onPress={() => navigation.navigate('AuthWelcome')}>
          <Text style={style.skipText}> Skip</Text>
        </TouchableOpacity>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment={'center'}
          scrollEventThrottle={20}
          data={WelcomeIllustration}
          renderItem={({item}) => (
            <IllustrationRender
              id={item.id}
              image={item.image}
              titleImage={item.titleImage}
              title={item.title}
              description={item.description}
            />
          )}
          keyExtractor={item => item.id}
          onScroll={Animated.event([
            {
              nativeEvent: {contentOffset: {x: this.state.scrollX}},
            },
          ])}
        />
        <View style={style.illustrationStep}>{this.Steps()}</View>
        <View style={style.next}>
          <KudaBtn btnName={'Next'} />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  skip: {
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: 25,
    color: '#48d38a',
    paddingRight: 15,
    paddingTop: 30,
  },
  illustrationContent: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
  },
  illustrationImage: {
    width,
    height: height / 3.5,
    resizeMode: 'contain',
    marginBottom: 80,
  },
  illustrationHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  illustrationText: {
    width: '85%',
    marginLeft: '7.5%',
  },
  titleImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  illustrationTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  illustrationDescription: {
    fontSize: 15,
    marginBottom: 10,
  },
  illustrationStep: {
    alignItems: 'center',
    marginBottom: 10,
  },
  next: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stepsContainer: {
    display: 'none',
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 0,
    right: 0,
    left: 0,
  },
  steps: {
    flex: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});
/*<ScrollView
          horizontal
          snapToAlignment="center"
          pagingEnabled
          scrollEnabled
          style={style.illustrationView}>
          <View style={style.illustrationContent}>
            <Image
              style={style.illustrationImage}
              source={require('../asset/illustration/undraw_wallet_aym5.svg.png')}
            />
          </View>
        </ScrollView>*/
export default Welcome;


