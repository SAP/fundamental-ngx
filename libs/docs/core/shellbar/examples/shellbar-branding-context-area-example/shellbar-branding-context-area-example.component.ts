import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickedDirective } from '@fundamental-ngx/cdk';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent, ButtonType } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ProductSwitchItem, ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
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

    accountToggledState = signal<boolean>(true);
    filterToggledState = signal<boolean>(false);
    cartToggledState = signal<boolean>(false);

    actions = [
        {
            glyph: 'account',
            callback: () => this.actionAccountCallback(),
            label: 'Account',
            ariaLabel: 'Account Action',
            title: 'Account',
            type: 'transparent' as ButtonType,
            toggled: this.accountToggledState
        },
        {
            glyph: 'filter',
            callback: () => this.actionFilterCallback(),
            label: 'Filter',
            ariaLabel: 'Filter Action',
            title: 'Filter',
            type: 'attention' as ButtonType,
            toggled: this.filterToggledState
        },
        {
            glyph: 'cart',
            callback: () => this.actionCartCallback(),
            label: 'Cart',
            ariaLabel: 'Cart Action',
            type: 'positive' as ButtonType,
            title: 'Cart',
            toggled: this.cartToggledState
        },
        {
            glyph: 'bell',
            callback: (event: MouseEvent) => this.actionNotificationCallback(event),
            label: 'Notifications',
            ariaLabel: 'Notifications Action',
            title: 'Notifications',
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

    actionAccountCallback(): void {
        this.accountToggledState.set(!this.accountToggledState());
    }

    actionFilterCallback(): void {
        this.filterToggledState.set(!this.filterToggledState());
    }

    actionCartCallback(): void {
        this.cartToggledState.set(!this.cartToggledState());
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

    itemVisibilityChanged(event: any): void {
        console.log(event);
    }
}
