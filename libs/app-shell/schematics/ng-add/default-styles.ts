export function createFundamentalStyles(): string {
    return `
@import "~@angular/cdk/overlay-prebuilt.css";

$gutter-size: 15px;

@font-face {
    font-family: "72";
    src: url("~@sap-theming/theming-base-content/content/Base/baseLib/sap_base_fiori/fonts/72-Regular-full.woff")
    format("woff");
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: "72";
    src: url("~@sap-theming/theming-base-content/content/Base/baseLib/sap_base_fiori/fonts/72-Light.woff")
    format("woff");
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: "72";
    src: url("~@sap-theming/theming-base-content/content/Base/baseLib/sap_base_fiori/fonts/72-Bold.woff")
    format("woff");
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: "SAP-icons";
    src: url("~@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/fonts/SAP-icons.woff")
    format("woff");
    font-weight: normal;
    font-style: normal;
}


html,
body {
    position: relative;
    height: 100%;
    overflow: hidden;
}

*,
::after,
::before {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}

body {
    margin: 0;
    background-color: white;
    font-family: "72", sans-serif;
}
`;
}
