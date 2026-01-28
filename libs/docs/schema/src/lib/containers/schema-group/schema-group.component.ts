import { ChangeDetectionStrategy, Component, computed, forwardRef, input, output } from '@angular/core';
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

import '@sap-ui/common-css/dist/sap-padding.css';
import '@sap-ui/common-css/dist/sap-typography.css';

@Component({
    selector: 'schema-group',
    templateUrl: 'schema-group.component.html',
    styleUrls: ['schema-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sap-padding'
    },
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
export class SchemaGroupComponent {
    /** The form group for this schema section. */
    readonly schemaGroup = input.required<FormGroup>();

    /** Properties definition for this schema section. */
    readonly properties = input.required<Properties>();

    /** Whether the playground can be reset to default values. */
    readonly resettable = input(false);

    /** Emits when playground needs to be reset. */
    readonly resetTriggered = output<void>();

    /** Computed array of form controls with metadata. */
    protected readonly controls = computed(() => {
        const group = this.schemaGroup();
        const props = this.properties();
        const result: Array<{
            key: string;
            control: AbstractControl;
            type: string;
            enum: unknown[] | undefined;
        }> = [];

        for (const key in group.controls) {
            if (Object.prototype.hasOwnProperty.call(group.controls, key)) {
                result.push({
                    key,
                    control: group.controls[key],
                    type: props[key].type,
                    enum: props[key].enum
                });
            }
        }

        return result;
    });

    /** @hidden */
    protected _isFormControl(form: AbstractControl): boolean {
        return form instanceof FormControl;
    }

    /** Emits reset event. */
    protected reset(): void {
        this.resetTriggered.emit();
    }
}
