import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-12-example',
    templateUrl: './time-12-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimeModule, ContentDensityDirective, FormsModule]
})
export class Time12ExampleComponent {
    timeMeridian = new FdDate().setTime(9, 0, 0);
}
