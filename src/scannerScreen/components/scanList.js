// React imports
import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {undoScan} from '../actions';

// Firebase imports
import firebase from 'react-native-firebase';

// Custom imports
import {colors, textStyle} from 'cuOrganizer/src/common/appStyles';
import {IconButton} from 'cuOrganizer/src/common';

class ScanList extends Component
{
	undoScan(email)
	{
		// Telling firebase to undo the scan then undoing the scan locally
		firebase.firestore().collection("events").doc(this.props.selectedEventID).collection("scanStatus").doc(hackerEmail).set(
		{
			scanned: false,
			organizer: null
		}).then(() => this.props.undoScan(this.props.selectedEventID, email)).catch(error => alert(error));
	}

	createItem(hacker)
	{
		let onPress = () =>
		{
			Alert.alert(
				"Undo Scan",
				"Are you sure?\nOnly undo if absolutely necessary.",
				[
					{text: 'Undo', onPress: () => this.undoScan(hacker.email)},
					{text: 'Cancel', onPress: () => {}}
				]
			);
		};

		return (
			<View
				key = {hacker.email}
				style = {localStyle.item}
			>
				{
					this.props.selectedEventID == 'registration' ? 
						<View/>
						: 
						<View style = {localStyle.iconButton}>
							<IconButton
								type = 'close'
								size = {50}
								color = {colors.primaryColor}
								action = {onPress}
							/>
						</View>
				}
				<View style = {localStyle.name}>
					<Text style = {textStyle.light(24)}>{hacker.firstName}</Text>
					<Text style = {[textStyle.light(18, 'left', colors.secondaryTextColor), {paddingLeft: 1}]}>
						{hacker.lastName}
					</Text>
				</View>
			</View>
		);
	}

	render()
	{
		let scanItems = this.props.scanHistory.map(scanEntry => this.createItem(scanEntry));

		return (
			<ScrollView style = {{marginBottom: -1}}>
				{scanItems}
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) =>
{
	return { 
		scanHistory: state.scanHistory[state.selectedEvent.id],
		selectedEventID: state.selectedEvent.id
	};
}
export default connect(mapStateToProps, {undoScan})(ScanList);


const localStyle = StyleSheet.create(
{
	item:
	{
		// padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: colors.dividerColor
	},
	name:
	{
		padding: 16
	},
	scanList:
	{
		justifyContent: 'flex-start'
	},
	iconButton:
	{
		margin: -12,
		padding: 16,
		paddingLeft: 0
	}
});