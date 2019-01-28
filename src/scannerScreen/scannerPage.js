// React imports
import React, {Component} from 'react';
import {Alert, Dimensions, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

// Redux imports
import {connect} from 'react-redux';
import {doScan} from './actions';

// Firebase imports
import firebase from '@firebase/app';
import '@firebase/database';

// Custom imports
import BADGE_KEY from 'cuOrganizer/$badge';
import INVITE_KEY from 'cuOrganizer/$invite';
import {colors} from 'cuOrganizer/src/common/appStyles';
import {ActionBar, IconButton} from 'cuOrganizer/src/common';
import {CameraMarker, ScanList} from './components';

class ScannerPage extends Component
{
	constructor(props)
	{
		super(props);

		this.scrollRef = React.createRef();
		this.scannerRef = React.createRef();

		this.state =
		{
			showHistory: false,
			scanStatus: 'IDLE',
			displayIndicator: false,
			indicatorColor: 'transparent'
		};
	}

	showAlert(type, callback)
	{
		switch (type)
		{
			case "Already Scanned":
				Alert.alert(
					"Already Scanned",
					"This cuBadge has already been scanned",
					[{text: 'OK', onPress: callback}],
					{cancelable: false}
				);
				return;

			case "Invite Code":
				Alert.alert(
					"Invite Code",
					"Inform the hacker that they need to scan this code with their app",
					[{text: 'OK', onPress: callback}],
					{cancelable: false}
				);
				return;

			case "Invalid Badge":
				Alert.alert(
					"Not a cuBadge",
					"This code is not from cuHacking.\nBe careful of what you scan",
					[{text: 'OK', onPress: callback}],
					{cancelable: false}
				);
				return;

			case "Not Registered":
				Alert.alert(
					"Unregistered Badge",
					"Please register this cuBadge before using it for other events",
					[{text: 'OK', onPress: callback}],
					{cancelable: false}
				);
				return;
		}
	}

	processCode(code)
	{
		// Inidicating that the code is being processed
		this.setState({scanStatus: 'LOADING'});

		// Extracting the data from the QR code
		var data = code.data.split("|");

		const success = (snapshot) => 
		{
			// Telling firebase that this code has been scanned
			firebase.database().ref('/badgeChecks/' + this.props.selectedEvent + '/' + data[1]).set({
				scanned: true,
				organizer: this.props.organizerName,
				time: 111 // TODO: Provide actual time stamp
			}).then(() => this.scanSuccess(data[1], snapshot.val().firstName, snapshot.val().lastName));
		};
		const getHackerInfo = () => firebase.database().ref('/hackers/' + data[1]).once('value').then(success).catch(error => alert(error));

		const checkIfRegistered = (snapshot) =>
		{
			// Checking if this badge is registered
			if (!snapshot.val().scanned)
				this.scanFailure("Not Registered");
			else
				getHackerInfo();
		};

		const checkIfUsed = (snapshot) =>
		{
			// Checking if this badge has already been scanned
			if (snapshot.val().scanned)
				this.scanFailure("Already Scanned");
			else
				firebase.database().ref('/badgeChecks/registration/' + data[1]).once('value').then(this.props.selectedEvent == 'registration' ? getHackerInfo : checkIfRegistered).catch(error => alert(error));
		};

		// Checking if the QR code is in the correct format
		if (data[0] != BADGE_KEY || data[1] == null)
		{
			if (data[0] == INVITE_KEY)
				this.scanFailure("Invite Code");
			else
				this.scanFailure("Invalid Badge");
		}
		else
			firebase.database().ref('/badgeChecks/' + this.props.selectedEvent + '/' + data[1]).once('value').then(checkIfUsed).catch(error => alert(error));
	}

	scanSuccess(hackerID, firstName, lastName)
	{
		// Inidicating the successful scan
		this.setState({scanStatus: 'SUCCESS'});
		setTimeout(() =>
		{
			// Turning off the indicator
			this.setState({scanStatus: 'IDLE'});	

			// Turning the scanner back on after a cooldown time
			setTimeout(() => this.scannerRef.current.reactivate(), 1000);
		}, 500);

		// Making an undo button
		this.props.doScan(this.props.selectedEvent, {id: hackerID, firstName, lastName});
	}

	scanFailure(error)
	{
		// Indicating an unsuccessful scan
		this.setState({scanStatus: 'FAILURE'});

		// Showing the appropriate alert
		this.showAlert(error, () => 
		{
			// Turning the scanner back on
			this.setState({scanStatus: 'IDLE'});
			this.scannerRef.current.reactivate();
		});
	}

	renderHistoryButton()
	{
		var iconName = (this.state.showHistory ? 'photo-camera' : 'history');
		var toggleHistory = () =>
		{
			// Changing the toggle icon
			if (!this.state.showHistory)
				this.scrollRef.current.scrollToEnd();
			else
				this.scrollRef.current.scrollTo({x: 0, y: 0, animated: true});

			// Toggle state flag
			this.setState((prevState) => {return {showHistory: !prevState.showHistory};});
		}

		return (
			<IconButton
				type = {iconName}
				size = {30}
				color = {colors.primaryTextColor}
				action = {toggleHistory}
			/>
		);
	}

	render()
	{
		var {height} = Dimensions.get('screen');

		return (
			<ScrollView
				ref = {this.scrollRef}
				scrollsToTop = {false}
				scrollEnabled = {false}
				nestedScrollEnabled = {true}
				showsVerticalScrollIndicator = {false}
				showsHorizontalScrollIndicator = {false}
			>
				<StatusBar
					backgroundColor = {this.state.showHistory ? colors.primaryColor : 'transparent'}
					animated = {true}
				/>
				<View style = {[localStyle.cameraSpace, {height: height - 56}]}>
					{this.state.displayIndicator ? <View style = {[localStyle.indicator, {borderColor: this.state.indicatorColor}]}/> : <View/>}
					<QRCodeScanner
						ref = {this.scannerRef}
						onRead = {this.processCode.bind(this)}
						fadeIn = {false}
						showMarker = {true}
						customMarker = {<CameraMarker mode = {this.state.scanStatus}/>}
						cameraStyle = {localStyle.camera}
					/>
				</View>
				<View style = {{height: height - StatusBar.currentHeight}}>
					<ActionBar
						title = {this.props.eventTypes[this.props.selectedEvent]}
						lifted = {true}
						inverted = {false}
						leftButton =
						{
							<IconButton
								type = 'arrow-back'
								size = {30}
								color = {colors.primaryTextColor}
								action = {() => this.props.navigation.goBack()}
							/>
						}
						rightButton = {this.renderHistoryButton()}
					/>
					<View style = {localStyle.scanHistory}>
						<ScanList/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) =>
{
	return {
		eventTypes: state.eventTypes,
		organizerName: state.organizerName,
		selectedEvent: state.selectedEvent
	};
}
export default connect(mapStateToProps, {doScan})(ScannerPage);

const green = '#00FF00';
const red = '#FF0000';

const localStyle = StyleSheet.create(
{
	camera: {height: '100%'},
	cameraMarker: {borderColor: 'white'},
	cameraSpace:
	{
		flex: 0.1,
		justifyContent: 'center',
		backgroundColor: colors.primarySpaceColor
	},
	indicator:
	{
		width: '100%',
		height: '100%',
		borderWidth: 40,
		borderLeftWidth: 35,
		borderRightWidth: 35,
		position: 'absolute',
		elevation: 10
	},
	scanHistory:
	{
		flex: 1,
		backgroundColor: colors.primarySpaceColor,
		justifyContent: 'flex-start'
	}
});