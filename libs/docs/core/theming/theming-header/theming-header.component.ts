import { Component } from '@angular/core';
import { ExampleFile } from '@fundamental-ngx/docs/shared';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { CodeSnippetComponent } from '../../../shared/src/lib/core-helpers/code-snippet/code-snippet.component';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';
import { DocPageComponent } from '../../../shared/src/lib/core-helpers/doc-page/doc-page.component';

@Component({
    selector: 'fd-theming-header',
    templateUrl: './theming-header.component.html',
    standalone: true,
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
}
        `,
        language: 'json'
    };
}
