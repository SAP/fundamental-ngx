import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-bar-page-responsive-example',
    templateUrl: './bar-page-responsive-example.component.html',
    standalone: true,
    imports: [BarModule, AvatarComponent, AsyncPipe]
})
export class BarPageResponsiveExampleComponent implements OnInit {
    navigationArrow$: Observable<string>;

    constructor(private _rtlService: RtlService) {}

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }
}
