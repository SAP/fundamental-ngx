import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FormControlModule } from '@fundamental-ngx/core/form';

import { ColorPickerComponent } from '@fundamental-ngx/platform/color-picker';

describe('ColorPickerComponent', () => {
    let component: ColorPickerComponent;
    let fixture: ComponentFixture<ColorPickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, FormControlModule],
            declarations: [ColorPickerComponent]
        })
            .overrideComponent(ColorPickerComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorPickerComponent);
        component = fixture.componentInstance;
        component.name = 'name';
        component.id = 'id';

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the value', () => {
        spyOn(component, 'onChange');
        spyOn(component, 'onTouched');

        component.value = 'testVal';

        expect(component.onChange).toHaveBeenCalledWith('testVal');
        expect(component.onTouched).toHaveBeenCalled();
        expect(component.value).toBe('testVal');
    });

    it('should test click', () => {
        spyOn(component, 'onTouched');
        component.onClick();

        expect(component.onTouched).toHaveBeenCalled();
    });

    it('should set the color', () => {
        component.colorChange({
            target: {
                valueOf() {
                    return {
                        color: 'blue'
                    };
                }
            }
        });

        expect(component.value).toBe('blue');
    });
});
