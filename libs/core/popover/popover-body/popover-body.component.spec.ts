import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { A11yModule } from '@angular/cdk/a11y';
import { ESCAPE } from '@angular/cdk/keycodes';
import { PopoverModule } from '../popover.module';
import { PopoverBodyComponent } from './popover-body.component';

describe('PopoverBodyComponent', () => {
    let component: PopoverBodyComponent;
    let fixture: ComponentFixture<PopoverBodyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, A11yModule]
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
