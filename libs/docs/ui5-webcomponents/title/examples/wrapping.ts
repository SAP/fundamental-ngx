import { Component, signal } from '@angular/core';
import { WrappingType } from '@fundamental-ngx/ui5-webcomponents';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-title-wrapping-sample',
    templateUrl: './wrapping.html',
    standalone: true,
    imports: [Title]
})
export class TitleWrappingSample {
    readonly wrappingTypes = signal([
        {
            type: WrappingType.Normal
        },
        {
            type: WrappingType.None
        }
    ]);

    readonly longTitle = signal(
        'This is a very long title that demonstrates different wrapping behaviors when the container width is limited and the text needs to wrap or be truncated'
    );
}
