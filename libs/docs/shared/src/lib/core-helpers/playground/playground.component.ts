import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Schema, SchemaComponent } from '@fundamental-ngx/docs/schema';

@Component({
    selector: 'playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.components.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SchemaComponent]
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
