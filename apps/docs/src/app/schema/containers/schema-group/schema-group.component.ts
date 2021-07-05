import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    /**
     * Is current playground can be resetted.
     */
    @Input() resettable = false;

    controls: Array<{
        key: string;
        control: AbstractControl;
        type: string;
        enum: [any];
    }> = [];

    /**
     * Emits when playground needs to be resetted.
     */
    @Output() onReset: EventEmitter<void> = new EventEmitter<void>();

    ngOnInit(): void {
        const controls = this.schemaGroup.controls;

        for (const key in controls) {
            if (controls.hasOwnProperty(key)) {
                this.controls.push({
                    key: key,
                    control: controls[key],
                    type: this.properties[key].type,
                    enum: this.properties[key].enum
                });
            }
        }
    }

    /** @hidden */
    _isFormControl(form: FormControl | FormGroup): boolean {
        return form instanceof FormControl;
    }

    /**
     * Emits reset event.
     */
    reset(): void {
        this.onReset.emit()
    }
}
