import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    GenericTagComponent,
    IconComponent,
    ObjectStatusComponent
} from '@fundamental-ngx/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ProductSwitchItem, ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import {
    ProductMenuComponent,
    ShellbarActionComponent,
    ShellbarActionsComponent,
    ShellbarComponent,
    ShellbarContextAreaComponent,
    ShellbarLogoComponent,
    ShellbarMenuItem,
    ShellbarSeparatorComponent,
    ShellbarSizes,
    ShellbarSpacerComponent,
    ShellbarSubtitleComponent,
    ShellbarTitleComponent,
    ShellbarUser,
    ShellbarUserMenu
} from '@fundamental-ngx/core/shellbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { PlatformSearchFieldModule, SearchInput, ValueLabelItem } from '@fundamental-ngx/platform/search-field';

@Component({
    selector: 'fd-shellbar-branding-context-area-example',
    templateUrl: './shellbar-branding-context-area-example.component.html',
    standalone: true,
    imports: [
        SegmentedButtonModule,
        FormsModule,
        ButtonComponent,
        ShellbarComponent,
        ShellbarLogoComponent,
        ProductMenuComponent,
        ShellbarSubtitleComponent,
        PlatformSearchFieldModule,
        ContentDensityDirective,
        ShellbarActionsComponent,
        ShellbarActionComponent,
        ProductSwitchModule,
        ShellbarTitleComponent,
        ShellbarContextAreaComponent,
        ShellbarSeparatorComponent,
        ShellbarSpacerComponent,
        GenericTagComponent,
        ObjectStatusComponent,
        FdTranslatePipe,
        IconComponent
    ]
})
export class ShellbarBrandingContextAreaExampleComponent {
    currentSize: ShellbarSizes = 'xl';

    showSearch = true;

    sizesWidth = {
        s: 320,
        m: 720,
        l: 1024,
        xl: 1900
    };

    searchTerm = '';

    inputText = '';

    productMenuControl = 'Portal';

    categories: ValueLabelItem[] = [
        {
            value: 'red',
            label: 'Red'
        },
        {
            value: 'orange',
            label: 'Orange'
        },
        {
            value: 'yellow',
            label: 'Yellow'
        },
        {
            value: 'green',
            label: 'Green'
        },
        {
            value: 'blue',
            label: 'Blue'
        },
        {
            value: 'indigo',
            label: 'Indigo'
        },
        {
            value: 'violet',
            label: 'Violet'
        }
    ];

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

    user: ShellbarUser = {
        fullName: 'William Willson',
        colorAccent: 1
    };

    userMenu: ShellbarUserMenu[] = [
        { text: 'Settings', callback: this.settingsCallback },
        { text: 'Sign Out', callback: this.signOutCallback }
    ];

    actions = [
        {
            glyph: 'da',
            callback: this.actionJouleAssistantCallback,
            label: 'Joule Digital Assistant',
            notificationCount: 0,
            notificationLabel: 'Joule Digital Assistant'
        },
        {
            glyph: 'bell',
            callback: this.actionNotificationCallback,
            label: 'Notifications',
            notificationCount: 72,
            notificationLabel: 'Unread Notifications'
        },
        {
            glyph: 'feedback',
            callback: this.actionFeedbackCallback,
            label: 'Feedback',
            notificationCount: 15,
            notificationLabel: 'User Feedback'
        },
        {
            glyph: 'sys-help',
            callback: this.actionHelpCallback,
            label: 'Help',
            notificationCount: 0,
            notificationLabel: 'Help Center'
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

    settingsCallback($event): void {
        console.log($event);
        alert('Settings Clicked');
    }

    signOutCallback($event): void {
        console.log($event);
        alert('Sign Out Clicked');
    }

    actionJouleAssistantCallback($event): void {
        console.log($event);
        alert('Joule Digital Assistant Clicked');
    }

    actionNotificationCallback($event): void {
        console.log($event);
        alert('Notification Action Clicked');
    }

    actionFeedbackCallback($event): void {
        console.log($event);
        alert('Feedback Clicked');
    }

    actionHelpCallback($event): void {
        console.log($event);
        alert('Help Center Clicked');
    }

    productSwitcherCallback(product): void {
        alert(product + 'Product Clicked');
    }

    brandingCallback($event): void {
        console.log($event);
        alert('Branding Clicked');
    }

    onSearchSubmit($event: SearchInput): void {
        this.searchTerm = $event.text;
    }

    onInputChange($event: SearchInput): void {
        this.inputText = $event.text;
    }
}
