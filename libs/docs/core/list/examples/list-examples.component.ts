import { Component } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core';
import { ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core/shellbar';
import { ListSecondaryDirective } from '@fundamental-ngx/core/list';
import { NgClass } from '@angular/common';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent as PopoverComponent_1 } from '@fundamental-ngx/core/popover';
import { ShellbarActionComponent } from '@fundamental-ngx/core/shellbar';
import { PopoverTriggerDirective } from '@fundamental-ngx/core/popover';
import { ShellbarUserMenuComponent } from '@fundamental-ngx/core/shellbar';
import { ShellbarActionsComponent } from '@fundamental-ngx/core/shellbar';
import { ShellbarTitleComponent } from '@fundamental-ngx/core/shellbar';
import { ShellbarLogoComponent } from '@fundamental-ngx/core/shellbar';
import { ShellbarComponent } from '@fundamental-ngx/core/shellbar';

@Component({
    selector: 'fd-list-example',
    templateUrl: './list-example.component.html',
    standalone: true,
    imports: [
        ShellbarComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarActionsComponent,
        ShellbarUserMenuComponent,
        PopoverTriggerDirective,
        ShellbarActionComponent,
        PopoverComponent_1,
        PopoverBodyComponent,
        ListModule
    ]
})
export class ListExampleComponent {
    user: ShellbarUser = {
        fullName: 'William Willson',
        colorAccent: 6
    };

    userMenu: ShellbarUserMenu[] = [
        { text: 'Settings', callback: this.settingsCallback },
        { text: 'Sign Out', callback: this.signOutCallback }
    ];

    togglePopover(popover: PopoverComponent, event: Event): void {
        event.stopImmediatePropagation();
        popover.toggle();
    }

    settingsCallback(): void {
        alert('Settings Clicked');
    }

    signOutCallback(): void {
        alert('Sign Out Clicked');
    }
    onClick(event, msg: String): void {
        console.log(event);
        alert(msg);
    }
}

@Component({
    selector: 'fd-list-secondary-example',
    templateUrl: './list-secondary-example.component.html',
    standalone: true,
    imports: [ListModule, NgClass, ListSecondaryDirective]
})
export class ListSecondaryExampleComponent {}

@Component({
    selector: 'fd-list-icon-example',
    templateUrl: './list-icon-example.component.html',
    standalone: true,
    imports: [ListModule]
})
export class ListIconExampleComponent {}

@Component({
    selector: 'fd-list-complex-example',
    templateUrl: './list-complex-example.component.html',
    standalone: true,
    imports: [ListModule]
})
export class ListComplexExampleComponent {}
