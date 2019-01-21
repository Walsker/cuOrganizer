// React Native imports
import React, {Component} from 'react';
import {ActivityIndicator, Alert, Text, View} from 'react-native';

// Firebase imports
import firebase from '@firebase/app';
import '@firebase/auth';

// Custom imports
import CREDENTIALS from 'cuOrganizer/credentials';
import {colors, containerStyle, textStyle} from 'cuOrganizer/src/common/appStyles';
import {AndroidBar, Button, TextField} from 'cuOrganizer/src/common';

export default class SignInPage extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			authenticating: false,
			fullNameText: ""
		}
	}

	authFailure(error)
	{
		// Showing the login form again
		this.setState({authenticating: false});

		if (error.code == 'auth/network-request-failed')
		{
			Alert.alert(
				"No Connection",
				"Please connect to the internet to continue",
				[{text: 'OK', onPress: () => {}}]
			);
		}
		else
		{
			Alert.alert(
				"Authentication Failed",
				"Something is seriously wrong. Message Wal right away.\n\n" + error,
				[{text: 'OK', onPress: () => {}}]
			);
		}
	}

	authSuccess()
	{
		this.setState({authenticating: false});

		alert("Success");
	}

	authenticate()
	{
		// Showing an activity indicator
		this.setState({authenticating: true});

		// Sending the authentication request to firebase
		firebase.auth().signInWithEmailAndPassword(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD).then(this.authSuccess.bind(this)).catch((error) => this.authFailure(error));
	}

	generatePadding()
	{
		return (
			<View style = {{flex: 0.1}}>
				<AndroidBar/>
			</View>
		);
	}

	render()
	{
		if (!this.state.authenticating)
		{
			return (
				<View style = {containerStyle.form}>
					{this.generatePadding()}
					<View style = {containerStyle.formSection}>
						<Text style = {[textStyle.regular(28, 'center'), {paddingVertical: 20}]}>Sign In</Text>
					</View>
					<View style = {containerStyle.formSection}>
						<TextField
							fontSize = {24}
							label = "Full Name"
							textAlign = 'center'
							textColor = {colors.primaryTextColor}
							maxLength = {30}
							onChangeText = {(newText) => this.setState({fullNameText: newText})}
							// onSubmitEditing = {submit}
							placeholder = "Wal Wal"
						/>
					</View>
					<View style = {containerStyle.formSection}>
						<Button
							label = "Submit"
							color = 'white'
							inverted = {true}
							action = {this.authenticate.bind(this)}
						/>
					</View>
				</View>
			);
		}
		else
		{
			return (
				<View style = {containerStyle.form}>
					{this.generatePadding()}
					<View style = {containerStyle.formSection}>
						<ActivityIndicator
							color = {colors.primaryTextColor}
							size = 'large'
						/>
					</View>
				</View>
			);
		}
	}
}