// React Native imports
import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// Firebase imports
import firebase from '@firebase/app';
import firebaseConfig from 'cuOrganizer/firebaseConfig';

// Custom imports
import {containerStyle} from 'cuOrganizer/src/common/appStyles';
import RootNavigator from './_rootNavigator';

export default class Root extends Component
{
	componentDidMount()
	{
		SplashScreen.hide();
		firebase.initializeApp(firebaseConfig);
	}

	render()
	{
		return (
			<SafeAreaView style = {containerStyle.default}>
				<StatusBar
					translucent
					animated = {true}
					barStyle = 'light-content'
					backgroundColor = 'transparent'
				/>
				<RootNavigator/>
			</SafeAreaView>
		);
	}
}

// This disables the timer warning as a result of using the web sdk of firebase. Keep checking for a fix for this
console.ignoredYellowBox = ["Setting a timer"];