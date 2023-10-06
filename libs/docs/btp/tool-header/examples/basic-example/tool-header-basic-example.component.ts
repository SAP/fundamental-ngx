import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import {
    FdbToolHeaderActionButton,
    FdbToolHeaderMode,
    ToolHeaderActionsDirective,
    ToolHeaderComponent,
    ToolHeaderUserDirective
} from '@fundamental-ngx/btp/tool-header';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    MenuAddonDirective,
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fdb-tool-header-basic-example',
    templateUrl: './tool-header-basic-example.component.html',
    imports: [
        ToolHeaderComponent,
        ToolHeaderUserDirective,
        AvatarComponent,
        SearchFieldComponent,
        FormsModule,
        MenuInteractiveComponent,
        MenuAddonDirective,
        MenuItemComponent,
        MenuTitleDirective,
        NgIf,
        ButtonComponent,
        ToolHeaderActionsDirective,
        MenuComponent,
        MenuTriggerDirective,
        SegmentedButtonComponent
    ],
    standalone: true
})
export class ToolHeaderBasicExampleComponent {
    viewMode: FdbToolHeaderMode = 'desktop';

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
