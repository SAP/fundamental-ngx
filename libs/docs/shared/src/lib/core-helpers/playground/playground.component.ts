import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { Schema, SchemaComponent } from '@fundamental-ngx/docs/schema';

import '@sap-ui/common-css/dist/sap-flex.css';
import '@sap-ui/common-css/dist/sap-padding.css';

@Component({
    selector: 'playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.components.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SchemaComponent],
    host: {
        class: 'fd-playground'
    }
})
export class PlayGroundComponent {
    /** Schema definition for the playground form. */
    readonly schema = input.required<Schema>();

    /** Initial values for the schema form. */
    readonly schemaInitialValues = input<unknown>();

    /** Whether to display the playground content as block. */
    readonly displayBlock = input(false);

    /** Whether the playground can be reset to default values. */
    readonly resettable = input(false);

    /** Emits when form values change. */
    readonly formChanges = output<unknown>();

    /** Emits when playground is reset to defaults. */
    readonly resetTriggered = output<void>();

    protected onSchemaValueChanges(event: unknown): void {
        this.formChanges.emit(event);
    }

    protected reset(): void {
        this.resetTriggered.emit();
    }
}
