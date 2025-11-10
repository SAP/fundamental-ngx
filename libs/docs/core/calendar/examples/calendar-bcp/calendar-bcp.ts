import {
    Component,
    ComponentRef,
    computed,
    effect,
    inject,
    Injector,
    LOCALE_ID,
    OnDestroy,
    ViewContainerRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { LocaleService } from './locale.service';

@Component({
    selector: 'fd-calendar-bcp',
    imports: [FdDatetimeModule, SegmentedButtonComponent, ButtonComponent, FocusableItemDirective, FormsModule],
    templateUrl: './calendar-bcp.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class CalendarBcp implements OnDestroy {
    // Sample date for the calendar
    date: FdDate = new FdDate(2024, 11, 9);

    readonly localeService = inject(LocaleService);

    // Selected locale for segmented button
    selectedLocale = this.localeService.getLocale();

    // Computed property to get current locale - reactive and type-safe
    readonly currentLocale = computed(() => this.localeService.currentLocale());

    // Available locales for UI
    readonly availableLocales = this.localeService.availableLocales;

    private readonly viewContainer = inject(ViewContainerRef);
    private readonly injector = inject(Injector);

    private calendarRef: ComponentRef<CalendarComponent<FdDate>> | null = null;

    constructor() {
        // Create initial calendar
        setTimeout(() => this.createCalendarWithLocale(), 0);

        // Watch for locale changes and recreate calendar - Angular 20 way
        effect(() => {
            const currentLocale = this.localeService.currentLocale();
            console.log('Locale changed to:', currentLocale);

            // Recreate calendar when locale changes (skip initial creation)
            if (this.calendarRef) {
                this.recreateCalendar();
            }
        });
    }

    ngOnDestroy(): void {
        this.destroyCalendar();
    }

    // Method to change locale
    changeLocale(locale: string): void {
        console.log('Changing locale to:', locale);
        this.selectedLocale = locale;
        this.localeService.setLocale(locale);
    }

    private createCalendarWithLocale(): void {
        const currentLocale = this.localeService.getLocale();

        // Get locale-specific configuration
        // const localeConfig = this.getLocaleConfig(currentLocale);

        // Create injector with locale-specific providers
        const localeInjector = Injector.create({
            providers: [
                {
                    provide: LOCALE_ID,
                    useValue: currentLocale
                },
                // patchLanguage(localeConfig),
                {
                    provide: DatetimeAdapter,
                    useClass: FdDatetimeAdapter
                },
                {
                    provide: DATE_TIME_FORMATS,
                    useValue: FD_DATETIME_FORMATS
                }
            ],
            parent: this.injector
        });

        // Create the calendar component with the locale-specific injector
        this.calendarRef = this.viewContainer.createComponent(CalendarComponent<FdDate>, {
            injector: localeInjector
        });

        // Bind the date to the calendar
        if (this.calendarRef) {
            this.calendarRef.instance.selectedDate = this.date;

            // Listen to date changes
            this.calendarRef.instance.selectedDateChange.subscribe((newDate) => {
                if (newDate) {
                    this.date = newDate;
                }
            });
        }

        console.log('Calendar created with locale:', currentLocale);
    }

    private recreateCalendar(): void {
        this.destroyCalendar();
        this.createCalendarWithLocale();
    }

    private destroyCalendar(): void {
        if (this.calendarRef) {
            this.calendarRef.destroy();
            this.calendarRef = null;
        }
        this.viewContainer.clear();
    }

    //   private getLocaleConfig(locale: string): any {
    //     const configs = {
    //       'zh-Hans-CN-u-ca-chinese': {
    //         coreCalendar: {
    //           yearSelectionLabel: '選擇年份',
    //           yearsRangeSelectionLabel: '選擇年份範圍',
    //           monthSelectionLabel: '選擇月份',
    //           dateSelectionLabel: '選擇日期',
    //           previousYearLabel: '前一年',
    //           nextYearLabel: '下一年',
    //           previousMonthLabel: '前一個月',
    //           nextMonthLabel: '下一個月',
    //           weekColumnLabel: '週',
    //           dateSelectedLabel: '已選擇的日期',
    //           todayLabel: '今天',
    //           rangeStartLabel: '範圍開始',
    //           rangeEndLabel: '範圍結束',
    //           dayInPastLabel: '過去的日子',
    //           closeCalendarLabel: '關閉日曆'
    //         }
    //       },
    //       'en-US': {
    //         coreCalendar: {
    //           yearSelectionLabel: 'Year selection',
    //           yearsRangeSelectionLabel: 'Years range selection',
    //           monthSelectionLabel: 'Month selection',
    //           dateSelectionLabel: 'Date selection',
    //           previousYearLabel: 'Previous year',
    //           nextYearLabel: 'Next year',
    //           previousMonthLabel: 'Previous month',
    //           nextMonthLabel: 'Next month',
    //           weekColumnLabel: 'Week column',
    //           dateSelectedLabel: 'Selected date',
    //           todayLabel: 'Today',
    //           rangeStartLabel: 'Range start',
    //           rangeEndLabel: 'Range end',
    //           dayInPastLabel: 'Day in past',
    //           closeCalendarLabel: 'Close calendar'
    //         }
    //       }
    //     };

    //     return configs[locale as keyof typeof configs] || configs['en-US'];
    //   }
}
