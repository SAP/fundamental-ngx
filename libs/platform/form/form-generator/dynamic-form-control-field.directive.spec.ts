import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DynamicFormControlFieldDirective } from './dynamic-form-control-field.directive';

import { DynamicFormControl } from './dynamic-form-control';

@Component({
    template: `
        <div class="should-show" *fdpDynamicFormControlField="control; show: shouldShow">
            <p>This is shown</p>
        </div>

        <div class="should-hide" *fdpDynamicFormControlField="control; show: !shouldShow">
            <p>This is hidden</p>
        </div>
    `,
    standalone: true,
    imports: [DynamicFormControlFieldDirective]
})
class HostComponent {
    control = new DynamicFormControl('default value', {
        dynamicFormItem: { type: 'input', name: 'test', message: 'test', default: '' }
    });

    shouldShow = true;
}

describe('DynamicFormControlFieldDirective', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it('should be displayed when the input evaluates to true.', () => {
        const element = fixture.debugElement.query(By.css('.should-show'));
        expect(element).not.toBeNull();
    });

    it('should be hidden when the input evaluates to false.', () => {
        const element = fixture.debugElement.query(By.css('.should-hide'));
        expect(element).toBeNull();
    });

    it('should revert hidden and visible elements', () => {
        fixture.componentInstance.shouldShow = false;
        fixture.detectChanges();

        const element = fixture.debugElement.query(By.css('.should-show'));
        expect(element).toBeNull();
    });
});
