import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';

@Component({
    selector: 'fd-action-bar-long-string-title-truncation-example',
    templateUrl: './action-bar-long-string-title-truncation-example.component.html',
    standalone: true,
    imports: [ActionBarModule, ButtonModule, AsyncPipe]
})
export class ActionBarLongStringTitleTruncationExampleComponent implements OnInit {
    navigationArrow$: Observable<string>;

    constructor(private _rtlService: RtlService) {}

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }
}
