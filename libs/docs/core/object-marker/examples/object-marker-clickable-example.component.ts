import { Component } from '@angular/core';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';

@Component({
    selector: 'fd-object-marker-clickable-example',
    templateUrl: './object-marker-clickable-example.component.html',
    imports: [ObjectMarkerModule]
})
export class ObjectMarkerClickableExampleComponent {
    glyph = 'private';
    changeGlyph(): void {
        this.glyph = 'add-favorite';
    }
}
