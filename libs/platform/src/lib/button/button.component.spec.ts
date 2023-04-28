import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('button onclick should be called', () => {
        jest.spyOn(component, 'onBtnClick');
        component.onBtnClick({});
        expect(component.onBtnClick).toHaveBeenCalled();
    });

    it('should not select a button', () => {
        const element = fixture.debugElement.nativeElement.querySelector('button') as HTMLButtonElement;
        component.ariaSelected = false;
        fixture.detectChanges();
        expect(element.getAttribute('aria-selected')).toBe('false');
    });

    it('should have a content disabled button', () => {
        const element = fixture.debugElement.nativeElement.querySelector('button');
        component.disabled = true;
        fixture.detectChanges();
        expect(element.disabled).toBeTruthy();
    });

    it('should have aria disabled', () => {
        const element = fixture.debugElement.nativeElement.querySelector('button') as HTMLButtonElement;
        component.ariaDisabled = true;
        fixture.detectChanges();
        expect(element.getAttribute('aria-disabled')).toBeTruthy();
    });
});
