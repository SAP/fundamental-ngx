import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';

/**
 * Example demonstrating the [valueProperty] input when using [communicateByObject]="true"
 * with Reactive Forms.
 *
 * The [valueProperty] input specifies which property of the selected object should be
 * used as the form control value. This is useful when working with object arrays where
 * you only want to submit a single property (like an ID or code) to the form, instead of
 * the entire object.
 */

interface Product {
    displayedValue: string;
    code: string;
}

@Component({
    selector: 'fd-combobox-value-property-example',
    templateUrl: './combobox-value-property-example.component.html',
    imports: [ReactiveFormsModule, ComboboxComponent, ButtonComponent, JsonPipe]
})
export class ComboboxValuePropertyExampleComponent {
    /**
     * Form demonstrating the difference between:
     * 1. Without valueProperty - entire object is set to formControl value
     * 2. With valueProperty - only the specified property is set to formControl value
     */
    comparisonForm = new FormGroup({
        fruitWithoutValueProperty: new FormControl<Product | null>(null),
        fruitWithValueProperty: new FormControl<string | null>(null)
    });

    /**
     * Array of product objects with multiple properties
     */
    fruits: Product[] = [
        { displayedValue: 'Apple', code: 'A1' },
        { displayedValue: 'Banana', code: 'B1' },
        { displayedValue: 'Orange', code: 'O1' },
        { displayedValue: 'Strawberry', code: 'S1' },
        { displayedValue: 'Tomato', code: 'T1' }
    ];

    /**
     * Display function to show the displayedValue property in the dropdown
     */
    protected displayFn(item: Product | null): string {
        return item?.displayedValue ?? '';
    }

    /**
     * Programmatically set form values to demonstrate two-way binding
     */
    protected selectAppleWithCode(): void {
        // When valueProperty is used, setting the form value to just the code
        // will find the matching object and display it correctly
        this.comparisonForm.patchValue({ fruitWithValueProperty: 'A1' });
    }

    /**
     * Reset form values
     */
    protected resetForm(): void {
        this.comparisonForm.reset();
    }
}
