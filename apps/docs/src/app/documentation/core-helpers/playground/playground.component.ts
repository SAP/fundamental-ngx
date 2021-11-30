import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';

@Component({
    selector: 'playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.components.scss']
})
export class PlayGroundComponent {
    @Input() schema: Schema;

    @Input() schemaInitialValues: any;

    @Input() displayBlock: boolean;

    /**
     * Is current playground can be resetted to defaults.
     */
    @Input() resettable = false;

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onFormChanges: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Emits event when playground was resetted.
     */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onReset: EventEmitter<void> = new EventEmitter<void>();

    onSchemaValueChanges($event: any): void {
        this.onFormChanges.emit($event);
    }

    /**
     * Emits event when playground was resetted.
     */
    reset(): void {
        this.onReset.emit();
    }
}
