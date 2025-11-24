import { Component, signal } from '@angular/core';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';

@Component({
    selector: 'ui5-token-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Token]
})
export class TokenBasicSample {
    readonly tokens = signal([
        { id: 1, text: 'Technology', selected: false },
        { id: 2, text: 'Innovation', selected: false },
        { id: 3, text: 'Design', selected: false },
        { id: 4, text: 'Development', selected: false }
    ]);

    get selectedTokens(): Array<{ id: number; text: string; selected: boolean }> {
        return this.tokens().filter((t) => t.selected);
    }

    get selectedTokenTexts(): string {
        return this.selectedTokens.map((t) => t.text).join(', ');
    }

    toggleSelection(tokenId: number): void {
        this.tokens.update((tokens) => tokens.map((t) => (t.id === tokenId ? { ...t, selected: !t.selected } : t)));
    }
}
