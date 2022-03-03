const convertFirstCharacterToUppercase = (
    stringToConvert: string | undefined
) => {
    if (stringToConvert) {
        var firstCharacter = stringToConvert.substring(0, 1);
        var restString = stringToConvert.substring(1);

        return firstCharacter.toUpperCase() + restString;
    }
};

export default convertFirstCharacterToUppercase;
