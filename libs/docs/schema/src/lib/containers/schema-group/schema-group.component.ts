import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Properties } from '../../models/schema.model';
import { AsFormControlPipe, AsFormGroupPipe } from '../../pipes/type-casting.pipe';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormLegendModule } from '@fundamental-ngx/core/form';
import { FieldSetModule } from '@fundamental-ngx/core/form';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
    selector: 'schema-group',
    templateUrl: 'schema-group.component.html',
    styleUrls: ['schema-group.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        FormItemModule,
        FormLabelModule,
        FormControlModule,
        CheckboxComponent,
        FieldSetModule,
        FormLegendModule,
        forwardRef(() => SchemaGroupComponent),
        ButtonModule,
        AsFormControlPipe,
        AsFormGroupPipe
    ]
})
export class SchemaGroupComponent implements OnInit {
    @Input() schemaGroup: FormGroup;
    @Input() properties: Properties;

    /**
     * Is current playground can be resetted.
     */
    @Input() resettable = false;

    controls: Array<{
        key: string;
        control: AbstractControl;
        type: string;
        enum: any[] | undefined;
    }> = [];

    /**
     * Emits when playground needs to be resetted.
     */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onReset: EventEmitter<void> = new EventEmitter<void>();

    ngOnInit(): void {
        const controls = this.schemaGroup.controls;

        for (const key in controls) {
            if (Object.prototype.hasOwnProperty.call(controls, key)) {
                this.controls.push({
                    key,
                    control: controls[key],
                    type: this.properties[key].type,
                    enum: this.properties[key].enum
                });
            }
        }
    }

    /** @hidden */
    _isFormControl(form: AbstractControl): boolean {
        return form instanceof FormControl;
    }

    /**
     * Emits reset event.
     */
    reset(): void {
        this.onReset.emit();
    }
}
