// React imports
import React, {Component} from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet, Text, Vibration, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, textStyle} from 'cuOrganizer/src/common/appStyles';
import {ActionBar, Button, IconButton} from 'cuOrganizer/src/common';

class ScannerPage extends Component
{
	constructor(props)
	{
		super(props);
		this.scrollRef = React.createRef();
		this.state = 
		{
			showHistory: false,
			displayIndicator: false,
			indicatorColor: 'transparent'
		};
	}

	processCode()
	{

	}

	scanSuccess()
	{
		Vibration.vibrate(500);
		this.setState({displayIndicator: true, indicatorColor: green});

		setTimeout(() => this.setState({displayIndicator: false}), 500);
	}

	scanFailure()
	{
		Vibration.vibrate(800);
		this.setState({displayIndicator: true, indicatorColor: red});

		var flasher = setInterval(() => this.setState(prevState => {return {displayIndicator: !prevState.displayIndicator}}), 100);
		setTimeout(() => 
		{
			this.setState({displayIndicator: false});
			clearInterval(flasher);
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