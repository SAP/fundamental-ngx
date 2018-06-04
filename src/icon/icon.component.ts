import { Directive, Input } from '@angular/core';

@Directive({
    selector: 'fd-icon',
    host: {
        '[class]': '"sap-icon sap-icon--" + glyph + ((size) ? " sap-icon--" + size : "")',
        role: 'presentation'
    }
})
export class IconComponent {
    @Input() glyph;

    @Input() size;
}
