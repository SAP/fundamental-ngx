import { Component } from '@angular/core';

@Component({
    selector: 'fd-object-marker-clickable-example',
    templateUrl: './object-marker-clickable-example.component.html'
})
export class ObjectMarkerClickableExampleComponent {
    glyph = 'private';
    changeGlyph(): void {
        this.glyph = 'add-favorite';
    }
}
