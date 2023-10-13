import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import {
    FdbToolHeaderActionButton,
    ToolHeaderActionsDirective,
    ToolHeaderAutoModeDirective,
    ToolHeaderComponent
} from '@fundamental-ngx/btp/tool-header';

@Component({
    selector: 'fdb-tool-header-auto-mode-example',
    templateUrl: './auto-mode-example.component.html',
    imports: [
        ToolHeaderComponent,
        SearchFieldComponent,
        FormsModule,
        ToolHeaderActionsDirective,
        ToolHeaderAutoModeDirective
    ],
    standalone: true
})
export class ToolHeaderAutoModeExampleComponent {
    searchValue: string;

    actions: Array<FdbToolHeaderActionButton[]> = [
        [
            {
                label: 'Source Code',
                glyph: 'source-code',
                clickCallback: () => {
                    console.log('Source code');
                },
                forceVisibility: false
            }
        ],
        [
            {
                label: 'Notifications',
                glyph: 'bell',
                clickCallback: () => {
                    console.log('Action 1');
                },
                forceVisibility: true,
                hasBadge: true
            },
            {
                label: 'Settings',
                glyph: 'settings',
                clickCallback: () => {
                    console.log('Settings');
                },
                forceVisibility: false
            }
        ]
    ];

    valueUpdate($event: string) {
        console.log($event);
        this.searchValue = $event;
    }
}
