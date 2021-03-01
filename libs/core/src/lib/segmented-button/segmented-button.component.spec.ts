import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SegmentedButtonComponent, isSelectedClass, isDisabledClass } from './segmented-button.component';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

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
export class TestComponent {
    @ViewChild('first', { read: ElementRef })
    firstButton: ElementRef;
    @ViewChild('second', { read: ElementRef })
    secondButton: ElementRef;
    @ViewChild('third', { read: ElementRef })
    thirdButton: ElementRef;
    @ViewChild(SegmentedButtonComponent)
    segmentedButton: SegmentedButtonComponent;

    toggle = false;
}

describe('SegmentedButtonComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SegmentedButtonComponent, TestComponent, ButtonComponent]
        }).overrideComponent(ButtonComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select button, when value is changed', () => {
        component.segmentedButton.writeValue('first');
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
    });

    it('should select all buttons button, when value is changed', () => {
        component.toggle = true;
        component.segmentedButton.writeValue(['first']);
        fixture.detectChanges();
        component.segmentedButton.writeValue(['first', 'second', 'third']);
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.secondButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.thirdButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
    });

    it('should select button, when trigger event is performed', () => {
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
    });

    it('should select button and deselect other button, when trigger event is performed on non-toggle mode', () => {
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.segmentedButton['_currentValue']).toEqual('first');
        component.secondButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeFalse();
        expect(component.secondButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.segmentedButton['_currentValue']).toEqual('second');
    });

    it('should select buttons, when trigger event is performed on toggle mode', () => {
        component.segmentedButton.toggle = true;
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.segmentedButton['_currentValue']).toEqual(['first']);
        component.secondButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.secondButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.segmentedButton['_currentValue']).toEqual(['first', 'second']);
    });

    it('should ignore trigger event on disabled', () => {
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.segmentedButton['_currentValue']).toEqual('first');
        component.secondButton.nativeElement.setAttribute('disabled', true);
        component.secondButton.nativeElement.classList.add(isDisabledClass);
        component.secondButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.segmentedButton['_currentValue']).toEqual('first');
    });

    it('should handle all trigger events', () => {
        component.segmentedButton.toggle = true;
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.segmentedButton['_currentValue']).toEqual(['first']);
        component.secondButton.nativeElement.dispatchEvent(new KeyboardEvent('keydown',
            {key: 'Enter'})
        );
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.secondButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.segmentedButton['_currentValue']).toEqual(['first', 'second']);
        component.thirdButton.nativeElement.dispatchEvent(new KeyboardEvent('keydown',
            {key: ' '})
        );
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.secondButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.thirdButton.nativeElement.classList.contains(isSelectedClass)).toBeTrue();
        expect(component.segmentedButton['_currentValue']).toEqual(['first', 'second', 'third']);
    });
});
