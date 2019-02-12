// React imports
import React, {Component} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {updateEventTypes} from './actions';
import {initiateHistory} from 'cuOrganizer/src/scannerScreen/actions';

// Firebase imports
import firebase from 'react-native-firebase';

// Custom imports
import CREDENTIALS from 'cuOrganizer/$adminCreds';
import {colors} from 'cuOrganizer/src/common/appStyles';
import {Button} from 'cuOrganizer/src/common';

class LoadingPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
		{
			firestore: firebase.firestore(),
			waitingForConnection: false
		}
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
			
			case "Fetch Failure":
				Alert.alert(
					"Fetch Failure",
					"Something is seriously wrong - Message Wal right away\n\n" + error,
					[{text: 'OK', onPress: () => this.setState({waitingForConnection: true})}],
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
		console.log("AUTH SUCCESS!");

		let eventTitles = [];
		let scanHistories = {};

		const toMainApp = () =>
		{
			console.log("LOADING COMPLETE!");

			// Updating the list of event types and initiating the scan history lists
			this.props.updateEventTypes(eventTitles);
			// this.props.initiateHistory(eventTypes); //TODO: make this work
			
			// Moving to the main menu
			this.props.navigation.navigate("Main");
		};

		const getScanHistory = (index) =>
		{
			if (eventTitles[index] == undefined) toMainApp();
			else
			{
				this.state.firestore.collection("events").doc(eventTitles[index].id).collection("scanHistory").get().then(snapshot =>
				{
					snapshot.forEach(document =>
					{
						scanHistories[eventTitles[index].id] = {};
						scanHistories[eventTitles[index].id][document.id] = document.data();
					});
					getScanHistory(index+1);
				}).catch(error =>
				{
					console.log("Tried to get scan history.", error);
					this.displayError("Fetch Failure");
				});
			}
		};

		// Getting the types of events that can be scanned for from firebase
		this.state.firestore.collection("events").get().then(snapshot =>
		{
			snapshot.forEach(document =>
			{
				let event = document.data();
				if (event.scannable)
					eventTitles.push({id: document.id, title: event.title});
			});
			getScanHistory(0);
		}).catch(error =>
		{
			console.log("Tried to get events", error);
			this.displayError("Fetch Failure");
		});
	}

	authenticate()
	{
		// No longer waiting for a connection
		this.setState({waitingForConnection: false});
		console.log("AUTHENTICATING...");
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
	return {organizerName: state.organizerName};
};
export default connect(mapStateToProps, {updateEventTypes, initiateHistory})(LoadingPage);


const localStyle = StyleSheet.create(
{
    default:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});