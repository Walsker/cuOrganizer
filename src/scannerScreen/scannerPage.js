// React imports
import React, {Component} from 'react';
import {Alert, Dimensions, Platform, ScrollView, StatusBar, StyleSheet, Vibration, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

// Redux imports
import {connect} from 'react-redux';
import {logScan} from './actions';

// Firebase imports
import firebase from 'react-native-firebase';

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
			firestore: firebase.firestore(),
			showHistory: false,
			animationStatus: 'IDLE'
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
					"Do not admit this badge if registration has closed",
					[{text: 'OK', onPress: callback}],
					{cancelable: false}
				);
				return;

			case "Catch":
				Alert.alert(
					"Something went wrong",
					"Please try again",
					[{text: 'OK', onPress: callback}],
					{cancelable: false}
				);
				return;
		}
	}

	processCode(code)
	{
		// Inidicating that the code is being processed
		this.setState({animationStatus: 'LOADING'});

		// Extracting the data from the QR code
		let codeType = code.data.split("|")[0];
		let hackerEmail = code.data.split("|")[1];

		const success = (document) =>
		{
			// Retrieving the hacker's name
			let {first, last} = document.data().name;

			// Telling firebase that this code has been scanned
			this.state.firestore.collection("events").doc(this.props.selectedEvent.id).collection("scanStatus").doc(hackerEmail).set(
			{
				scanned: true,
				organizer: this.props.organizerName
			}).then(() => this.scanSuccess(hackerEmail, first, last)).catch(error =>
			{
				console.log("Tried to set the scan status to true.", error);
				this.scanFailure("Catch");
			});
		};

		const getHackerName = () =>
		{
			this.state.firestore.collection("hackers").doc(hackerEmail).get().then(success).catch(error =>
			{
				console.log("Tried to get the hacker's name", error);
				this.scanFailure("Catch");
			});
		};

		const checkIfRegistered = (document) =>
		{
			// Checking if this badge is registered
			if (!document.data().scanned)
				this.scanFailure("Not Registered");
			else
				getHackerName();
		};

		const checkIfUsed = (document) =>
		{
			// Checking if this badge has already been scanned
			if (document.data().scanned)
				this.scanFailure("Already Scanned");
			else if (this.props.selectedEvent.id == "registration")
				getHackerName();
			else
			{
				this.state.firestore.collection("events").doc("registration").collection("scanStatus").doc(hackerEmail).get().then(checkIfRegistered).catch(error =>
				{
					console.log("Tried to check if the hacker was registered", error);
					this.scanFailure("Catch");
				});
			}
		};

		// Checking if the QR code is in the correct format
		if (codeType != BADGE_KEY || hackerEmail == null)
		{
			if (codeType == INVITE_KEY)
				this.scanFailure("Invite Code");
			else
				this.scanFailure("Invalid Badge");
		}
		else
		{
			// Checking if the badge has been scanned before
			this.state.firestore.collection("events").doc(this.props.selectedEvent.id).collection("scanStatus").doc(hackerEmail).get().then(checkIfUsed).catch(error =>
			{
				console.log("Tried to get the hacker's scan status.", error);
				this.scanFailure("Catch");
			});
		}
	}

	scanSuccess(hackerEmail, firstName, lastName)
	{
		console.log("SCAN SUCCESSFUL");

		// Inidicating the successful scan
		this.setState({animationStatus: 'SUCCESS'});

		// Vibrating the phone
		Vibration.vibrate(200);

		setTimeout(() =>
		{
			// Turning off the indicator
			this.setState({animationStatus: 'IDLE'});

			// Turning the scanner back on after a cooldown time
			setTimeout(() => this.scannerRef.current.reactivate(), 1000);
		}, 500);

		// Logging the scan in the phone
		this.props.logScan(this.props.selectedEvent.id, hackerEmail, firstName, lastName);
	}

	scanFailure(error)
	{
		console.log("SCAN FAILED");

		// Indicating an unsuccessful scan
		this.setState({animationStatus: 'FAILURE'});

		// Vibrating the phone
		Vibration.vibrate(200);

		// Showing the appropriate alert
		this.showAlert(error, () =>
		{
			// Turning the scanner back on
			this.setState({animationStatus: 'IDLE'});
			this.scannerRef.current.reactivate();
		});
	}

	renderHistoryButton()
	{
		let iconName = (this.state.showHistory ? 'photo-camera' : 'history');
		let toggleHistory = () =>
		{
			// Changing the toggle icon
			if (Platform.OS === 'android')
			{
				if (!this.state.showHistory)
					this.scrollRef.current.scrollToEnd();
				else
					this.scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
			}

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

	renderActionBar()
	{
		return (
			<ActionBar
				title = {this.props.selectedEvent.title}
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
		);
	}

	renderScanList()
	{
		return (
			<View style = {localStyle.scanHistory}>
				<ScanList/>
			</View>
		);
	}

	renderCamera(size)
	{
		return (
			// <View style = {[localStyle.cameraSpace, {height: height - (56 + 20)}]}>
			<View style = {[localStyle.cameraSpace, {height: size}]}>
				{this.state.displayIndicator ? <View style = {[localStyle.indicator, {borderColor: this.state.indicatorColor}]}/> : <View/>}
				<QRCodeScanner
					ref = {this.scannerRef}
					onRead = {this.processCode.bind(this)}
					fadeIn = {false}
					showMarker = {true}
					customMarker = {<CameraMarker mode = {this.state.animationStatus}/>}
					cameraStyle = {localStyle.camera}
					cameraProps = {{captureAudio: false}}
				/>
			</View>
		);
	}

	renderIOS()
	{
		let {height} = Dimensions.get('screen');
		let content = this.state.showHistory ? this.renderScanList() : this.renderCamera(height - 76);

		return (
			<View style = {{flex: 1}}>
				{this.renderActionBar()}
				{content}
			</View>
		);
	}

	renderAndroid()
	{
		let {height} = Dimensions.get('screen');

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
				{this.renderCamera(height - 56)}
				<View style = {{height: height - StatusBar.currentHeight}}>
					{this.renderActionBar()}
					{this.renderScanList()}
				</View>
			</ScrollView>
		);
	}

	render()
	{
		// let {height} = Dimensions.get('window');
		// let statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

		// return (
		// 	<ScrollView
		// 		ref = {this.scrollRef}
		// 		style = {{backgroundColor: 'red'}}
		// 		scrollsToTop = {false}
		// 		scrollEnabled = {false}
		// 		nestedScrollEnabled = {true}
		// 		showsVerticalScrollIndicator = {false}
		// 		showsHorizontalScrollIndicator = {false}
		// 	>
		// 		<StatusBar
		// 			backgroundColor = {this.state.showHistory ? colors.primaryColor : 'transparent'}
		// 			animated = {true}
		// 		/>
		// 		<View style = {[localStyle.cameraSpace, {height: height - (56 + 20)}]}>
		// 			{this.state.displayIndicator ? <View style = {[localStyle.indicator, {borderColor: this.state.indicatorColor}]}/> : <View/>}
		// 			<QRCodeScanner
		// 				ref = {this.scannerRef}
		// 				onRead = {this.processCode.bind(this)}
		// 				fadeIn = {false}
		// 				showMarker = {true}
		// 				customMarker = {<CameraMarker mode = {this.state.animationStatus}/>}
		// 				cameraStyle = {localStyle.camera}
		// 				cameraProps = {{captureAudio: false}}
		// 			/>
		// 		</View>
		// 		<View style = {{height: height - statusBarHeight}}>
		// 			<ActionBar
		// 				title = {this.props.selectedEvent.title}
		// 				lifted = {true}
		// 				inverted = {false}
		// 				leftButton =
		// 				{
		// 					<IconButton
		// 						type = 'arrow-back'
		// 						size = {30}
		// 						color = {colors.primaryTextColor}
		// 						action = {() => this.props.navigation.goBack()}
		// 					/>
		// 				}
		// 				rightButton = {this.renderHistoryButton()}
		// 			/>
		// 			<View style = {localStyle.scanHistory}>
		// 				<ScanList/>
		// 			</View>
		// 		</View>
		// 	</ScrollView>
		// );

		if (Platform.OS === 'ios')
			return this.renderIOS();
		else
			return this.renderAndroid();
	}
}

const mapStateToProps = (state) =>
{
	return {
		organizerName: state.organizerName,
		selectedEvent: state.selectedEvent
	};
}
export default connect(mapStateToProps, {logScan})(ScannerPage);


const localStyle = StyleSheet.create(
{
	camera: {height: '100%'},
	cameraMarker: {borderColor: 'white'},
	cameraSpace:
	{
		flex: Platform.OS === 'ios' ? 1 : 0.1,
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