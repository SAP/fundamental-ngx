import { Component, signal } from '@angular/core';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import { TagDesign } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-tag-designs-sample',
    templateUrl: './designs.html',
    standalone: true,
    imports: [Tag]
})
export class TagDesignsSample {
    readonly designs = signal([
        { value: TagDesign.Neutral, label: 'Neutral (default)' },
        { value: TagDesign.Information, label: 'Information' },
        { value: TagDesign.Positive, label: 'Positive' },
        { value: TagDesign.Negative, label: 'Negative' },
        { value: TagDesign.Critical, label: 'Critical' },
        { value: TagDesign.Set1, label: 'Set 1' },
        { value: TagDesign.Set2, label: 'Set 2' }
    ]);
}
