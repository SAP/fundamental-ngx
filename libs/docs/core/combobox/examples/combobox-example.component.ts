import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-combobox-example',
    templateUrl: './combobox-example.component.html',
    styleUrls: ['combobox-example.component.scss'],
    imports: [
        FormItemComponent,
        FormLabelComponent,
        ComboboxComponent,
        FormsModule,
        ContentDensityDirective,
        ButtonComponent
    ]
})
export class ComboboxExampleComponent {
    searchTermOne = '';
    searchTermTwo = '';
    searchTermThree = '';
    searchTermFour = '';
    searchTermFive = 'Kiwi';
    searchTermSix = '';
    fruits = ['Apple', 'Apricot', 'Aprium', 'Banana', 'Kiwi', 'Strawberry', 'Tomato', 'Pineapple'];

    async testFastTyping(textToType: string): Promise<void> {
        const input = document.getElementById('comboboxID1') as HTMLInputElement;
        if (!input) {return;}

        // Clear the input completely
        this.searchTermOne = '';
        input.value = '';
        input.setSelectionRange(0, 0);
        input.blur();

        // Dispatch events to ensure Angular knows about the clear
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        // Wait for Angular to process the clear
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Now focus and start typing
        input.focus();

        const delay = 5; // 5ms between keystrokes (very fast)

        for (let i = 0; i < textToType.length; i++) {
            // Simulate typing by replacing selected text with new character
            const selStart = input.selectionStart || 0;
            const selEnd = input.selectionEnd || 0;
            const currentValue = input.value;

            // Replace selected text with new character
            input.value = currentValue.substring(0, selStart) + textToType[i] + currentValue.substring(selEnd);
            input.setSelectionRange(selStart + 1, selStart + 1);

            // Dispatch input event to trigger Angular's change detection
            input.dispatchEvent(new Event('input', { bubbles: true }));

            // Dispatch keyup event to trigger autocomplete
            input.dispatchEvent(new KeyboardEvent('keyup', { key: textToType[i], bubbles: true }));

            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}
