import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { map } from 'rxjs/operators';
import { Placement } from '@fundamental-ngx/core/shared';
import { AsyncPipe } from '@angular/common';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { IconModule } from '@fundamental-ngx/core/icon';

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
    standalone: true,
    imports: [IconModule, InlineHelpModule, FormControlModule, AsyncPipe]
})
export class InlineHelpExampleComponent {
    rtlDirection$: Observable<Placement>;

    constructor(private _rtlService: RtlService) {
        this.rtlDirection$ = this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'left' : 'right')));
    }
}
