import { Component, signal } from '@angular/core';
import { TagDesign } from '@fundamental-ngx/ui5-webcomponents';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-tag-color-schemes-sample',
    templateUrl: './color-schemes.html',
    standalone: true,
    imports: [Tag]
})
export class TagColorSchemesSample {
    readonly colorSchemesSet1 = signal([
        { design: TagDesign.Set1, scheme: '1', label: 'Color Scheme 1' },
        { design: TagDesign.Set1, scheme: '2', label: 'Color Scheme 2' },
        { design: TagDesign.Set1, scheme: '3', label: 'Color Scheme 3' },
        { design: TagDesign.Set1, scheme: '4', label: 'Color Scheme 4' },
        { design: TagDesign.Set1, scheme: '5', label: 'Color Scheme 5' },
        { design: TagDesign.Set1, scheme: '6', label: 'Color Scheme 6' },
        { design: TagDesign.Set1, scheme: '7', label: 'Color Scheme 7' },
        { design: TagDesign.Set1, scheme: '8', label: 'Color Scheme 8' },
        { design: TagDesign.Set1, scheme: '9', label: 'Color Scheme 9' },
        { design: TagDesign.Set1, scheme: '10', label: 'Color Scheme 10' }
    ]);

    readonly colorSchemesSet2 = signal([
        { design: TagDesign.Set2, scheme: '1', label: 'Color Scheme 1' },
        { design: TagDesign.Set2, scheme: '2', label: 'Color Scheme 2' },
        { design: TagDesign.Set2, scheme: '3', label: 'Color Scheme 3' },
        { design: TagDesign.Set2, scheme: '4', label: 'Color Scheme 4' },
        { design: TagDesign.Set2, scheme: '5', label: 'Color Scheme 5' },
        { design: TagDesign.Set2, scheme: '6', label: 'Color Scheme 6' },
        { design: TagDesign.Set2, scheme: '7', label: 'Color Scheme 7' },
        { design: TagDesign.Set2, scheme: '8', label: 'Color Scheme 8' },
        { design: TagDesign.Set2, scheme: '9', label: 'Color Scheme 9' },
        { design: TagDesign.Set2, scheme: '10', label: 'Color Scheme 10' }
    ]);
}
