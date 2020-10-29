import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-datetime-non-meridian-example',
    templateUrl: './datetime-non-meridian-example.component.html'
})
export class DatetimeNonMeridianExampleComponent {
    date = FdDate.getNow();
}
