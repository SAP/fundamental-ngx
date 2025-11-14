import { Component, signal } from '@angular/core';
import { TitleLevel } from '@fundamental-ngx/ui5-webcomponents';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-title-sizes-sample',
    templateUrl: './sizes.html',
    standalone: true,
    imports: [Title]
})
export class TitleSizesSample {
    readonly sizes = signal([
        { size: TitleLevel.H1, description: 'Largest title size for main headings' },
        { size: TitleLevel.H2, description: 'Large title size for section headings' },
        { size: TitleLevel.H3, description: 'Medium title size for subsection headings' },
        { size: TitleLevel.H4, description: 'Smaller title size for component titles' },
        { size: TitleLevel.H5, description: 'Small title size (default)' },
        { size: TitleLevel.H6, description: 'Smallest title size for minor headings' }
    ]);
}
