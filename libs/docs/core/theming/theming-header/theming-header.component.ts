import { Component } from '@angular/core';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    CodeSnippetComponent,
    DescriptionComponent,
    DocPageComponent,
    ExampleFile,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-theming-header',
    templateUrl: './theming-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        MessageStripComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
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
},
{
    "input": "{path to local theming folder}/sap_belize_fonts.css",
    "inject": false,
    "bundleName": "sap_belize_fonts"
}
        `,
        language: 'json'
    };
}
