import { NgIf, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import {
    FdbToolHeaderActionButton,
    ToolHeaderActionDirective,
    ToolHeaderActionsDirective,
    ToolHeaderButtonDirective,
    ToolHeaderComponent,
    ToolHeaderUserDirective
} from '@fundamental-ngx/btp/tool-header';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    MenuAddonDirective,
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    PopoverBodyDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
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
        SegmentedButtonComponent,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyDirective,
        RepeatDirective,
        ToolHeaderActionDirective,
        ToolHeaderButtonDirective,
        MessageStripComponent,
        PopoverBodyHeaderDirective,
        NgStyle,
        ContentDensityDirective
    ],
    standalone: true
})
export class ToolHeaderBasicExampleComponent {
    @ViewChild('notificationsPopover')
    notificationsPopoverComponent: PopoverComponent;

    viewMode: FdbViewMode = '';

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

    notificationsActionClicked() {
        console.log('notificationsActionClicked');
    }
}
