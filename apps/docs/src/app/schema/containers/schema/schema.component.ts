import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Properties, Schema } from '../../models/schema.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

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

    @Output() onSchemaValues: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Emits when playground needs to be resetted.
     */
    @Output() onReset: EventEmitter<void> = new EventEmitter<void>();

    schemaGroup: FormGroup;

    /**
     * @hidden
     */
    private _resetted = false;

    /**
     * @hidden
     */
    private _allowSubscribe = true;

    /**
     * @hidden
     */
    ngOnDestroy(): void {
        this._allowSubscribe = false;
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

        this.schemaGroup.valueChanges
        .pipe(takeWhile(() => this._allowSubscribe)).subscribe((values) => {
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
                formGroup[property] = this._constructProperties(properties[property].properties);
            } else {
                formGroup[property] = new FormControl();
            }
        }
        return new FormGroup(formGroup);
    }
}
