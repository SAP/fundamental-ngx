import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fd-tokenizer-example',
    templateUrl: './tokenizer-example.component.html'
})
export class TokenizerExampleComponent implements OnInit {
    tokenizerExampleForm: FormGroup;

    inputValue = 'New token';

    tokens = [
        { text: 'One', readOnly: false },
        { text: 'Two', readOnly: false },
        { text: 'Three', readOnly: false },
        { text: 'Four', readOnly: false },
        { text: 'Five', readOnly: false },
        { text: 'Six', readOnly: false },
        { text: 'Seven', readOnly: false },
        { text: 'Eight', readOnly: false },
        { text: 'Nine', readOnly: false },
        { text: 'Ten', readOnly: false },
        { text: 'Eleven', readOnly: false },
        { text: 'Twelve', readOnly: false },
        { text: 'Thirteen', readOnly: false },
        { text: 'Fourteen', readOnly: false },
        { text: 'Fifteen', readOnly: false },
        { text: 'Sixteen', readOnly: false }
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.tokenizerExampleForm = this.fb.group({
            inputControl: new FormControl('', Validators.required)
        });
    }

    onSubmit(): void {
        let newTokenText = this.tokenizerExampleForm.controls.inputControl.value;
        newTokenText = newTokenText.trim();
        if (newTokenText && newTokenText !== '') {
            this.tokens.push({
                text: newTokenText,
                readOnly: false
            });
            this.tokenizerExampleForm.controls.inputControl.reset();
        }
    }

    removeToken(token): void {
        this.tokens.splice(this.tokens.indexOf(token), 1);
    }
}
