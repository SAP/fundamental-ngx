import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';

@Component({
    selector: 'playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.components.scss']
})
export class PlayGroundComponent implements OnInit {
    @Input() schema: Schema;

    @Input() schemaInitialValues;

    @Input() displayBlock: boolean;

    @Output() onFormChanges: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {}

    onSchemaValueChanges($event) {
        this.onFormChanges.emit($event);
    }
}
