import { Component, Input } from '@angular/core';

@Component({
    selector: 'fdp-object-attribute',
    templateUrl: './object-attribute.component.html',
    styleUrls: ['./object-attribute.component.scss']
})
export class ObjectAttributeComponent {

    /** label for the element */
    @Input()
    label: string;
}
