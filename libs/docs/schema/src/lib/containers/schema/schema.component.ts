import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Properties, Schema } from '../../models/schema.model';
import { SchemaGroupComponent } from '../schema-group/schema-group.component';

import '@sap-ui/common-css/dist/sap-margin.css';

@Component({
    selector: 'schema',
    templateUrl: 'schema.component.html',
    styleUrls: ['schema.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sap-margin-bottom-small'
    },
    imports: [SchemaGroupComponent]
})
export class SchemaComponent {
    /** Schema definition for the form. */
    readonly schema = input.required<Schema>();

    /** Initial values for the form fields. */
    readonly initialValues = input<unknown>();

    /**
     * Whether the playground can be reset to default values.
     */
    readonly resettable = input(false);

    /** Emits form values when they change. */
    readonly schemaValues = output<unknown>();

    /**
     * Emits when playground needs to be reset.
     */
    readonly resetTriggered = output<void>();

    /** The reactive form group built from the schema. */
    protected readonly schemaGroup = computed(() => this._constructProperties(this.schema().properties));

    /** Track whether a reset was triggered to handle initial values update. */
    private readonly _resetted = signal(false);

    constructor() {
        // Patch form with initial values and emit value changes
        effect((onCleanup) => {
            const group = this.schemaGroup();
            const values = this.initialValues();

            if (values) {
                group.patchValue(values as Record<string, unknown>);
            }

            // Subscribe to value changes and emit
            const subscription = group.valueChanges.subscribe((formValues) => {
                this.schemaValues.emit(formValues);
            });

            onCleanup(() => subscription.unsubscribe());
        });

        // Handle reset: patch form when initialValues change after reset
        effect(() => {
            const values = this.initialValues();
            const wasResetted = this._resetted();

            if (wasResetted && values) {
                this._resetted.set(false);
                this.schemaGroup().patchValue(values as Record<string, unknown>);
            }
        });
    }

    /** Resets the form and emits event. */
    protected reset(): void {
        this._resetted.set(true);
        this.resetTriggered.emit();
    }

    private _constructProperties(properties: Properties): FormGroup {
        const formGroup: Record<string, FormGroup | FormControl> = {};
        for (const property in properties) {
            if (properties[property].type === 'object') {
                const innerProps = properties[property].properties;
                if (innerProps) {
                    formGroup[property] = this._constructProperties(innerProps);
                }
            } else {
                formGroup[property] = new FormControl();
            }
        }
        return new FormGroup(formGroup);
    }
}
