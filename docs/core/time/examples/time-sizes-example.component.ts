import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-sizes-example',
    templateUrl: './time-sizes-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimeModule, ContentDensityDirective, FormsModule]
})
export class TimeSizesExampleComponent {
    timeCompact = new FdDate();
    timeTablet = new FdDate();
}
