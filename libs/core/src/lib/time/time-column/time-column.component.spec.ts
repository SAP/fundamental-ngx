import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeColumnComponent } from './time-column.component';
import { TwoDigitsPipe } from '../../utils/pipes/two-digits.pipe';
import { CarouselModule } from '../../utils/directives/carousel/carousel.module';

describe('TimeColumnComponent', () => {
    let component: TimeColumnComponent;
    let fixture: ComponentFixture<TimeColumnComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CarouselModule],
            declarations: [TimeColumnComponent, TwoDigitsPipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeColumnComponent);
        component = fixture.componentInstance;

        component.rows = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call pick time method with on active change', () => {
        spyOn(<any>component, '_pickTime');

        (<any>component)._initialised = true;

        component.activeItem = 3;
        fixture.detectChanges();

        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[2], true);

    });

    it('should call pick time method with scrollUp', () => {

        component.activeItem = 3;

        spyOn(<any>component, '_pickTime');

        component.scrollUp();
        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[1], true, true);

    });

    it('should call pick time method with scrollUp, when beginning is approached', () => {

        component.activeItem = 1;

        spyOn(<any>component, '_pickTime');

        component.scrollUp();
        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[9], true, true);

    });

    it('should call pick time method with scrollDown', () => {

        component.activeItem = 3;

        spyOn(<any>component, '_pickTime');

        component.scrollDown();
        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[3], true, true);

    });

    it('should call pick time method with scrollDown, when end is approached', () => {

        component.activeItem = 10;

        spyOn(<any>component, '_pickTime');

        component.scrollDown();
        expect((<any>component)._pickTime).toHaveBeenCalledWith(component.items.toArray()[0], true, true);

    });

    it('should handle change from carousel, change values and emit event', () => {

        const item = component.items.toArray()[3];
        const offsetItem = component.items.toArray()[3 + component.offset];

        spyOn(component.activeItemChange, 'emit');
        component.activeChangedHandle(item);

        fixture.detectChanges();
        expect((<any>component)._activeItem).toBe(offsetItem.value);
        expect((<any>component)._activeCarouselItem).toBe(offsetItem);
        expect(component.activeItemChange.emit).toHaveBeenCalledWith(offsetItem.value);

    });

    it('should handle change from carousel, change values and emit event on meridian, without offset', () => {

        component.meridian = true;
        component.offset = 0;

        const item = component.items.toArray()[3];

        spyOn(component.activeItemChange, 'emit');
        component.activeChangedHandle(item);

        fixture.detectChanges();
        expect((<any>component)._activeItem).toBe(item.value);
        expect((<any>component)._activeCarouselItem).toBe(item);
        expect(component.activeItemChange.emit).toHaveBeenCalledWith(item.value);

    });
});
