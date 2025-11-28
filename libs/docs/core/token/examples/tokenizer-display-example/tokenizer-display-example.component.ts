import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormControlComponent, FormItemComponent } from '@fundamental-ngx/core/form';
import { TokenComponent, TokenizerComponent, TokenizerInputDirective } from '@fundamental-ngx/core/token';

@Component({
    selector: 'fd-tokenizer-display-example',
    templateUrl: './tokenizer-display-example.component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FormItemComponent,
        TokenComponent,
        TokenizerComponent,
        TokenizerInputDirective,
        ContentDensityDirective,
        FormControlComponent
    ]
})
export class TokenizerDisplayExampleComponent implements OnInit {
    tokenizerExampleForm: FormGroup;

    inputValue = 'New token';

    tokens = [
        { text: 'One', display: true },
        { text: 'Two', display: true },
        { text: 'Three', display: true },
        { text: 'Four', display: true },
        { text: 'Five', display: true },
        { text: 'Six', display: true },
        { text: 'Seven', display: true },
        { text: 'Eight', display: true },
        { text: 'Nine', display: true },
        { text: 'Ten', display: true },
        { text: 'Eleven', display: true },
        { text: 'Twelve', display: true },
        { text: 'Thirteen', display: true },
        { text: 'Fourteen', display: true },
        { text: 'Fifteen', display: true },
        { text: 'Sixteen', display: true }
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.tokenizerExampleForm = this.fb.group({
            inputControl: new FormControl('', Validators.required)
        });
    }
}
