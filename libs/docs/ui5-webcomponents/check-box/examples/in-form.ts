import { Component, signal } from '@angular/core';

import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';

import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

@Component({
    selector: 'ui5-form-checkbox-sample',
    standalone: true,
    imports: [CheckBox, Button],
    templateUrl: './in-form.html',
    styles: [
        `
            .checkbox-group {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin: 15px 0;
            }

            #output {
                margin: 1rem 0;
                padding: 1rem;
                border-radius: 4px;
                font-family: monospace;
            }
        `
    ]
})
export class InFormCheckBoxSample {
    formOutput = signal<string>('');

    onSubmit(event: Event): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const selectedLanguages = formData.getAll('languages');

        const output =
            selectedLanguages.length > 0
                ? `Selected languages: ${selectedLanguages.join(', ')}`
                : 'No languages selected';

        this.formOutput.set(output);
    }
}
