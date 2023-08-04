import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    Input,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { CvaControl, CvaDirective } from '@fundamental-ngx/cdk/forms';
import { cloneDeep } from 'lodash-es';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'fundamental-ngx-forms-default-example',
    templateUrl: './forms-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
    ]
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
