// React imports
import React, {Component} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Firebase imports
import firebase from '@firebase/app';
import '@firebase/auth';

// Custom imports
import CREDENTIALS from 'cuOrganizer/credentials';
import {colors} from 'cuOrganizer/src/common/appStyles';
import {Button} from 'cuOrganizer/src/common';

class LoadingPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {waitingForConnection: false};
    }

	displayError(type, error)
	{
		switch (type)
		{
			case "Auth Failure":
				Alert.alert(
					"Authentication Failed",
					"Something is seriously wrong - Message Wal right away\n\n" + error,
					[{text: 'OK', onPress: () => this.props.navigation.navigate("SignIn")}],
					{cancelable: false}
				);
				return;

			case "No Connection":
				Alert.alert(
					"No Connection",
					"Please connect to the internet to continue",
					[{text: 'OK', onPress: () => this.setState({waitingForConnection: true})}],
					{cancelable: false}
				);
				return;
		}
	}

	authFailure(error)
	{
		if (error.code == 'auth/network-request-failed')
			this.displayError("No Connection");
		else
			this.displayError("Auth Failure", error);
	}

	authSuccess()
	{
		// Moving to the main menu
		this.props.navigation.navigate("Menu");
	}

	authenticate()
	{
		// No longer waiting for a connection
		this.setState({waitingForConnection: false});

		// Sending the authentication request to firebase
		firebase.auth().signInWithEmailAndPassword(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD).then(this.authSuccess.bind(this)).catch((error) => this.authFailure(error));
	}

	componentDidMount()
	{
		if (this.props.organizerName == "")
			this.props.navigation.navigate("SignIn");
		else
			this.authenticate();
	}

    render()
	{
		return (
			<View style = {localStyle.default}>
				{this.state.waitingForConnection ? 
					<Button
						label = "Try again"
						color = 'white'
						inverted = {true}
						action = {this.authenticate.bind(this)}
					/>
					:
					<ActivityIndicator
						size = 'large'
						color = {colors.primaryTextColor}
					/>
				}
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	return {
		organizerName: state.organizerName
	};
}
export default connect(mapStateToProps)(LoadingPage);

const localStyle = StyleSheet.create(
{
    default:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});