import { Component, signal } from '@angular/core';
import { ButtonDesign } from '@fundamental-ngx/ui5-webcomponents';
import { ToggleButton } from '@fundamental-ngx/ui5-webcomponents/toggle-button';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-toggle-button-designs-sample',
    templateUrl: './designs.html',
    standalone: true,
    imports: [ToggleButton]
})
export class ToggleButtonDesignsSample {
    readonly designs: Array<keyof typeof ButtonDesign> = Object.keys(ButtonDesign) as Array<keyof typeof ButtonDesign>;
    readonly pressedStates = signal<Record<string, boolean>>({
        Default: false,
        Emphasized: false,
        Positive: false,
        Negative: false,
        Transparent: false,
        Attention: false
    });

    onToggle(design: string): void {
        this.pressedStates.update((states) => ({
            ...states,
            [design]: !states[design]
        }));
    }
}
