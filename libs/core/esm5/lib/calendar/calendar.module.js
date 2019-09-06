/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarDayViewComponent } from './calendar-views/calendar-day-view/calendar-day-view.component';
import { CalendarMonthViewComponent } from './calendar-views/calendar-month-view/calendar-month-view.component';
import { CalendarYearViewComponent } from './calendar-views/calendar-year-view/calendar-year-view.component';
import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CalendarComponent, CalendarHeaderComponent,
                        CalendarDayViewComponent, CalendarMonthViewComponent, CalendarYearViewComponent],
                    imports: [CommonModule, IconModule],
                    exports: [CalendarComponent, CalendarDayViewComponent,
                        CalendarHeaderComponent, CalendarYearViewComponent, CalendarMonthViewComponent],
                    providers: [CalendarService]
                },] }
    ];
    return CalendarModule;
}());
export { CalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWpELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzFHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ2hILE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RDtJQUFBO0lBUTZCLENBQUM7O2dCQVI3QixRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsdUJBQXVCO3dCQUNyRCx3QkFBd0IsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsQ0FBQztvQkFDcEYsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDbkMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsd0JBQXdCO3dCQUNqRCx1QkFBdUIsRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQztvQkFDbkYsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUMvQjs7SUFDNEIscUJBQUM7Q0FBQSxBQVI5QixJQVE4QjtTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5cbmltcG9ydCB7IENhbGVuZGFySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckRheVZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXZpZXdzL2NhbGVuZGFyLWRheS12aWV3L2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItdmlld3MvY2FsZW5kYXItbW9udGgtdmlldy9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhclllYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci12aWV3cy9jYWxlbmRhci15ZWFyLXZpZXcvY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tICcuL2NhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbQ2FsZW5kYXJDb21wb25lbnQsIENhbGVuZGFySGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBDYWxlbmRhckRheVZpZXdDb21wb25lbnQsIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50LCBDYWxlbmRhclllYXJWaWV3Q29tcG9uZW50XSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJY29uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ2FsZW5kYXJDb21wb25lbnQsIENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCxcbiAgICAgICAgQ2FsZW5kYXJIZWFkZXJDb21wb25lbnQsIENhbGVuZGFyWWVhclZpZXdDb21wb25lbnQsIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtDYWxlbmRhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9kdWxlIHt9XG4iXX0=