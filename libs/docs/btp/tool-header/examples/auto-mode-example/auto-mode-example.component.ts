import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolHeaderButtonDirective } from '@fundamental-ngx/btp/button';
import { NavigationMenuItemComponent } from '@fundamental-ngx/btp/navigation-menu';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import {
    FdbToolHeaderActionButton,
    ToolHeaderActionButtonDirective,
    ToolHeaderActionDirective,
    ToolHeaderActionSeparatorComponent,
    ToolHeaderAutoModeDirective,
    ToolHeaderComponent,
    ToolHeaderProductSwitchComponent,
    ToolHeaderUserDirective
} from '@fundamental-ngx/btp/tool-header';
import { ClickedDirective, RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonBadgeDirective, ButtonComponent } from '@fundamental-ngx/core/button';
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
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';

@Component({
    imports: [
        ToolHeaderComponent,
        SearchFieldComponent,
        FormsModule,
        ToolHeaderAutoModeDirective,
        ToolHeaderActionDirective,
        ButtonComponent,
        ToolHeaderActionSeparatorComponent,
        MessageStripComponent,
        PopoverBodyHeaderDirective,
        PopoverComponent,
        PopoverControlComponent,
        RepeatDirective,
        PopoverBodyDirective,
        NgStyle,
        ProductSwitchBodyComponent,
        ToolHeaderProductSwitchComponent,
        AvatarComponent,
        MenuAddonDirective,
        MenuComponent,
        MenuInteractiveComponent,
        MenuItemComponent,
        MenuTitleDirective,
        ToolHeaderUserDirective,
        MenuTriggerDirective,
        NavigationMenuItemComponent,
        ButtonBadgeDirective,
        ClickedDirective,
        ToolHeaderActionButtonDirective,
        ToolHeaderButtonDirective
    ],
    selector: 'fdb-tool-header-auto-mode-example',
    templateUrl: './auto-mode-example.component.html'
})
export class ToolHeaderAutoModeExampleComponent {
    searchValue: string;

    actions: FdbToolHeaderActionButton[] = [
        {
            label: 'Source Code',
            glyph: 'source-code',
            clickCallback: () => {
                console.log('Source code');
            },
            forceVisibility: false
        },
        {
            label: 'Settings',
            glyph: 'settings',
            clickCallback: () => {
                console.log('Settings');
            },
            forceVisibility: false
        },
        {
            label: 'Something',
            glyph: 'windows-doors',
            clickCallback: () => {
                console.log('Settings');
            },
            forceVisibility: false
        },
        {
            label: 'Something',
            glyph: 'visits',
            clickCallback: () => {
                console.log('Settings');
            },
            forceVisibility: false
        },
        {
            label: 'Something',
            glyph: 'video',
            clickCallback: () => {
                console.log('Settings');
            },
            forceVisibility: false
        },
        {
            label: 'Something',
            glyph: 'temperature',
            clickCallback: () => {
                console.log('Settings');
            },
            forceVisibility: false
        },
        {
            label: 'Something',
            glyph: 'task',
            clickCallback: () => {
                console.log('Settings');
            },
            forceVisibility: false
        }
    ];
    productSwitcher: ProductSwitchItem[] = [
        {
            title: 'Home',
            subtitle: 'Central Home',
            icon: 'home',
            disabledDragAndDrop: true,
            stickToPosition: true
        },
        {
            title: 'Analytics Cloud',
            subtitle: 'Analytics Cloud',
            icon: 'business-objects-experience',
            selected: true
        },
        {
            title: 'Catalog',
            subtitle: 'Ariba',
            icon: 'contacts'
        },
        {
            title: 'Guided Buying',
            icon: 'credit-card'
        },
        {
            title: 'Strategic Procurement',
            icon: 'cart-3'
        },
        {
            title: 'Vendor Managemen',
            subtitle: 'Fieldglass',
            icon: 'shipping-status'
        },
        {
            title: 'Human Capital Management',
            icon: 'customer'
        },
        {
            title: 'Sales Cloud',
            subtitle: 'Sales Cloud',
            icon: 'sales-notification'
        },
        {
            title: 'Commerce Cloud',
            subtitle: 'Commerce Cloud',
            icon: 'retail-store'
        },
        {
            title: 'Marketing Cloud',
            subtitle: 'Marketing Cloud',
            icon: 'marketing-campaign'
        },
        {
            title: 'Service Cloud',
            icon: 'family-care'
        },
        {
            title: 'S/4HANA',
            icon: 'batch-payments'
        }
    ];

    valueUpdate($event: string): void {
        console.log($event);
        this.searchValue = $event;
    }
}
