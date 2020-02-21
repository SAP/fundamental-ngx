import { Component } from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';
import { BehaviorSubject } from 'rxjs';

const bottomStart = 'bottom-start';
const bottomEnd = 'bottom-end';
@Component({
  selector: 'fd-popover-dropdown-example',
  templateUrl: './popover-dropdown.component.html',
  styleUrls: ['./popover-dropdown.component.scss']
})
export class PopoverDropdownExampleComponent {

  dropDownPlacement$: BehaviorSubject<string> = new BehaviorSubject(bottomStart);

  menu = [
    'Option 1',
    'Option 2',
    'Option 3',
  ];

  constructor(private rtlService: RtlService) {
    rtlService.rtl.subscribe(isRtl => this.dropDownPlacement$.next(isRtl ? bottomEnd : bottomStart))
  }
}
