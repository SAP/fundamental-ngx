import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenericTagComponent } from '@fundamental-ngx/core/generic-tag';

@Component({
    selector: 'fd-generic-tag-glyph-example',
    templateUrl: './generic-tag-glyph-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GenericTagComponent]
})
export class GenericTagGlyphExampleComponent {}
