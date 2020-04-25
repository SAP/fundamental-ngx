import { Component, ViewEncapsulation } from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';
import { Observable } from 'rxjs';
import { Placement } from 'popper.js';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-popover-example',
    templateUrl: './popover-example.component.html',
    styleUrls: ['popover-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PopoverExampleComponent {
    leftPlacement$: Observable<Placement>;
    rightPlacement$: Observable<Placement>;

    constructor(private _rtlService: RtlService) {
        this.leftPlacement$ = this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'right' : 'left')));
        this.rightPlacement$ = this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'left' : 'right')));
    }

    menu1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];

    menu2 = [
        { text: 'Option 3', url: '#' },
        { text: 'Option 4', url: '#' },
        { text: 'Option 5', url: '#' }
    ];
}
