import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverComponent } from './popover.component';
import { PopoverModule } from './popover.module';

describe('PopoverComponent', () => {
    let component: PopoverComponent;
    let fixture: ComponentFixture<PopoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should open', () => {
        spyOn(component.isOpenChange, 'emit');
        component.isOpen = false;
        component.open();
        expect(component.isOpen).toBe(true);
        expect(component.isOpenChange.emit).toHaveBeenCalledWith(true);
    });

    it('should close', () => {
        spyOn(component.isOpenChange, 'emit');
        component.isOpen = true;
        component.close();
        expect(component.isOpen).toBe(false);
        expect(component.isOpenChange.emit).toHaveBeenCalledWith(false);
    });

    it('should toggle', () => {
        component.isOpen = true;
        component.toggle();
        expect(component.isOpen).toBe(false);

        component.toggle();
        expect(component.isOpen).toBe(true);
    });

    it ('should support Alt + ArrowDown event', () => {
        spyOn(component.isOpenChange, 'emit');

        const event: any = {
            key: 'ArrowDown',
            altKey: true
        };

        component.handleKeydown(event);
        expect(component.isOpen).toBe(true);
        expect(component.isOpenChange.emit).toHaveBeenCalledWith(true);
    });
});
