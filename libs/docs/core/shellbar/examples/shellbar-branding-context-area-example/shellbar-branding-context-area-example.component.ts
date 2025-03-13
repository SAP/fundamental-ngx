import { Component } from '@angular/core';
import { ClickedDirective } from '@fundamental-ngx/cdk';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ProductSwitchItem, ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import {
    ShellbarMenuItem,
    ShellbarModule
} from '@fundamental-ngx/core/shellbar';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-shellbar-branding-context-area-example',
    templateUrl: './shellbar-branding-context-area-example.component.html',
    imports: [ToolbarModule, ShellbarModule, MenuModule, AvatarComponent, ClickedDirective, ButtonComponent, ProductSwitchModule]
})
export class ShellbarBrandingContextAreaExampleComponent {
    brandingClicked($event: Event): void {
        console.log($event);
        alert('Branding clicked');
    }
    settingsCallback($event: MouseEvent): void {
        console.log({ $event });
        alert('Settings Clicked');
    }

    signOutCallback($event: MouseEvent): void {
        console.log({ $event });
        alert('Sign Out Clicked');
    }

    productMenuItems: ShellbarMenuItem[] = [
        {
            name: 'Application A',
            callback: () => {
                alert('Application A Clicked');
            }
        },
        {
            name: 'Application B',
            callback: () => {
                alert('Application B Clicked');
            }
        },
        {
            name: 'Application C',
            callback: () => {
                alert('Application C Clicked');
            }
        },
        {
            name: 'Application D',
            callback: () => {
                alert('Application D Clicked');
            }
        }
    ];

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
}
