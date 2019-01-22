// React imports
import React, {Component} from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'cuOrganizer/src/common/appStyles';
import {ActionBar} from 'cuOrganizer/src/common';

class ScannerPage extends Component
{
	render()
	{
		var {width, height} = Dimensions.get('screen');

		return (
			<ScrollView showsVerticalScrollIndicator = {false} showsHorizontalScrollIndicator = {false}>
				<View style = {[localStyle.cameraScreen, {height}]}>
					<View style = {localStyle.cameraSpace}>
						<Text style = {textStyle.light(21, 'center')}>QR Code scanner page</Text>
					</View>
					<ActionBar
						title = {this.props.eventTypes[this.props.selectedEvent]}
						lifted = {true}
						inverted = {false}
					/>
				</View>
				<View style = {[localStyle.scanHistory, {height: height - 56 - StatusBar.currentHeight}]}>
					<Text style = {textStyle.light(21, 'center')}>Scan history</Text>
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


const localStyle = StyleSheet.create(
{
	cameraScreen:
	{
		backgroundColor: colors.primarySpaceColor,
		justifyContent: 'flex-end'
	},
	cameraSpace:
	{
		flex: 1,
		justifyContent: 'center'
	},
	scanHistory:
	{
		backgroundColor: colors.primarySpaceColor,
		justifyContent: 'flex-end'
	}
});