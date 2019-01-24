// React imports
import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {undoScan} from '../actions';

// Custom imports
import {colors, textStyle} from 'cuOrganizer/src/common/appStyles';
import {IconButton} from 'cuOrganizer/src/common';

class ScanList extends Component
{
	createItem(hacker)
	{
		var onPress = () =>
		{
			Alert.alert(
				"Undo Scan",
				"Are you sure?\nOnly undo if absolutely necessary.",
				[
					{text: 'Undo', onPress: () => this.props.undoScan(this.props.event, hacker.id)},
					{text: 'Cancel', onPress: () => {}}
				]
			);
		};

		return (
			<View
				key = {hacker.id}
				style = {localStyle.item}
			>
				<View style = {localStyle.iconButton}>
					<IconButton
						type = 'close'
						size = {50}
						color = {colors.primaryColor}
						action = {onPress}
					/>
				</View>
				<View>
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
		console.log(this.props.scanHistory, this.props.selectedEvent);
		var scanItems = this.props.scanHistory[this.props.selectedEvent].map(x => this.createItem(x));

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
		scanHistory: state.scanHistory,
		selectedEvent: state.selectedEvent
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
	scanList:
	{
		justifyContent: 'flex-start'
	},
	iconButton:
	{
		margin: -12,
		padding: 16
	}
});