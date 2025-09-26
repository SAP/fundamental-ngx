import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickedDirective } from '@fundamental-ngx/cdk';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ProductSwitchItem, ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import {
    ShellbarComponent,
    ShellbarMenuItem,
    ShellbarModule,
    ShellbarUser,
    ShellbarUserMenu
} from '@fundamental-ngx/core/shellbar';
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
import {
    SearchFieldComponent,
    SearchInput,
    SuggestionItem,
    ValueLabelItem
} from '@fundamental-ngx/platform/search-field';

@Component({
    selector: 'fd-shellbar-branding-context-area-example',
    templateUrl: './shellbar-branding-context-area-example.component.html',
    imports: [
        ShellbarModule,
        MenuModule,
        AvatarComponent,
        ClickedDirective,
        ButtonComponent,
        FormsModule,
        ProductSwitchModule,
        SearchFieldComponent,
        SegmentedButtonComponent,
        ObjectStatusComponent,
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
        PopoverModule,
        ListModule,
        PanelModule,
        BarComponent,
        BarRightDirective,
        MessageToastModule
    ]
})
export class ShellbarBrandingContextAreaExampleComponent {
    @ViewChild(UserMenuComponent)
    userMenuComponent: UserMenuComponent;

    @ViewChild(ShellbarComponent, { read: ElementRef })
    shellbar: ElementRef;

    expanded = true;

    isOpen = false;

    searchTerm = '';

    inputText = '';

    showButtonWithPriority3 = true;

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

    searchTerms = ['Apple', 'Banana', 'Kiwi', 'Strawberry'];

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
            callback: () => this.productSwitcherCallback('Home'),
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

    user: ShellbarUser = {
        fullName: 'William Willson',
        colorAccent: 6
    };

    userMenu: ShellbarUserMenu[] = [
        { text: 'Settings', callback: this.settingsCallback },
        { text: 'Sign Out', callback: this.signOutCallback }
    ];

    constructor(private _messageToastService: MessageToastService) {}

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

    assistiveToolsCallback(): void {
        alert('Assistive Tools Clicked');
    }

    navClicked(event): void {
        console.log(event);
        alert('Navigation Button Clicked');
    }

    backClicked(event): void {
        console.log(event);
        alert('Back Button Clicked');
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

    toggleButton3(): void {
        this.showButtonWithPriority3 = !this.showButtonWithPriority3;
    }
}
