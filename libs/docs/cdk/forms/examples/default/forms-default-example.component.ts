import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    forwardRef,
    inject,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import { CvaControl, CvaDirective, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { cloneDeep } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { MultiComboboxComponent } from '@fundamental-ngx/core/multi-combobox';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdk-forms-default-example',
    templateUrl: './forms-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        CvaDirective,
        forwardRef(() => CustomCdkControlExampleComponent),
        DataSourceDirective,
        MultiComboboxComponent,
        ButtonComponent
    ]
})
export class FormsDefaultExampleComponent {
    @ViewChild('fg1', { read: FormGroupDirective })
    formGroup: FormGroupDirective;

    form: FormGroup = new FormGroup({});

    constructor(private readonly _cd: ChangeDetectorRef) {}

    submit(): void {
        this.formGroup.onSubmit(new Event('submit'));
        this._cd.detectChanges();
    }
}

@Component({
    selector: 'fdk-custom-control-example',
    template: `
        @for (option of _options; track option) {
            <ng-container [formGroup]="form">
                <fd-checkbox
                    [formControlName]="option"
                    [state]="cvaControl.cvaDirective?.state || 'default'"
                    label="option"
                ></fd-checkbox>
            </ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: CvaDirective,
            inputs: ['id', 'placeholder', 'state', 'stateMessage', 'disabled', 'readonly', 'name']
        }
    ],
    providers: [
        CvaControl,
        { provide: FD_FORM_FIELD_CONTROL, useExisting: CustomCdkControlExampleComponent, multi: true }
    ],
    imports: [FormsModule, ReactiveFormsModule, CheckboxComponent]
})
export class CustomCdkControlExampleComponent implements OnInit {
    @Input()
    set options(options: string[]) {
        this.form = this._formBuilder.group(
            options.reduce((acc, name) => {
                acc[name] = [];
                return acc;
            }, {})
        );

        this._options = options;
    }

    _options: string[];

    form: FormGroup;
    cvaControl: CvaControl<string[]> = inject(CvaControl);
    _destroyRef = inject(DestroyRef);

    constructor(private readonly _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.cvaControl.listenToChanges();
        this.form?.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            const formValue = Object.entries(cloneDeep(this.form.value)).reduce((acc, [currentKey, currentValue]) => {
                if (currentValue) {
                    acc[currentKey] = currentValue;
                }
                return acc;
            }, {});
            this.cvaControl.cvaDirective?.setValue(Object.keys(formValue), true);
        });
    }
}
