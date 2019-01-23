// React imports
import React, {Component} from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

// Redux imports
import {connect} from 'react-redux';

// Firebase imports
import firebase from '@firebase/app';
import '@firebase/database';

// Custom imports
import {colors, textStyle} from 'cuOrganizer/src/common/appStyles';
import {ActionBar, Button, IconButton} from 'cuOrganizer/src/common';
import BADGE_KEY from 'cuOrganizer/$badge';

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
			displayIndicator: false,
			indicatorColor: 'transparent'
		};
	}

	processCode(code)
	{
		const checkIfScanned = (snapshot) =>
		{
			// Checking if this badge has already been scanned
			console.log(snapshot.val().scanned);
			if (snapshot.val().scanned)
				this.scanFailure("Already Scanned");
			else
				this.scanSuccess(data[1]);
		};

		// Extracting the data from the QR code
		var data = code.data.split("|");
		
		// Checking if the QR code is in the correct format
		if (data[0] != BADGE_KEY || data[1] == null)
			this.scanFailure("Invalid Badge");
		else
			firebase.database().ref('/badgeChecks/' + this.props.selectedEvent + '/' + data[1]).once('value').then(checkIfScanned).catch(error => alert(error));
	}

	scanSuccess(hackerID)
	{
		// TODO: set scanned to true and provide org name
		firebase.database().ref('/badgeChecks/' + this.props.selectedEvent + '/' + hackerID).set({
			scanned: true,
			organizer: this.props.organizerName,
			time: 111
		});
		// TODO: get hacker name and save to history

		// Displaying a green indicator
		this.setState({displayIndicator: true, indicatorColor: green});
		setTimeout(() => 
		{
			// Turning off the indicator
			this.setState({displayIndicator: false});
			
			// Turning the scanner back on after a cooldown time
			setTimeout(() => this.scannerRef.current.reactivate(), 1000);
		}, 500);
	}

	scanFailure(error)
	{
		// Displaying a flashing red indicator
		this.setState({displayIndicator: true, indicatorColor: red});

		var flasher = setInterval(() => this.setState(prevState => {return {displayIndicator: !prevState.displayIndicator}}), 100);
		setTimeout(() => 
		{
			// Turning off the indicator
			clearInterval(flasher);
			this.setState({displayIndicator: false});

			// Turning the scanner back on after a cooldown time
			setTimeout(() => this.scannerRef.current.reactivate(), 1000);
		}, 800);
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
		var {width, height} = Dimensions.get('screen');

		return (
			<ScrollView
				ref = {this.scrollRef}
				scrollsToTop = {false}
				scrollEnabled = {false}
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
						fadeIn = {false}
						onRead = {this.processCode.bind(this)}
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
					<View style = {localStyle.scanList}>
						<Button
							label = "Scroll to Top"
							color = 'white'
							labelColor = {colors.primaryColor}
							inverted = {false}
							action = {() => this.scrollRef.current.scrollTo({x: 0, y: 0, animated: true})}
						/>
						<Text style = {textStyle.light(21, 'center')}>Scan history</Text>
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
export default connect(mapStateToProps)(ScannerPage);

const green = '#00FF00';
const red = '#FF0000';
const localStyle = StyleSheet.create(
{
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
	scanList:
	{
		flex: 1,
		backgroundColor: colors.primarySpaceColor,
		justifyContent: 'flex-end'
	},
	camera: {height: '100%'}
});