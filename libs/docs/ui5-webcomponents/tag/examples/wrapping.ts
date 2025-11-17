import { Component, signal } from '@angular/core';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import { WrappingType } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-tag-wrapping-sample',
    templateUrl: './wrapping.html',
    standalone: true,
    imports: [Tag]
})
export class TagWrappingSample {
    readonly wrappingTypes = signal([{ type: WrappingType.Normal }, { type: WrappingType.None }]);

    readonly longText = signal('This is a very long tag text that demonstrates wrapping behavior');
}
