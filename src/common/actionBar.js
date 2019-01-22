// --------------------------------------------------------------------------------------
// Props -> inverted: bool, lifted: bool, leftButton: Component, 
//			title: string, rightButton: Component
// --------------------------------------------------------------------------------------

// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Custom imports
import {colors, textStyle} from './appStyles';

export default class ActionBar extends Component
{
	render()
	{
		var barStyle = localStyle.bar;
		var titleStyle = localStyle.titleText;

		if (this.props.inverted == true)
		{
			if (this.props.lifted)
				barStyle = localStyle.liftedIBar
			else
				barStyle = localStyle.iBar;

			titleStyle = localStyle.iTitleText;
		}

		return (
			<View>
				<View style = {barStyle}>
					<View>
						{this.props.leftButton}
					</View>
					<View style = {localStyle.title}>
						<Text style = {titleStyle}>{this.props.title}</Text>
					</View>
					<View>
						{this.props.rightButton}
					</View>
				</View>
			</View>
		);
	}
}

const localStyle = StyleSheet.create(
{
	bar:
	{
		alignItems: 'flex-start',
		flexDirection: 'row',
		backgroundColor: colors.primaryColor,
		height: 56
	},
	iBar:
	{
		alignItems: 'flex-start',
		flexDirection: 'row',
		backgroundColor: colors.primarySpaceColor,
		height: 56
	},
	liftedIBar:
	{
		alignItems: 'flex-start',
		flexDirection: 'row',
		backgroundColor: colors.primarySpaceColor,
		height: 56,
		elevation: 5
	},
	title:
	{
		flex: 1,
		marginHorizontal: 12,
		marginTop: 14,
		marginBottom: 10,
		justifyContent: 'center'
	},
	titleText: textStyle.bold(24,),
	iTitleText: textStyle.bold(24, 'left', colors.primaryColor)
});