import { Component } from '@angular/core';
import { ExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-theme-switcher-header',
    templateUrl: './theme-switcher-header.component.html'
})
export class ThemeSwitcherHeaderComponent {
    file: ExampleFile = {
        code: `{
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
}
