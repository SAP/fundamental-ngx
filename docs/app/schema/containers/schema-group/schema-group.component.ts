import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Property } from '../../models/schema.model';

@Component({
    selector: 'schema-group',
    templateUrl: 'schema-group.component.html',
    styleUrls: ['schema-group.component.scss']
})
export class SchemaGroupComponent implements OnInit {
    @Input() schemaGroup: FormGroup;
    @Input() properties: Property;

    forms: Array<{
        key: string;
        control: AbstractControl;
        type: string;
        enum: [any];
    }> = [];

    ngOnInit() {
        const controls = this.schemaGroup.controls;
        for (const key in controls) {
            if (controls.hasOwnProperty(key)) {
                this.forms.push({
                    key: key,
                    control: controls[key],
                    type: this.properties[key].type,
                    enum: this.properties[key].enum
                });
            }
        }
    }

    private _isFormControl(form: FormControl | FormGroup): boolean {
        return form instanceof FormControl;
    }
}
