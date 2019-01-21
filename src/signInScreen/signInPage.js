// React Native imports
import React, {Component} from 'react';
import {ActivityIndicator, Alert, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {saveName} from './actions';

// Firebase imports
import firebase from '@firebase/app';
import '@firebase/auth';

// Custom imports
import CREDENTIALS from 'cuOrganizer/credentials';
import {colors, containerStyle, textStyle} from 'cuOrganizer/src/common/appStyles';
import {AndroidBar, Button, TextField} from 'cuOrganizer/src/common';

class SignInPage extends Component
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

	showAlert(type)
	{
		switch (type)
		{
			case "No Connection":
				Alert.alert(
					"No Connection",
					"Please connect to the internet to continue",
					[{text: 'OK', onPress: () => {}}]
				);
				return;

			case "Auth Failed":
				Alert.alert(
					"Authentication Failed",
					"Something is seriously wrong - Message Wal right away\n\n" + error,
					[{text: 'OK', onPress: () => {}}]
				);
				return;

			case "Invalid Name":
				Alert.alert(
					"No name entered",
					"Please enter a name",
					[{text: 'OK', onPress: () => {}}]
				);
				return;
		}
	}

	authFailure(error)
	{
		// Showing the login form again
		this.setState({authenticating: false});

		if (error.code == 'auth/network-request-failed')
			this.showAlert("No Connection");
		else
			this.showAlert("Auth Failed");
	}

	authSuccess()
	{
		// Saving the name to the app
		this.props.saveName(this.state.fullNameText);

		// this.setState({authenticating: false});
		// alert("Welcome " + this.state.fullNameText + "~");
	}

	authenticate()
	{
		// Showing an activity indicator
		this.setState({authenticating: true});

		// Sending the authentication request to firebase
		firebase.auth().signInWithEmailAndPassword(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD).then(this.authSuccess.bind(this)).catch((error) => this.authFailure(error));
	}

	checkNameFormat()
	{
		if (this.state.fullNameText == "")
			this.showAlert("Invalid Name");
		else
		{
			this.setState(prevState => {return {fullNameText: prevState.fullNameText.trim()}});
			this.authenticate();
		}
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
							defaultValue = {this.state.fullNameText}
							textAlign = 'center'
							textColor = {colors.primaryTextColor}
							maxLength = {30}
							onChangeText = {(newText) => this.setState({fullNameText: newText})}
							onSubmitEditing = {this.checkNameFormat.bind(this)}
							placeholder = "Wal Wal"
						/>
					</View>
					<View style = {containerStyle.formSection}>
						<Button
							label = "Submit"
							color = 'white'
							inverted = {true}
							action = {this.checkNameFormat.bind(this)}
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
export default connect(null, {saveName})(SignInPage);