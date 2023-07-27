import { Component } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core';
import { ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core/shellbar';

@Component({
    selector: 'fd-list-example',
    templateUrl: './list-example.component.html'
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
    templateUrl: './list-secondary-example.component.html'
})
export class ListSecondaryExampleComponent {}

@Component({
    selector: 'fd-list-icon-example',
    templateUrl: './list-icon-example.component.html'
})
export class ListIconExampleComponent {}

@Component({
    selector: 'fd-list-complex-example',
    templateUrl: './list-complex-example.component.html'
})
export class ListComplexExampleComponent {}
