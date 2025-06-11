import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CVATestSteps, runValueAccessorTests } from 'ngx-cva-test-suite';

import { ChangeDetectorRef, Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
    let component: SwitchComponent;
    let fixture: ComponentFixture<SwitchComponent>;
    let changeDetectorRef: ChangeDetectorRef;
    let input;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SwitchComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchComponent);
        component = fixture.componentInstance;
        input = fixture.nativeElement.querySelector('.fd-switch__input');
        changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    function detectChangesOnPush(): void {
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no animations class on init, then remove the class when the switch is checked', fakeAsync(() => {
        expect(component._switchLabelWrapperEl.nativeElement.classList).toContain('fd-switch-no-animate');
        component.isChecked = true;
        expect(component._switchLabelWrapperEl.nativeElement.classList).not.toContain('fd-switch-no-animate');
        tick(500);
        expect(component._switchLabelWrapperEl.nativeElement.classList).toContain('fd-switch-no-animate');
    }));

    it('should accept custom id', () => {
        const id = 'custom-id';
        component.id = id;

        detectChangesOnPush();

        expect(input.id).toBe(component.innerInputId);
    });

    it('should accept custom name', () => {
        const name = 'custom-name';
        component._cva.name = name;

        detectChangesOnPush();

        expect(input.getAttribute('name')).toEqual(component._cva.name);
    });

    it('should auto-generate id', () => {
        expect(component.id).toBeTruthy();
    });

    it('should switch on click', fakeAsync(() => {
        const checkedChangeSpy = jest.spyOn(component.checkedChange, 'emit');

        component.isChecked = true;

        tick(500);

        expect(checkedChangeSpy).toHaveBeenCalledWith(true);

        component.isChecked = false;

        tick(500);

        expect(checkedChangeSpy).toHaveBeenCalledWith(false);
    }));

    it('should focus inner input element', () => {
        jest.spyOn(input, 'focus');

        detectChangesOnPush();

        component.focus();

        expect(input.focus).toHaveBeenCalled();
    });

    it('should display semantic', () => {
        component.semantic = true;

        detectChangesOnPush();

        const switchComp = fixture.nativeElement.querySelector('.fd-switch');
        expect(switchComp.classList).toContain('fd-switch--semantic');
    });
});

describe('SwitchComponent component CVA', () => {
    runValueAccessorTests({
        /** Component, that is being tested */
        component: SwitchComponent as unknown as Type<Required<ControlValueAccessor>>,
        /**
         * All the metadata required for this test to run.
         * Under the hood calls TestBed.configureTestingModule with provided config.
         */
        testModuleMetadata: {
            imports: [SwitchComponent]
        },
        hostTemplate: {
            hostComponent: SwitchComponent,
            getTestingComponent: (fixture) => fixture.componentInstance._cva
        },
        /** Whether component is able to track "onBlur" events separately */
        supportsOnBlur: false,
        /**
         * CSS selector for the element, that should dispatch `blur` event.
         * Required and used only if `supportsOnBlur` is set to true.
         */
        nativeControlSelector: '.fd-switch__input',
        /**
         * Tests the correctness of an approach that is used to set value in the component,
         * when the change is internal. It's optional and can be omitted by passing "null"
         */
        internalValueChangeSetter: (fixture, value) => {
            fixture.componentInstance._cva.setValue(value, true);
        },
        /** Function to get the value of a component in a runtime. */
        getComponentValue: (fixture: ComponentFixture<SwitchComponent>) => fixture.componentInstance.isChecked,

        excludeSteps: [CVATestSteps.ValueChangedInternally]
    });
});
