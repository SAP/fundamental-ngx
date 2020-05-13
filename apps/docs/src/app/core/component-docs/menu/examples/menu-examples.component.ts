import { Component, TemplateRef } from '@angular/core';
import { DialogService, RtlService } from '@fundamental-ngx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-menu-example',
    templateUrl: './menu-example.component.html'
})
export class MenuExampleComponent {}

@Component({
    selector: 'fd-menu-separator-example',
    templateUrl: './menu-separator-example.component.html'
})
export class MenuSeparatorExampleComponent {}

@Component({
    selector: 'fd-menu-mobile-example',
    templateUrl: './menu-mobile-example.component.html'
})
export class MenuMobileExampleComponent {

    constructor(private _dialogService: DialogService) {
    }

    openDialog(dialogTemplate: TemplateRef<any>): void {
        this._dialogService.open(dialogTemplate, {
            mobile: true,
            verticalPadding: false
        })
    }

}

@Component({
    selector: 'fd-menu-with-submenu-example',
    templateUrl: './menu-with-submenu-example.component.html'
})
export class MenuWithSubmenuExampleComponent {
}
