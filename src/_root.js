// React Native imports
import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'cuOrganizer/src/common/appStyles';

export default class Root extends Component
{
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
				<View style = {localStyle.background}>
					<Text style = {textStyle.regular(28, 'center', 'white')}>cuHacking Organizer app</Text>
				</View>
			</SafeAreaView>
		);
	}
}

const localStyle = StyleSheet.create(
{
	background:
	{
		flex: 1,
		backgroundColor: colors.darkSpaceColor,
		justifyContent: 'center'
	}
});

// This disables the timer warning as a result of using the web sdk of firebase. Keep checking for a fix for this
console.ignoredYellowBox = ["Setting a timer"];