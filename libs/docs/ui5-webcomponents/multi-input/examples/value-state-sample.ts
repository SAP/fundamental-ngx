import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { MultiInput } from '@fundamental-ngx/ui5-webcomponents/multi-input';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-multi-input-value-state-sample',
    templateUrl: './value-state-sample.html',
    standalone: true,
    imports: [MultiInput, Token]
})
export class ValueStateSample {
    noneTokens = signal<string[]>(['Tag1', 'Tag2']);
    positiveTokens = signal<string[]>(['Approved']);
    criticalTokens = signal<string[]>(['Warning']);
    negativeTokens = signal<string[]>(['Error']);
    informationTokens = signal<string[]>(['Info']);

    onTokenDelete(event: UI5WrapperCustomEvent<MultiInput, 'ui5TokenDelete'>, stateSignal: any): void {
        const deletedToken = event.detail.tokens[0].text;
        stateSignal.update((tokens: string[]) => tokens.filter((t: string) => t !== deletedToken));
    }
}
