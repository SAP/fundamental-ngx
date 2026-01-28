import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ProductSwitchItem, ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import {
    ProductMenuComponent,
    ShellbarActionComponent,
    ShellbarActionsComponent,
    ShellbarComponent,
    ShellbarLogoComponent,
    ShellbarMenuItem,
    ShellbarSizes
} from '@fundamental-ngx/core/shellbar';
import {
    UserMenuBodyComponent,
    UserMenuComponent,
    UserMenuContentContainerComponent,
    UserMenuControlComponent,
    UserMenuFooterComponent,
    UserMenuHeaderContainerDirective,
    UserMenuHeaderDirective,
    UserMenuListComponent,
    UserMenuListItemComponent,
    UserMenuSublineDirective,
    UserMenuSublistComponent,
    UserMenuUserNameDirective
} from '@fundamental-ngx/core/user-menu';
import {
    PlatformSearchFieldModule,
    SearchInput,
    SuggestionItem,
    ValueLabelItem
} from '@fundamental-ngx/platform/search-field';

@Component({
    selector: 'fd-shellbar-collapsible-example',
    templateUrl: './shellbar-collapsible-example.component.html',
    imports: [
        SegmentedButtonModule,
        FormsModule,
        ButtonComponent,
        ShellbarComponent,
        ShellbarLogoComponent,
        ProductMenuComponent,
        PlatformSearchFieldModule,
        ContentDensityDirective,
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
export class ShellbarCollapsibleExampleComponent {
    @ViewChild(UserMenuComponent)
    userMenuComponent: UserMenuComponent;

    expanded = true;

    isOpen = false;

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

    productMenuControl = 'Corporate Portal';

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

    suggestions: SuggestionItem[] = [
        {
            value: 'Apple'
        },
        {
            value: 'Banana'
        },
        {
            value: 'Blueberry'
        },
        {
            value: 'Cherry'
        },
        {
            value: 'Grape'
        },
        {
            value: 'Lemon'
        },
        {
            value: 'Lime'
        },
        {
            value: 'Orange'
        },
        {
            value: 'Peach'
        },
        {
            value: 'Pineapple'
        },
        {
            value: 'Plum'
        },
        {
            value: 'Raspberry'
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

    actions = [
        {
            glyph: 'pool',
            callback: this.actionPoolCallback,
            label: 'Pool',
            ariaLabel: 'Pool',
            title: 'Pool',
            notificationCount: 3,
            notificationLabel: 'Pool Count'
        },
        {
            glyph: 'bell',
            callback: this.actionNotificationCallback,
            label: 'Notifications',
            ariaLabel: 'Notifications',
            title: 'User Notifications',
            notificationCount: 12,
            notificationLabel: 'Unread Notifications'
        }
    ];

    searchTerms = ['Apple', 'Banana', 'Kiwi', 'Strawberry'];

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

    onSearchSubmit($event: SearchInput): void {
        this.searchTerm = $event.text;
    }

    onInputChange($event: SearchInput): void {
        this.inputText = $event.text;
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
