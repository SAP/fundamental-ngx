import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';

@Component({
    selector: 'fd-bar-page-example',
    templateUrl: './bar-page-example.component.html',
    standalone: true,
    imports: [BarModule, AvatarModule, AsyncPipe]
})
export class BarPageExampleComponent implements OnInit {
    navigationArrow$: Observable<string>;

    constructor(private _rtlService: RtlService) {}

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }
}
