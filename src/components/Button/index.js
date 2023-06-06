import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { width } from 'react-native-dimension';

const Button = ({
    heading,
    onPress,
    color,
    textColor,
    showLeftArrow,
    marginVertical,
    fontSize,
    fontWeight,
    isBorder,
    isDisabled
}) => {
    return (
        <TouchableOpacity
            style={{
                height: width(12),
                backgroundColor: color,
                borderRadius: 25,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: isBorder ? 1 : 0,
                borderColor: isBorder ? "#471F65" : ""
            }}
            onPress={onPress}
            disabled={isDisabled}
            >
            <Text
                style={{
                    color: textColor,
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                }}>
                {heading}
            </Text>
            {/* <Image
                style={{
                    width: width(2),
                    height: width(4),
                    marginLeft: width(3),
                    marginTop: 3,
                }}
                source={showLeftArrow ? icons.rightArrowIcon : icons.blackRightIcon}
            /> */}
        </TouchableOpacity>
    );
};

Button.defaultProps = {
    textColor: 'black',
    marginVertical: width(3),
};

export default Button;
