const statusAttr = 'status';
const colorAttr = 'color';
const backgroundColorAttr = 'background-color';
const indicatorAttr = 'ng-reflect-indication-color';
const sizeAttr = 'ng-reflect-large';
const semanticColors = {
    negative: '187,0,0',
    critical: '233,115,12',
    positive: '16,126,62',
    informative: '5,59,112',
    null: '106,109,112'
};
enum genericColors {
    '136,0,0' = 1,
    '187,0,0',
    '233,115,12',
    '16,126,62',
    '10,110,209',
    '15,130,143',
    '146,90,206',
    '192,57,159'
}
const semanticText = [
    'Negative',
    'Critical',
    'Positive',
    'Informative',
    'Default'
];
const genericColorText = [
    'Indication Color',
    'Indication Color',
    'Indication Color',
    'Indication Color',
    'Indication Color',
    'Indication Color',
    'Indication Color',
    'Indication Color'
];
const objStatusText = [
    'Negative',
    'Critical',
    'Positive',
    'Informative',
    'Default',
    '5',
    '20',
    '2.99',
    '10',
    '99+',
    'Negative',
    'Critical',
    'Positive',
    'Informative',
    'Default',
    'Negative',
    'Critical',
    'Positive',
    'Informative',
    'Default'
];
const invertedSemanticColors = {
    negative: '187,0,0',
    critical: '233,115,12',
    positive: '16,126,62',
    informative: '10,110,209',
    null: '106,109,112'
};
const invertedColor = '255,255,255';

export {
    statusAttr, colorAttr, semanticColors, genericColors, semanticText, indicatorAttr, genericColorText,
    objStatusText, backgroundColorAttr, invertedColor, sizeAttr, invertedSemanticColors
};
