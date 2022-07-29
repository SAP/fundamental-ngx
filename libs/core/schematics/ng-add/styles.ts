/** */

type DefaultStyles = Record<string, string>;

export const defaultStyles: DefaultStyles = {
    '72-Regular-full.woff': `
@font-face {
    font-family: '72';
    src: url('~@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/72-Regular-full.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    `,
    '72-Light.woff': `
@font-face {
    font-family: '72';
    src: url('~@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/72-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
}
    `,
    '72-Bold.woff': `
@font-face {
    font-family: '72';
    src: url('~@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/72-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
}
    `,
    'BusinessSuiteInAppSymbols.woff': `
@font-face {
    font-family: 'BusinessSuiteInAppSymbols';
    src: url('~@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/BusinessSuiteInAppSymbols.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    `,
    'SAP-icons-TNT.woff': `
@font-face {
    font-family: 'SAP-icons-TNT';
    src: url('~@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/SAP-icons-TNT.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    `
};
