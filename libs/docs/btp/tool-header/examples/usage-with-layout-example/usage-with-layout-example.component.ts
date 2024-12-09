import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import {
    FdbToolHeaderActionButton,
    ToolHeaderAutoModeDirective,
    ToolHeaderComponent
} from '@fundamental-ngx/btp/tool-header';
import {
    ToolLayoutComponent,
    ToolLayoutContainerDirective,
    ToolLayoutContentContainerDirective,
    ToolLayoutHeaderContainerDirective,
    ToolLayoutNavigationContainerDirective
} from '@fundamental-ngx/btp/tool-layout';

@Component({
    selector: 'fdb-tool-layout-usage-with-layout-example',
    templateUrl: './usage-with-layout-example.component.html',
    imports: [
        ToolLayoutComponent,
        ToolLayoutContainerDirective,
        ToolLayoutContentContainerDirective,
        ToolLayoutHeaderContainerDirective,
        ToolLayoutNavigationContainerDirective,
        SearchFieldComponent,
        ToolHeaderAutoModeDirective,
        ToolHeaderComponent,
        FormsModule,
        AsyncPipe
    ]
})
export class UsageWithLayoutExampleComponent {
    searchValue: string = '';

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

    valueUpdate($event: any) {}

    toggleMenu(b: boolean) {}
}
