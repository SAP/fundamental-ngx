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
        code: `{
    "glob": "**/*",
    "input": "./node_modules/fundamental-styles/dist/theming/",
    "output": "./assets/fundamental-styles-theming/"
},
{
    "glob": "**/*",
    "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/",
    "output": "./assets/theming-base/baseTheme/fonts/"
},
{
    "glob": "**/*",
    "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/fonts/",
    "output": "./assets/theming-base/sap_horizon/fonts/"
}`,
        language: 'json'
    };
}
