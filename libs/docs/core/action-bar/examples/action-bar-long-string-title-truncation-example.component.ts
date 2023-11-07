import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-action-bar-long-string-title-truncation-example',
    templateUrl: './action-bar-long-string-title-truncation-example.component.html',
    standalone: true,
    imports: [ActionBarModule, ButtonComponent, AsyncPipe]
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
