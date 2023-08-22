import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { DatePipe } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { BarModule } from '@fundamental-ngx/core/bar';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { CalendarCloseButtonDirective } from '@fundamental-ngx/core/calendar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogModule } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-calendar-mobile-example',
    templateUrl: './calendar-mobile-example.component.html',
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
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DialogModule,
        TitleComponent,
        CalendarCloseButtonDirective,
        CdkScrollable,
        ScrollbarDirective,
        CalendarComponent,
        FormsModule,
        BarModule,
        ButtonModule,
        DatePipe
    ]
})
export class CalendarMobileExampleComponent {
    datePicked: FdDate = FdDate.getNow();

    constructor(private _dialogService: DialogService) {}

    openLandScapeDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(dialog, {
            mobile: true,
            responsivePadding: true,
            verticalPadding: false,
            width: '640px',
            height: '400px'
        });
    }

    openPortraitDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(dialog, {
            mobile: true,
            responsivePadding: true,
            verticalPadding: false,
            width: '360px',
            height: '640px'
        });
    }

    dateChanged(date: FdDate): void {
        this.datePicked = date;
    }

    noop(): void {}
}
