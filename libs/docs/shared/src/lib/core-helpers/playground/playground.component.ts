import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Schema } from '@fundamental-ngx/docs/schema';

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
     * Is current playground can be reset to default.
     */
    @Input() resettable = false;

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onFormChanges: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Emits event when playground was reset.
     */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onReset: EventEmitter<void> = new EventEmitter<void>();

    onSchemaValueChanges($event: any): void {
        this.onFormChanges.emit($event);
    }

    /**
     * Emits event when playground was reset.
     */
    reset(): void {
        this.onReset.emit();
    }
}
