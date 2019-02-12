// React Native imports
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';

// Custom imports
import {colors, textStyle} from 'cuOrganizer/src/common/appStyles';

export default class TextField extends Component
{
	render()
	{
		let borderStyle;
		if (Platform.OS === 'ios')
			borderStyle = localStyle.roundedBox;
		else
			borderStyle = {};

		return (
			<View>
				<View style = {borderStyle}>
					<TextInput
						blurOnSubmit = {false}
						placeholderTextColor = {this.props.textColor + '50'}
						style = {textStyle.regular(this.props.fontSize, this.props.textAlign, this.props.textColor)}
						underlineColorAndroid = {this.props.textColor}
						{...this.props}
					/>
				</View>
				<Text style = {textStyle.regular(this.props.fontSize / 1.7, this.props.textAlign, this.props.textColor)}>
					{this.props.label}
				</Text>
			</View>
		);
	}
}

const localStyle = StyleSheet.create(
{
	roundedBox:
	{
		padding: 10,
		margin: 5,
		borderRadius: 5,
		borderColor: colors.dividerColor,
		borderWidth: 1
	}
});