import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverComponent } from './popover.component';
import { HashService } from '../utils/hash.service';
import { PopoverModule } from './popover.module';

describe('PopoverComponent', () => {
    let component: PopoverComponent;
    let fixture: ComponentFixture<PopoverComponent>;
    let hashServiceSpy: jasmine.SpyObj<HashService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule]
        }).compileComponents();

        hashServiceSpy = TestBed.get(HashService);
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
});
