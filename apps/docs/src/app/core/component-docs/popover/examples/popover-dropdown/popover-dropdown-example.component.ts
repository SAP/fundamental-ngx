import { Component } from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const bottomStart = 'bottom-start';
const bottomEnd = 'bottom-end';
@Component({
    selector: 'fd-popover-dropdown-example',
    templateUrl: './popover-dropdown.component.html',
    styleUrls: ['./popover-dropdown.component.scss']
})
export class PopoverDropdownExampleComponent {
    dropDownPlacement$: Observable<string>;

    list = ['Option 1', 'Option 2', 'Option 3'];

    constructor(private _rtlService: RtlService) {
        this.dropDownPlacement$ = _rtlService.rtl.pipe(map((isRtl) => (isRtl ? bottomEnd : bottomStart)));
    }
}
