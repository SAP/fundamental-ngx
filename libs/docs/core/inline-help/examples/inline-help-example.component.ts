import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { Placement } from '@fundamental-ngx/core/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-inline-help-example',
    templateUrl: './inline-help-example.component.html',
    styles: [
        `
            .fd-inline-help-example > input {
                max-width: 300px;
            }

            .fd-inline-help-example {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `
    ],
    imports: [IconComponent, InlineHelpModule, FormControlComponent, AsyncPipe]
})
export class InlineHelpExampleComponent {
    rtlDirection$: Observable<Placement>;

    constructor(private _rtlService: RtlService) {
        this.rtlDirection$ = this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'left' : 'right')));
    }
}
