import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectableViewItem } from '../models';
import { TimeModule } from '../time.module';
import { TimeColumnComponent } from './time-column.component';

describe('TimeColumnComponent', () => {
    let component: TimeColumnComponent<unknown>;
    let fixture: ComponentFixture<TimeColumnComponent<unknown>>;
    const rows: SelectableViewItem<number>[] = Array.from(new Array(10)).map((_, index) => ({
        value: index + 1,
        label: (index + 1).toLocaleString()
    }));

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TimeModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeColumnComponent);
        component = fixture.componentInstance;

        component.rows = rows;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call pick time method with on active change', () => {
        spyOn(<any>component, '_pickTime');

        (<any>component)._initialised = true;

        component.activeValue = rows[2];
        fixture.detectChanges();

        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[2], false);
    });

    it('should call pick time method with scrollUp', () => {
        component.activeValue = rows[2];

        spyOn(<any>component, '_pickTime');

        component.scrollUp();
        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[1], true, true, false);
    });

    it('should call pick time method with scrollUp, when beginning is approached', () => {
        component.activeValue = rows[0];

        spyOn(<any>component, '_pickTime');

        component.scrollUp();
        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[9], true, true, false);
    });

    it('should call pick time method with scrollDown', () => {
        component.activeValue = rows[2];

        spyOn(<any>component, '_pickTime');

        component.scrollDown();
        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[3], true, true, true);
    });

    it('should call pick time method with scrollDown, when end is approached', () => {
        component.activeValue = rows[9];

        spyOn(<any>component, '_pickTime');

        component.scrollDown();
        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[0], true, true, true);
    });

    it('should handle change from carousel, change values and emit event', () => {
        const item = component.items.toArray()[3];
        const offsetItem = component.items.toArray()[3 + component.offset];

        spyOn(component.activeValueChange, 'emit');
        component.activeChangedHandle({
            item,
            after: false
        });

        fixture.detectChanges();
        expect((<any>component)._activeValue).toBe(offsetItem.value);
        expect((<any>component)._activeCarouselItem).toBe(offsetItem);
        expect(component.activeValueChange.emit).toHaveBeenCalledWith({
            value: offsetItem.value,
            after: false
        });
    });

    it('should handle change from carousel, change values and emit event on meridian, without offset', () => {
        component.meridian = true;
        component.offset = 0;

        const item = component.items.toArray()[3];

        spyOn(component.activeValueChange, 'emit');
        component.activeChangedHandle({
            item,
            after: false
        });

        fixture.detectChanges();
        expect((<any>component)._activeValue).toBe(item.value);
        expect((<any>component)._activeCarouselItem).toBe(item);
        expect(component.activeValueChange.emit).toHaveBeenCalledWith({
            value: item.value,
            after: false
        });
    });
});
