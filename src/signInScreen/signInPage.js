// React Native imports
import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';

// Redux imports
import {connect} from 'react-redux';
import {saveName} from './actions';

// Custom imports
import {colors, containerStyle, textStyle} from 'cuOrganizer/src/common/appStyles';
import {Button, PagePadding, TextField} from 'cuOrganizer/src/common';

class SignInPage extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {fullNameText: props.organizerName};
	}

	checkNameFormat()
	{
		if (this.state.fullNameText == "")
		{
			Alert.alert(
				"No name entered",
				"Please enter a name",
				[{text: 'OK', onPress: () => {}}]
			);
		}
		else
		{
			// Saving the name to the app
			this.props.saveName(this.state.fullNameText.trim());

			// Moving to loading screen (authentication)
			this.props.navigation.navigate("Loading");
		}
	}

	render()
	{
		return (
			<View style = {containerStyle.page}>
				<PagePadding/>
				<View style = {containerStyle.pageSection}>
					<Text style = {[textStyle.regular(28, 'center'), {paddingVertical: 20}]}>Sign In</Text>
				</View>
				<View style = {containerStyle.pageSection}>
					<TextField
						fontSize = {24}
						label = "Full Name"
						autoCapitalize = 'words'
						defaultValue = {this.state.fullNameText}
						textAlign = 'center'
						textColor = {colors.primaryTextColor}
						maxLength = {30}
						onChangeText = {(newText) => this.setState({fullNameText: newText})}
						onSubmitEditing = {this.checkNameFormat.bind(this)}
						placeholder = "Wal Wal"
					/>
				</View>
				<View style = {containerStyle.pageSection}>
					<Button
						label = "Submit"
						color = 'white'
						inverted = {true}
						action = {this.checkNameFormat.bind(this)}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) =>
{
	return {
		organizerName: state.organizerName
	};
}
export default connect(mapStateToProps, {saveName})(SignInPage);