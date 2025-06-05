import { A11yModule } from '@angular/cdk/a11y';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PopoverModule } from '../popover.module';
import { PopoverBodyComponent } from './popover-body.component';

describe('PopoverBodyComponent', () => {
    let component: PopoverBodyComponent;
    let fixture: ComponentFixture<PopoverBodyComponent>;

    const mockRenderer2 = {
        listen: jest.fn(),
        addClass: jest.fn(),
        removeClass: jest.fn()
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, A11yModule],
            providers: [{ provide: Renderer2, useValue: mockRenderer2 }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverBodyComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle escape key', () => {
        jest.spyOn(component.onClose, 'next');
        const keyboardEvent: any = { key: ESCAPE, keyCode: ESCAPE, stopPropagation: () => {} };
        component._closeOnEscapeKey = true;
        component.bodyKeyupHandler(keyboardEvent);
        expect(component.onClose.next).toHaveBeenCalled();
    });
});
