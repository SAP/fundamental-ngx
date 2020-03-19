import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RtlService } from '@fundamental-ngx/core';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-action-bar-mobile-example',
    templateUrl: './action-bar-mobile-example.component.html'
})
export class ActionBarMobileExampleComponent implements OnInit {

    navigationArrow$: Observable<string>;

    constructor(private _rtlService: RtlService) {}

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(map(isRtl => isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'));
    }
}
