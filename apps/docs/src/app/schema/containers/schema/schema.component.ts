import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Properties, Schema } from '../../models/schema.model';

@Component({
    selector: 'schema',
    templateUrl: 'schema.component.html',
    styleUrls: ['schema.component.scss']
})
export class SchemaComponent implements OnInit, OnChanges, OnDestroy {
    @Input() schema: Schema;

    @Input() initialValues: any;

    /**
     * Is current playground can be resetted.
     */
    @Input() resettable = false;

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onSchemaValues: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Emits when playground needs to be resetted.
     */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onReset: EventEmitter<void> = new EventEmitter<void>();

    schemaGroup: FormGroup;

    /**
     * @hidden
     */
    private _resetted = false;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /**
     * @hidden
     */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @hidden
     */
    ngOnInit(): void {
        this._constructSchemaGroup();
    }

    /**
     * Resets the form and emits event.
     */
    reset(): void {
        this._resetted = true;
        this.onReset.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this._resetted && changes.initialValues) {
            this.initialValues = changes.initialValues.currentValue;
            this._resetted = false;
            this.schemaGroup.patchValue(this.initialValues);
        }
    }

    /**
     * @hidden
     */
    private _constructSchemaGroup(): void {
        this.schemaGroup = this._constructProperties(this.schema.properties);

        this.schemaGroup.patchValue(this.initialValues);

        this.schemaGroup.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe((values) => {
            this.onSchemaValues.emit(values);
        });
    }

    /**
     * @hidden
     */
    private _constructProperties(properties: Properties): FormGroup {
        const formGroup = {};
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
