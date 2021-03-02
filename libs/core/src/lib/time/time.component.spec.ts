import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FdDate, FdDatetimeModule } from '../datetime';
import { PipeModule } from '../utils/pipes/pipe.module';
import { ButtonModule } from '../button/button.module';
import { TimeComponent } from './time.component';
import { Meridian } from './models';
import { TimeModule } from '../time/time.module';

describe('TimeComponent', () => {
    let component: TimeComponent<FdDate>;
    let fixture: ComponentFixture<TimeComponent<FdDate>>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, ButtonModule, PipeModule, FdDatetimeModule, TimeModule],
                declarations: [TimeComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent<TimeComponent<FdDate>>(TimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        const time = new FdDate().setTime(0, 0, 0);
        component.time = time;
        expect(component).toBeTruthy();
    });

    it('should construct hours view items', () => {
        expect(component.hourViewItems.length).toBe(24);
        expect(component.hourViewItems[0].value).toBe(0);
        expect(component.hourViewItems[23].value).toBe(23);
    });

    it('should construct minutes view items', () => {
        expect(component.minuteViewItems.length).toBe(60);
        expect(component.minuteViewItems[0].value).toBe(0);
        expect(component.minuteViewItems[59].value).toBe(59);
    });

    it('should construct seconds view items', () => {
        expect(component.secondViewItems.length).toBe(60);
        expect(component.secondViewItems[0].value).toBe(0);
        expect(component.secondViewItems[59].value).toBe(59);
    });

    it('should construct meridian view items', () => {
        expect(component.meridianViewItems.length).toBe(2);
        expect(component.meridianViewItems[0].value).toBe(Meridian.AM);
        expect(component.meridianViewItems[1].value).toBe(Meridian.PM);
    });

    it('should keep active view items up to date', () => {
        component.time = new FdDate().setTime(15, 30, 45);
        (<any>component)._setUpViewGrid();
        expect(component.activeHourViewItem.value).toBe(15);
        expect(component.activeMinuteViewItem.value).toBe(30);
        expect(component.activeSecondViewItem.value).toBe(45);
        expect(component.activeMeridianViewItem.value).toBe(Meridian.PM);
    });

    it('should set period after hour change', () => {
        component.meridian = true;
        component.handleHourChange(0);
        expect(component.activeMeridianViewItem.value).toBe(Meridian.AM);

        component.handleHourChange(12);
        expect(component.activeMeridianViewItem.value).toBe(Meridian.PM);
    });

    it('should set hour after period change', () => {
        component.handleHourChange(15);
        component.handleMeridianChange(Meridian.AM);
        expect(component.time.hour).toBe(3);

        component.handleHourChange(3);
        component.handleMeridianChange(Meridian.PM);
        expect(component.time.hour).toBe(15);
    });
});
