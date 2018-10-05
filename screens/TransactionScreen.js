import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Appbar, List } from 'react-native-paper';

import HomeStyle from '../styles/HomeStyle';

export default class TransactionScreen extends Component {
  render() {
    return (
      <View style={HomeStyle.container}>
        <SafeAreaView>
          <Appbar.Header>
            <Appbar.Content title={'Transaction'} subtitle={'transcation'} />
            <Appbar.Action
              icon="link"
              onPress={() => this.props.navigation.navigate('')}
            />
          </Appbar.Header>
          <ScrollView
            style={HomeStyle.container}
            contentContainerStyle={HomeStyle.contentContainer}
          >
            <View style={HomeStyle.welcomeContainer}>
              <Text>Transaction</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
