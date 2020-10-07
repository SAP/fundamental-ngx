import { Component, ViewEncapsulation } from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';
import { Observable } from 'rxjs';
import { Placement } from 'popper.js';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-action-sheet-cosy-example',
    templateUrl: './action-sheet-cosy-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ActionSheetCosyExampleComponent {
    leftPlacement$: Observable<Placement>;
    rightPlacement$: Observable<Placement>;

    constructor(private _rtlService: RtlService) {
        this.leftPlacement$ = this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'right' : 'left')));
        this.rightPlacement$ = this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'left' : 'right')));
    }

    list1 = [
        { text: 'Option 1', glyph: '#' },
        { text: 'Option 2', glyph: '#' },
        { text: 'Option 3', glyph: '#' }
    ];
}
