import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Properties, Schema } from '../../models/schema.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'schema',
    templateUrl: 'schema.component.html',
    styleUrls: ['schema.component.scss']
})
export class SchemaComponent implements OnInit {
    @Input() schema: Schema;

    @Input() initialValues: any;

    @Output() onSchemaValues: EventEmitter<any> = new EventEmitter<any>();

    schemaGroup: FormGroup;

    ngOnInit() {
        this.schemaGroup = this._constructProperties(this.schema.properties);
        this.schemaGroup.patchValue(this.initialValues);

        this.schemaGroup.valueChanges.subscribe(values => {
            this.onSchemaValues.emit(values);
        });
    }

    private _constructProperties(properties: Properties) {
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
