// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {selectEvent} from './actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'cuOrganizer/src/common/appStyles';
import {Button, Divider, PagePadding} from 'cuOrganizer/src/common';

class MenuPage extends Component
{
	createEventButton(eventKey, eventName)
	{
		const toScanner = () =>
		{
			this.props.selectEvent(eventKey);
			this.props.navigation.navigate("Scanner");
		}

		return (
			<Button
				key = {eventKey}
				label = {eventName}
				labelColor = {colors.primaryTextColor}
				color = {colors.primaryColor}
				inverted = {false}
				action = {toScanner.bind(this)}
			/>
		);
	}

	render()
	{
		let firstName = (this.props.organizerName.split(" "))[0];
		let eventButtons = [];

		for (let event in this.props.eventTypes)
			eventButtons.push(this.createEventButton(event, this.props.eventTypes[event]));

		return (
			<View style = {containerStyle.page}>
				<PagePadding/>
				<View style = {containerStyle.pageSection}>
					<Text style = {textStyle.regular(21, 'center')}>Hey {firstName}!</Text>
				</View>
				<View style = {containerStyle.pageSection}>
					<Text style = {textStyle.regular(21, 'center')}>
						To begin scanning codes, select the event you're responsible for below.
					</Text>
				</View>
				<Divider color = {colors.dividerColor}/>
				<View style = {containerStyle.pageSection}>
					{eventButtons}
				</View>
				<Divider color = {colors.dividerColor}/>
				<View style = {containerStyle.pageSection}>
					<Button
						label = "Refresh"
						color = 'white'
						labelColor = {colors.primaryColor}
						inverted = {false}
						action = {() => this.props.navigation.navigate("Loading")}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	return {
		organizerName: state.organizerName,
		eventTypes: state.eventTypes
	};
}
export default connect(mapStateToProps, {selectEvent})(MenuPage);