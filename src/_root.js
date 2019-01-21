// React Native imports
import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// Custom imports
import {containerStyle} from 'cuOrganizer/src/common/appStyles';
import SignInPage from './signInScreen/signInPage';

export default class Root extends Component
{
	componentDidMount()
	{
		SplashScreen.hide()
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
				<SignInPage/>
			</SafeAreaView>
		);
	}
}

// This disables the timer warning as a result of using the web sdk of firebase. Keep checking for a fix for this
console.ignoredYellowBox = ["Setting a timer"];