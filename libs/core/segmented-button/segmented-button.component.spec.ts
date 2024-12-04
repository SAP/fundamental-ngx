import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonComponent, ButtonModule } from '@fundamental-ngx/core/button';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { SegmentedButtonComponent } from './segmented-button.component';
import { SegmentedButtonModule } from './segmented-button.module';
import { SimpleChange } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';

const isSelectedClass = 'fd-button--toggled';

@Component({
    selector: 'fd-test-component',
    template: `
        <fd-segmented-button [toggle]="toggle">
            <button #first fd-button label="Button" value="first"></button>
            <button #second fd-button label="Button" value="second"></button>
            <button #third fd-button label="Button" value="third"></button>
        </fd-segmented-button>
    `,
    standalone: true,
    imports: [ButtonModule, SegmentedButtonModule]
})
export class HostComponent {
    @ViewChild('first', { read: ElementRef }) firstButton: ElementRef;
    @ViewChild('second', { read: ButtonComponent }) secondButton: ButtonComponent;
    @ViewChild('third', { read: ElementRef }) thirdButton: ElementRef;
    @ViewChild(SegmentedButtonComponent) segmentedButton: SegmentedButtonComponent;

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

    // Default Example
    it('should correctly select and deselect single value in non-toggle mode', () => {
        component.segmentedButton.writeValue('second');
        fixture.detectChanges();
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(true);

        component.segmentedButton.writeValue('first');
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(false);
    });

    // Toggle Example
    it('should correctly handle multiple selections in toggle mode', () => {
        component.toggle = true;
        fixture.detectChanges();

        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);

        component.secondButton.elementRef.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(true);

        component.thirdButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.thirdButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);

        // Deselect
        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(false);
    });

    // Form Example
    it('should update form value correctly', () => {
        component.segmentedButton.writeValue('first');
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
        
        component.segmentedButton.writeValue('second');
        fixture.detectChanges();
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(true);
    });

    // Disabled State Check
    it('should detect disabled state', () => {
        component.segmentedButton.setDisabledState(true);
        fixture.detectChanges();
        
        expect(component.firstButton.nativeElement.hasAttribute('disabled')).toBe(true);
        expect(component.secondButton.elementRef.nativeElement.hasAttribute('disabled')).toBe(true);
        expect(component.thirdButton.nativeElement.hasAttribute('disabled')).toBe(true);

        component.segmentedButton.setDisabledState(false);
        fixture.detectChanges();

        expect(component.firstButton.nativeElement.hasAttribute('disabled')).toBe(false);
        expect(component.secondButton.elementRef.nativeElement.hasAttribute('disabled')).toBe(false);
        expect(component.thirdButton.nativeElement.hasAttribute('disabled')).toBe(false);
    });

    // Event Handling Test
    it('should handle all trigger events', () => {
        component.segmentedButton.toggle = true;
        fixture.detectChanges();

        component.firstButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.firstButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);

        component.secondButton.elementRef.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        fixture.detectChanges();
        expect(component.secondButton.elementRef.nativeElement.classList.contains(isSelectedClass)).toBe(true);

        component.thirdButton.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        fixture.detectChanges();
        expect(component.thirdButton.nativeElement.classList.contains(isSelectedClass)).toBe(true);
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
            imports: [SegmentedButtonModule, ButtonModule, HostComponent],
            providers: [RtlService]
        },
        hostTemplate: {
            hostComponent: HostComponent,
            getTestingComponent: (fixture) => fixture.componentInstance.segmentedButton
        },
        supportsOnBlur: false,
        internalValueChangeSetter: null,
        getComponentValue: (fixture) => (fixture.componentInstance.segmentedButton as any)._currentValue,
        getValues: () => [1, 2, 3] // Setting the same values as select options in host template
    });
});
