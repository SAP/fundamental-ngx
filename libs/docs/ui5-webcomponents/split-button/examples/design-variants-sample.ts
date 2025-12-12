import { Component, signal } from '@angular/core';
import { SplitButton } from '@fundamental-ngx/ui5-webcomponents/split-button';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-split-button-design-variants-sample',
    templateUrl: './design-variants-sample.html',
    standalone: true,
    imports: [SplitButton]
})
export class DesignVariantsSample {
    lastAction = signal<string>('');

    onAction(action: string): void {
        this.lastAction.set(action);
    }
}
