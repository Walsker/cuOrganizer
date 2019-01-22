// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';

// Custom imports
import {colors, containerStyle, textStyle} from 'cuOrganizer/src/common/appStyles';
import {Button, Divider, PagePadding} from 'cuOrganizer/src/common';

class MenuPage extends Component
{
	componentDidMount()
	{
		console.log(this.props.eventTypes);
	}
	
	render()
	{
		var firstName = (this.props.organizerName.split(" "))[0];
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
					<Button
						label = "Registration"
						labelColor = {colors.primaryTextColor}
						color = {colors.primaryColor}
						inverted = {false}
						action = {() => {}}
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
export default connect(mapStateToProps)(MenuPage);