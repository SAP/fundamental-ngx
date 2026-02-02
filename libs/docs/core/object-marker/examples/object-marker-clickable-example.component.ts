import { Component } from '@angular/core';
import { ObjectMarkerComponent } from '@fundamental-ngx/core/object-marker';

@Component({
    selector: 'fd-object-marker-clickable-example',
    templateUrl: './object-marker-clickable-example.component.html',
    imports: [ObjectMarkerComponent]
})
export class ObjectMarkerClickableExampleComponent {
    glyph = 'private';
    changeGlyph(): void {
        this.glyph = 'add-favorite';
    }
}
