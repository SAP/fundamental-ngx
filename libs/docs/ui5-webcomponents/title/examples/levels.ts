import { Component, signal } from '@angular/core';
import { TitleLevel } from '@fundamental-ngx/ui5-webcomponents';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-title-levels-sample',
    templateUrl: './levels.html',
    standalone: true,
    imports: [Title]
})
export class TitleLevelsSample {
    readonly levels = signal([
        { level: TitleLevel.H1, description: 'Main page heading (most important)' },
        { level: TitleLevel.H2, description: 'Major section heading' },
        { level: TitleLevel.H3, description: 'Subsection heading' },
        { level: TitleLevel.H4, description: 'Sub-subsection heading' },
        { level: TitleLevel.H5, description: 'Minor section heading' },
        { level: TitleLevel.H6, description: 'Smallest section heading' }
    ]);

    readonly examples = signal([
        { size: TitleLevel.H2, level: TitleLevel.H1, text: 'Large Visual, Main Semantic Level' },
        { size: TitleLevel.H4, level: TitleLevel.H2, text: 'Medium Visual, Section Semantic Level' },
        { size: TitleLevel.H6, level: TitleLevel.H3, text: 'Small Visual, Subsection Semantic Level' }
    ]);
}
