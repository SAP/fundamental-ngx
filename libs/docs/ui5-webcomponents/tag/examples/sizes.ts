import { Component, signal } from '@angular/core';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import { TagSize } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-tag-sizes-sample',
    templateUrl: './sizes.html',
    standalone: true,
    imports: [Tag]
})
export class TagSizesSample {
    readonly sizes = signal([
        { size: TagSize.S, label: 'Small' },
        { size: TagSize.L, label: 'Large' }
    ]);
}
