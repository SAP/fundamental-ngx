import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '@fundamental-ngx/core/menu';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AsyncPipe } from '@angular/common';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuModule } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-action-bar-mobile-example',
    templateUrl: './action-bar-mobile-example.component.html',
    imports: [ActionBarModule, ButtonComponent, MenuModule, AsyncPipe]
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
