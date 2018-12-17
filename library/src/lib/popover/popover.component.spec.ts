import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverComponent } from './popover.component';
import { HashService } from '../utils/hash.service';

describe('PopoverComponent', () => {
    let component: PopoverComponent;
    let fixture: ComponentFixture<PopoverComponent>;
    let hashServiceSpy: jasmine.SpyObj<HashService>;

    beforeEach(async(() => {
        const hashSpy = jasmine.createSpyObj('HashService', {
            hash: '1'
        });

        TestBed.configureTestingModule({
            declarations: [PopoverComponent],
            providers: [{ provide: HashService, useValue: hashSpy }]
        }).compileComponents();

        hashServiceSpy = TestBed.get(HashService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        spyOn(component.popoverClosed, 'emit');
    });

    it('should create and get an ID from the hasher', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(hashServiceSpy.hash).toHaveBeenCalled();
        expect(component.id).toBe('1');
    });

    it('should handle escape keydown if popover is open', () => {
        component.isOpen = true;

        const keyDownEvent = new KeyboardEvent('keydown', {
            key: 'escape'
        });
        document.dispatchEvent(keyDownEvent);

        expect(component.isOpen).toBe(false);
        expect(component.popoverClosed.emit).toHaveBeenCalled();
    });

    it('should handle document click for open, !isTimePicker popover', () => {
        component.isOpen = true;
        fixture.nativeElement.querySelector('.fd-popover').click();

        expect(component.popoverClosed.emit).toHaveBeenCalled();
        expect(component.isOpen).toBe(false);
    });

    it('should handle document click for open, isTimePicker popover', () => {
        component.isOpen = true;
        component.isTimePicker = true;
        fixture.nativeElement.querySelector('.fd-popover').click();

        expect(component.popoverClosed.emit).not.toHaveBeenCalled();
    });
});
