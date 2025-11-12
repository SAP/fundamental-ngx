import { Component, signal } from '@angular/core';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { TextEmptyIndicatorMode } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-text-empty-indicator-sample',
    templateUrl: './empty-indicator.html',
    standalone: true,
    imports: [Text]
})
export class TextEmptyIndicatorSample {
    readonly emptyIndicatorModes = signal([
        { mode: TextEmptyIndicatorMode.Off, description: 'Off - No indicator shown' },
        { mode: TextEmptyIndicatorMode.On, description: 'On - Shows indicator when empty' }
    ]);

    readonly emptyText = signal('');
    readonly normalText = signal('This is some text content');
}
