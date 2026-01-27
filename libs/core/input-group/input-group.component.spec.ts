import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Type } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { CVATestSteps, runValueAccessorTests } from 'ngx-cva-test-suite';
import { first } from 'rxjs/operators';
import {
    InputGroupAddOnDirective,
    InputGroupInputDirective,
    InputGroupTextareaDirective
} from './input-group-directives';
import { InputGroupComponent } from './input-group.component';

describe('InputGroupComponent', () => {
    let component: InputGroupComponent;
    let fixture: ComponentFixture<InputGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                InputGroupInputDirective,
                InputGroupAddOnDirective,
                InputGroupTextareaDirective,
                InputGroupComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get an ID and handle the close event for that ID', (done) => {
        component.addOnButtonClicked.pipe(first()).subscribe(($event) => {
            expect($event).toBeDefined();
            done();
        });
        component._buttonClicked({} as any);
    });

    it('should normalize comma to period for number inputs', () => {
        component.type = 'number';
        fixture.detectChanges();

        const mockEvent = {
            target: {
                value: '123,45',
                selectionStart: 6,
                setSelectionRange: jest.fn()
            }
        } as any;

        component._onInput(mockEvent);

        expect(mockEvent.target.value).toBe('123.45');
    });

    it('should remove invalid characters from number input', () => {
        component.type = 'number';
        fixture.detectChanges();

        const mockEvent = {
            target: {
                value: '12a3.4b5',
                selectionStart: 8,
                setSelectionRange: jest.fn()
            }
        } as any;

        component._onInput(mockEvent);

        expect(mockEvent.target.value).toBe('123.45');
    });

    it('should allow only one decimal point', () => {
        component.type = 'number';
        fixture.detectChanges();

        const mockEvent = {
            target: {
                value: '123.45.67',
                selectionStart: 9,
                setSelectionRange: jest.fn()
            }
        } as any;

        component._onInput(mockEvent);

        expect(mockEvent.target.value).toBe('123.4567');
    });

    it('should not modify non-number inputs', () => {
        component.type = 'text';
        fixture.detectChanges();

        const mockEvent = {
            target: {
                value: '123,abc',
                selectionStart: 7
            }
        } as any;

        component._onInput(mockEvent);

        expect(mockEvent.target.value).toBe('123,abc');
    });
});

describe('InputGroup component CVA', () => {
    runValueAccessorTests({
        /** Component, that is being tested */
        component: InputGroupComponent as unknown as Type<Required<ControlValueAccessor>>,
        /**
         * All the metadata required for this test to run.
         * Under the hood calls TestBed.configureTestingModule with provided config.
         */
        testModuleMetadata: {
            imports: [InputGroupComponent]
        },
        hostTemplate: {
            hostComponent: InputGroupComponent,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            getTestingComponent: (fixture) => fixture.componentInstance._cvaControl.cvaDirective!
        },
        /** Whether component is able to track "onBlur" events separately */
        supportsOnBlur: false,
        /**
         * CSS selector for the element, that should dispatch `blur` event.
         * Required and used only if `supportsOnBlur` is set to true.
         */
        nativeControlSelector: 'fd-input-group input',
        /**
         * Tests the correctness of an approach that is used to set value in the component,
         * when the change is internal. It's optional and can be omitted by passing "null"
         */
        internalValueChangeSetter: (fixture, value) => {
            fixture.componentInstance._cvaControl.cvaDirective?.setValue(value, true);
        },
        /** Function to get the value of a component in a runtime. */
        getComponentValue: (fixture: ComponentFixture<InputGroupComponent>) => fixture.componentInstance.inputText,

        excludeSteps: [CVATestSteps.ValueChangedInternally]
    });
});
