import { NgFor, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    Input,
    ViewChild,
    forwardRef,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import {
    CvaControl,
    CvaDirective,
    CvaDirective as CvaDirective_1,
    FD_FORM_FIELD_CONTROL
} from '@fundamental-ngx/cdk/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { MultiComboboxModule } from '@fundamental-ngx/core/multi-combobox';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { cloneDeep } from 'lodash-es';

@Component({
    selector: 'fundamental-ngx-forms-default-example',
    templateUrl: './forms-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        CvaDirective_1,
        forwardRef(() => CustomCdkControlExampleComponent),
        NgIf,
        DataSourceDirective,
        MultiComboboxModule,
        ButtonModule
    ]
})
export class FormsDefaultExampleComponent {
    form: FormGroup = new FormGroup({});

    @ViewChild('fg1', { read: FormGroupDirective })
    formGroup: FormGroupDirective;

    constructor(private readonly _cd: ChangeDetectorRef) {}

    submit(): void {
        this.formGroup.onSubmit(new Event('submit'));
        this._cd.detectChanges();
    }
}

@Component({
    selector: 'fdk-custom-control-example',
    template: `
        <ng-container [formGroup]="form" *ngFor="let option of _options">
            <fd-checkbox
                [formControlName]="option"
                [state]="cvaControl.cvaDirective?.state || 'default'"
                label="option"
            ></fd-checkbox>
        </ng-container>
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
    standalone: true,
    imports: [NgFor, FormsModule, ReactiveFormsModule, CheckboxComponent]
})
export class CustomCdkControlExampleComponent {
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
