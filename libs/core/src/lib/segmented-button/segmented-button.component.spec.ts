import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonComponent, ButtonModule } from '@fundamental-ngx/core/button';
import { runValueAccessorTests } from 'ngx-cva-test-suite';

import { SegmentedButtonComponent } from './segmented-button.component';
import { SegmentedButtonModule } from './segmented-button.module';

const isSelectedClass = 'fd-button--toggled';

@Component({
    selector: 'fd-test-component',
    template: `
        <fd-segmented-button [toggle]="toggle">
            <button #first fd-button label="Button" value="first"></button>
            <button #second fd-button label="Button" value="second"></button>
            <button #third fd-button label="Button" value="third"></button>
        </fd-segmented-button>
    `
})
export class HostComponent {
    @ViewChild('first', { read: ElementRef })
    firstButton: ElementRef;

    @ViewChild('second', { read: ButtonComponent })
    secondButton: ButtonComponent;

    @ViewChild('third', { read: ElementRef })
    thirdButton: ElementRef;

    @ViewChild(SegmentedButtonComponent)
    segmentedButton: SegmentedButtonComponent;

    toggle = false;
}

describe('SegmentedButtonComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent],
            imports: [SegmentedButtonModule, ButtonModule]
        }).compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select button, when value is changed', () => {
        component.segmentedButton.writeValue('first');
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
    });

    it('should select all buttons button, when value is changed', () => {
        component.toggle = true;
        component.segmentedButton.writeValue(['first']);
        fixture.detectChanges();

        component.segmentedButton.writeValue(['first', 'second', 'third']);
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.thirdButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
    });

    it('should select button, when trigger event is performed', () => {
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
    });

    it('should select button and deselect other button, when trigger event is performed on non-toggle mode', () => {
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.segmentedButton['_currentValue']).toEqual('first');

        component.secondButton.elementRef.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(false);
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.segmentedButton['_currentValue']).toEqual('second');
    });

    it('should select buttons, when trigger event is performed on toggle mode', () => {
        component.segmentedButton.toggle = true;
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.segmentedButton['_currentValue']).toEqual(['first']);

        component.secondButton.elementRef.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.segmentedButton['_currentValue']).toEqual(['first', 'second']);
    });

    it('should ignore trigger event on disabled', () => {
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.segmentedButton['_currentValue']).toEqual('first');

        component.secondButton.disabled = true;
        fixture.detectChanges();
        component.secondButton.elementRef.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(false);
        expect(component.segmentedButton['_currentValue']).toEqual('first');
    });

    it('should handle all trigger events', () => {
        component.segmentedButton.toggle = true;
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.segmentedButton['_currentValue']).toEqual(['first']);

        component.secondButton.elementRef.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.segmentedButton['_currentValue']).toEqual(['first', 'second']);

        component.thirdButton.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.thirdButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.segmentedButton['_currentValue']).toEqual(['first', 'second', 'third']);
    });
});

describe('Segmented button component CVA', () => {
    runValueAccessorTests<SegmentedButtonComponent, HostComponent>({
        component: SegmentedButtonComponent,
        additionalSetup: (fixture, done) => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                done();
            });
        },
        testModuleMetadata: {
            declarations: [HostComponent],
            imports: [SegmentedButtonModule, ButtonModule] // <= importing the module for app-select
        },
        hostTemplate: {
            // specify that "AppSelectComponent" should not be tested directly
            hostComponent: HostComponent,
            // specify the way to access "AppSelectComponent" from the host template
            getTestingComponent: (fixture) => fixture.componentInstance.segmentedButton
        },
        supportsOnBlur: false,
        internalValueChangeSetter: null,
        getComponentValue: (fixture) => (fixture.componentInstance.segmentedButton as any)._currentValue,
        getValues: () => [1, 2, 3] // <= setting the same values as select options in host template
    });
});
