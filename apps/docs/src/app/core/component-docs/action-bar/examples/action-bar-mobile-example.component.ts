import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '@fundamental-ngx/core/menu';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'fd-action-bar-mobile-example',
    templateUrl: './action-bar-mobile-example.component.html'
})
export class ActionBarMobileExampleComponent implements OnInit {
    navigationArrow$: Observable<string>;

    @ViewChild('menu')
    menu: MenuComponent;

    constructor(private _rtlService: RtlService) {}

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }

    closeMenu(): void {
        this.menu.close();
    }
}
