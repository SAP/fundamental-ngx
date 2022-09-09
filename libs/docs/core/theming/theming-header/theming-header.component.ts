import { Component } from '@angular/core';
import { ExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-theming-header',
    templateUrl: './theming-header.component.html'
})
export class ThemingHeaderComponent {
    assetsChunk: ExampleFile = {
        code: `
{
    "glob": "**/css_variables.css",
    "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/",
    "output": "./assets/theming-base/"
},
{
    "glob": "**/*",
    "input": "./node_modules/fundamental-styles/dist/theming/",
    "output": "./assets/fundamental-styles-theming/"
}
        `,
        language: 'json'
    };

    stylesChunk: ExampleFile = {
        code: `
{
    "input": "{path to local theming folder}/sap_fiori_3_fonts.css",
    "inject": false,
    "bundleName": "sap_fiori_3_fonts"
},
{
    "input": "{path to local theming folder}/sap_horizon_fonts.css",
    "inject": false,
    "bundleName": "sap_horizon_fonts"
}
        `,
        language: 'json'
    };
}
