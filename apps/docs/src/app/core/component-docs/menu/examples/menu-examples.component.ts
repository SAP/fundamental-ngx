import { Component } from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';
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
    submenuIcon$: Observable<string>;

    constructor(private _rtlService: RtlService) {
        this.submenuIcon$ = this._rtlService.rtl.pipe(map(isRtl => isRtl ? 'navigation-left-arrow' : 'navigation-right-arrow'))
    }
}

@Component({
    selector: 'fd-menu-with-submenu-example',
    templateUrl: './menu-with-submenu-example.component.html'
})
export class MenuWithSubmenuExampleComponent {

    submenuIcon$: Observable<string>;

    constructor(private _rtlService: RtlService) {
        this.submenuIcon$ = this._rtlService.rtl.pipe(map(isRtl => isRtl ? 'navigation-left-arrow' : 'navigation-right-arrow'))
    }
}
