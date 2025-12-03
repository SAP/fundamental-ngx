import { Component, computed, effect, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents-ai/button';
import { ButtonState } from '@fundamental-ngx/ui5-webcomponents-ai/button-state';
import { Menu } from '@fundamental-ngx/ui5-webcomponents/menu';
import { MenuItem } from '@fundamental-ngx/ui5-webcomponents/menu-item';
import { MenuSeparator } from '@fundamental-ngx/ui5-webcomponents/menu-separator';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

type ButtonStateType = 'generate' | 'generating' | 'revise';

@Component({
    selector: 'ui5-ai-basic-button-sample',
    standalone: true,
    imports: [Button, ButtonState, Menu, MenuItem, MenuSeparator],
    templateUrl: './basic-sample.html',
    styles: `
        .ai-button-examples {
            display: flex;
            gap: 1rem;
            align-items: center;
            padding: 1rem;
        }
    `
})
export class BasicAiButtonSample {
    readonly buttonState = signal<ButtonStateType>('generate');
    readonly menuOpen = signal<boolean>(false);

    // Computed signal for checking if generation is active
    readonly isGenerating = computed(() => this.buttonState() === 'generating');

    private generationId?: number;

    constructor() {
        // Effect to log state changes
        effect(() => {
            console.log('Button state changed to:', this.buttonState());
        });
    }

    aiButtonClickHandler = (): void => {
        switch (this.buttonState()) {
            case 'generate': {
                this.buttonState.set('generating');
                this.startGeneration();
                break;
            }
            case 'generating': {
                this.buttonState.set('generate');
                this.stopGeneration();
                break;
            }
            case 'revise': {
                this.menuOpen.set(true);
                break;
            }
        }
    };

    handleMenuItemClick = (event: Event): void => {
        if (this.isMenuItemClickEvent(event)) {
            const { text } = event.detail;

            if (text === 'Regenerate') {
                this.buttonState.set('generating');
                this.startGeneration();
            }

            // Close menu after selection
            this.menuOpen.set(false);
        }
    };

    private readonly startGeneration = (): void => {
        this.generationId = window.setTimeout(() => {
            this.buttonState.set('revise');
        }, 3000);
    };

    private readonly stopGeneration = (): void => {
        if (this.generationId) {
            window.clearTimeout(this.generationId);
            this.generationId = undefined;
        }
    };

    private isMenuItemClickEvent(event: Event): event is CustomEvent<{ text: string }> {
        return (
            'detail' in event &&
            event.detail != null &&
            typeof event.detail === 'object' &&
            'text' in event.detail &&
            typeof event.detail.text === 'string'
        );
    }
}
