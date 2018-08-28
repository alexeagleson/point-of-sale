const validateTextField = (textValue, formName) => {
    if (textValue.length === 0) return `${formName} cannot be empty.`;
    return true;
};

const validateNumber = (numberValue, formName, min, max) => {
    if (isNaN(numberValue)) return `${formName} must be a number.`;
    if (numberValue % 1 !== 0) return `${formName} cannot be a decimal or fraction.`;
    if (min && max) {
        if (numberValue < min || numberValue > max) return `${formName} must be between ${min} and ${max}.`;
    }
    return true;
};