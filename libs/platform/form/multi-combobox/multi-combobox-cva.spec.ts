import { ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CVATestSteps, runValueAccessorTests } from 'ngx-cva-test-suite';
import { MultiComboboxComponent } from './multi-combobox/multi-combobox.component';

describe('MultiComboBox component CVA', () => {
    runValueAccessorTests({
        /** Component, that is being tested */
        component: MultiComboboxComponent,
        /**
         * All the metadata required for this test to run.
         * Under the hood calls TestBed.configureTestingModule with provided config.
         */
        testModuleMetadata: {
            imports: [FormsModule, ReactiveFormsModule, MultiComboboxComponent]
        },
        /** Whether component is able to track "onBlur" events separately */
        supportsOnBlur: false,
        /**
         * CSS selector for the element, that should dispatch `blur` event.
         * Required and used only if `supportsOnBlur` is set to true.
         */
        nativeControlSelector: 'input.fd-tokenizer__input',
        /**
         * Tests the correctness of an approach that is used to set value in the component,
         * when the change is internal. It's optional and can be omitted by passing "null"
         */
        internalValueChangeSetter: (fixture, value) => {
            (fixture.componentInstance as any).setValue(value, true);
        },
        /** Function to get the value of a component in a runtime. */
        getComponentValue: (fixture: ComponentFixture<MultiComboboxComponent>) =>
            Array.isArray(fixture.componentInstance.value)
                ? fixture.componentInstance.value[0]
                : fixture.componentInstance.value,

        excludeSteps: [CVATestSteps.ValueChangedInternally, CVATestSteps.ResetHandledProperly],

        getValues: () => ['Apple', 'Banana', 'Pineapple'], // <= setting the same values as select options in host template

        additionalSetup: (fixture) => {
            fixture.componentInstance.dataSource = [
                { name: 'Apple', type: 'Fruits' },
                { name: 'Banana', type: 'Fruits' },
                { name: 'Pineapple', type: 'Fruits' },
                { name: 'Strawberry', type: 'Fruits' },
                { name: 'Broccoli', type: 'Vegetables' },
                { name: 'Carrot', type: 'Vegetables' },
                { name: 'Jalapeño', type: 'Vegetables' },
                { name: 'Spinach', type: 'Vegetables' }
            ];
        }
    });
});
