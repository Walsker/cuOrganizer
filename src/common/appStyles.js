import {StyleSheet} from 'react-native';

export const colors =
{
	primaryColor: '#C8102E',
	darkPrimaryColor: '#AC0D27',
	primarySpaceColor: '#FDEDB2',
	lightSpaceColor: '#FAFAFA',
	darkSpaceColor: '#222222',
	primaryTextColor: '#212121',
	secondaryTextColor: '#757575',
	dividerColor: '#AFAFAF'
}

export const containerStyle = StyleSheet.create(
{
	default: {flex: 1}
});

const createFont = (size, alignment, color) =>
{
	var style = {color: colors.primaryTextColor};

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