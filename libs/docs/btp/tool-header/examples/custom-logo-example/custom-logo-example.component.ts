import { Component } from '@angular/core';
import { ToolHeaderButtonDirective } from '@fundamental-ngx/btp/button';
import {
    ToolHeaderActionDirective,
    ToolHeaderActionsDirective,
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
            <fdb-tool-header-actions>
                <ng-template label="Action 1" glyph="add" fdbToolHeaderAction>
                    <button fd-button fdbToolHeaderButton ariaLabel="Action 1" glyph="add"></button>
                </ng-template>
            </fdb-tool-header-actions>
        </fdb-tool-header>
    `,
    imports: [
        ToolHeaderComponent,
        ToolHeaderAutoModeDirective,
        ToolHeaderLogoDirective,
        ToolHeaderActionsDirective,
        ToolHeaderActionDirective,
        ButtonComponent,
        ToolHeaderButtonDirective
    ],
    standalone: true
})
export class CustomLogoExampleComponent {}
