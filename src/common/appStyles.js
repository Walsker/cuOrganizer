import {StyleSheet} from 'react-native';

export const colors =
{
	primaryColor: '#C8102E',
	darkPrimaryColor: '#AC0D27',
	primarySpaceColor: '#222222',
	secondarySpaceColor: '#444444',
	primaryTextColor: '#FFFFFF',
	secondaryTextColor: '#757575',
	dividerColor: '#FFFFFF22'
}

export const containerStyle = StyleSheet.create(
{
	default: {flex: 1},
	page:
	{
		flex: 1,
		backgroundColor: colors.primarySpaceColor,
		justifyContent: 'flex-start',
		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: 0
	},
	pageSection:
	{
		marginVertical: 10,
		justifyContent: 'flex-start'
	}
});

const createFont = (size, alignment, color) =>
{
	let style = {color: colors.primaryTextColor};

	if (size)
		style["fontSize"] = size;

	if (alignment)
		style["textAlign"] = alignment;

	if (color)
		style["color"] = color

	return style;
};

export const textStyle =
{
	light: (size, alignment, color) =>
	{
		return Object.assign({fontFamily: 'Roboto-Light'}, createFont(size, alignment, color));
	},
	regular: (size, alignment, color) =>
	{
		return Object.assign({fontFamily: 'Roboto-Regular'}, createFont(size, alignment, color));
	},
	bold: (size, alignment, color) =>
	{
		return Object.assign({fontFamily: 'Roboto-Black'}, createFont(size, alignment, color));
	},
	italic: (size, alignment, color) =>
	{
		return Object.assign({fontFamily: 'Roboto-Italic'}, createFont(size, alignment, color));
	}
}