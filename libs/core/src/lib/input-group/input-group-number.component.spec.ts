import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InputGroupNumberComponent } from './input-group-number.component';
import { ButtonModule } from '../button/button.module';
import { InputGroupAddOnDirective } from '@fundamental-ngx/core';

describe('InputGroupNumberComponent', () => {
    let component: InputGroupNumberComponent;
    let fixture: ComponentFixture<InputGroupNumberComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ButtonModule],
            declarations: [InputGroupNumberComponent, InputGroupAddOnDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGroupNumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get the input and increment/decrement properly', () => {
        spyOn(component, 'onChange');
        spyOn(component, 'onTouched');
        component.inputText = 0;
        expect(component.inputText).toBe(0);
        component.stepUpClicked();
        expect(component.inputText).toBe(1);
        expect(component.onChange).toHaveBeenCalledWith(1);
        expect(component.onTouched).toHaveBeenCalled();
        component.stepDownClicked();
        expect(component.inputText).toBe(0);
        expect(component.onChange).toHaveBeenCalledWith(0);
    });
});
