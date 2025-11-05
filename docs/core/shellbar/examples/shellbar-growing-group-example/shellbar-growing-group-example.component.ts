import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductSwitchItem, ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import {
    ShellbarActionComponent,
    ShellbarActionsComponent,
    ShellbarBrandingComponent,
    ShellbarComponent,
    ShellbarGroupFlexOptions,
    ShellbarLogoComponent,
    ShellbarTitleComponent
} from '@fundamental-ngx/core/shellbar';

import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import {
    UserMenuBodyComponent,
    UserMenuComponent,
    UserMenuContentContainerComponent,
    UserMenuControlComponent,
    UserMenuControlElementDirective,
    UserMenuFooterComponent,
    UserMenuHeaderContainerDirective,
    UserMenuHeaderDirective,
    UserMenuListComponent,
    UserMenuListItemComponent,
    UserMenuSublineDirective,
    UserMenuSublistComponent,
    UserMenuUserNameDirective
} from '@fundamental-ngx/core/user-menu';

@Component({
    selector: 'fd-shellbar-growing-group-example',
    templateUrl: './shellbar-growing-group-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ShellbarComponent,
        ShellbarLogoComponent,
        ShellbarBrandingComponent,
        ShellbarTitleComponent,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ProductSwitchModule,
        UserMenuComponent,
        UserMenuBodyComponent,
        UserMenuControlComponent,
        UserMenuFooterComponent,
        UserMenuContentContainerComponent,
        UserMenuHeaderContainerDirective,
        UserMenuHeaderDirective,
        UserMenuSublineDirective,
        UserMenuUserNameDirective,
        UserMenuListComponent,
        UserMenuSublistComponent,
        UserMenuListItemComponent,
        UserMenuControlElementDirective,
        AvatarComponent,
        PopoverModule,
        ListModule,
        PanelModule,
        MenuModule,
        BarComponent,
        BarRightDirective,
        MessageToastModule
    ]
})
export class ShellbarGrowingGroupExampleComponent {
    @ViewChild(UserMenuComponent)
    userMenuComponent: UserMenuComponent;

    expanded = true;
    isOpen = false;

    groupConfig: ShellbarGroupFlexOptions = {
        product: {
            shrink: true,
            flexBasisAuto: true
        },
        actions: {
            shrink: true,
            flexBasisAuto: true
        }
    };

    actions = [
        {
            glyph: 'pool',
            callback: this.actionPoolCallback,
            label: 'Pool',
            notificationCount: 3,
            notificationLabel: 'Pool Count'
        },
        {
            glyph: 'bell',
            callback: this.actionNotificationCallback,
            label: 'Notifications',
            notificationCount: 12,
            notificationLabel: 'Unread Notifications'
        }
    ];

    productSwitcher: ProductSwitchItem[] = [
        {
            title: 'Home',
            subtitle: 'Central Home',
            icon: 'home',
            callback: () => this.productSwitcherCallback('Home '),
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

    constructor(private _messageToastService: MessageToastService) {}

    settingsCallback($event): void {
        console.log($event);
        alert('Settings Clicked');
    }

    signOutCallback($event): void {
        console.log($event);
        alert('Sign Out Clicked');
    }

    actionNotificationCallback($event): void {
        console.log($event);
        alert('Notification Action Clicked');
    }

    actionPoolCallback($event): void {
        console.log($event);
        alert('Pool Action Clicked');
    }

    productSwitcherCallback(product): void {
        alert(product + 'Product Clicked');
    }

    isOpenChange(isOpen: boolean): void {
        this.isOpen = isOpen;
    }

    onZoomGlyphClick(): void {
        alert('Edit profile');
    }

    actionPicked(action: string): void {
        this.openMessageToast(action);
        this.userMenuComponent.close();
    }

    openMessageToast(action: string): void {
        const content = `${action} action performed`;
        this._messageToastService.open(content, {
            duration: 5000
        });
    }
}
