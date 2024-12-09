import { Component } from '@angular/core';
import {
    ToolHeaderActionButtonDirective,
    ToolHeaderActionDirective,
    ToolHeaderAutoModeDirective,
    ToolHeaderComponent,
    ToolHeaderLogoDirective
} from '@fundamental-ngx/btp/tool-header';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdb-tool-header-custom-logo-example',
    template: `
        <fdb-tool-header productName="Fundamental Library" fdbToolHeaderAutoMode>
            <img
                alt="Fundamental Library Logo"
                src="https://raw.githubusercontent.com/SAP/fundamental/main/docs/images/land-page-assets/logo.svg"
                fdbToolHeaderLogo
            />
            <ng-template fdbToolHeaderAction forceVisibility>
                <button fd-button fdbToolHeaderActionButton ariaLabel="Action 1" glyph="add"></button>
            </ng-template>
        </fdb-tool-header>
    `,
    imports: [
        ToolHeaderComponent,
        ToolHeaderAutoModeDirective,
        ToolHeaderLogoDirective,
        ButtonComponent,
        ToolHeaderActionDirective,
        ToolHeaderActionButtonDirective
    ]
})
export class CustomLogoExampleComponent {}
