import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    FieldsetComponent,
    FormControlComponent,
    FormItemComponent,
    FormLabelComponent,
    FormLegendDirective
} from '@fundamental-ngx/core/form';
import { Properties } from '../../models/schema.model';
import { AsFormControlPipe, AsFormGroupPipe } from '../../pipes/type-casting.pipe';

@Component({
    selector: 'schema-group',
    templateUrl: 'schema-group.component.html',
    styleUrls: ['schema-group.component.scss'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        CheckboxComponent,
        FieldsetComponent,
        FormLegendDirective,
        forwardRef(() => SchemaGroupComponent),
        ButtonComponent,
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

    /**
     * Emits when playground needs to be resetted.
     */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onReset: EventEmitter<void> = new EventEmitter<void>();

    controls: Array<{
        key: string;
        control: AbstractControl;
        type: string;
        enum: any[] | undefined;
    }> = [];

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
