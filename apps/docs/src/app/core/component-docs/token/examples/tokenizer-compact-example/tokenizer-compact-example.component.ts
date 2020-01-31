import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-tokenizer-compact-example',
    templateUrl: './tokenizer-compact-example.component.html'
})
export class TokenizerCompactExampleComponent implements OnInit {

    tokenizerExampleForm: FormGroup;

    inputValue = 'New token';

    tokens = [
        {text: 'Bibendum', readOnly: false},
        {text: 'Lorem', readOnly: false},
        {text: 'Dolor', readOnly: false},
        {text: 'Filter', readOnly: true}
    ];

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.tokenizerExampleForm = this.fb.group({
            inputControl: new FormControl('', Validators.required)
        });
    }

    onSubmit(): void {
        this.tokens.push({
            text: this.tokenizerExampleForm.controls.inputControl.value,
            readOnly: false
        });
        this.tokenizerExampleForm.controls.inputControl.reset();
    }

    removeToken(token): void {
        this.tokens.splice(this.tokens.indexOf(token), 1);
    }

}
