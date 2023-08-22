import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { FormsModule } from '@angular/forms';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-datetime-mobile-example',
    templateUrl: './datetime-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ],
    standalone: true,
    imports: [FormLabelModule, DatetimePickerComponent, FormsModule]
})
export class DatetimeMobileExampleComponent {
    mobileLandscapeConfig: MobileModeConfig = {
        title: 'Choose date',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Choose date',
            width: '640px',
            height: '360px'
        }
    };

    mobilePortraitConfig: MobileModeConfig = {
        title: 'Choose date',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Choose date',
            width: '320px',
            height: '640px',
            disablePaddings: false
        }
    };
    date1 = FdDate.getNow();
    date2 = FdDate.getNow();
}
