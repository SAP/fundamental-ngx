import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { RangeSlider } from '@fundamental-ngx/ui5-webcomponents/range-slider';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-range-slider-tooltip-sample',
    templateUrl: './tooltip-sample.html',
    standalone: true,
    imports: [RangeSlider, Button]
})
export class TooltipSample {
    showTooltip = signal(true);
    editableTooltip = signal(false);
    startValue = signal(30);
    endValue = signal(70);

    toggleTooltip(): void {
        this.showTooltip.update((value) => !value);
    }

    toggleEditable(): void {
        this.editableTooltip.update((value) => !value);

        // Editable tooltip requires showTooltip to be true
        if (this.editableTooltip()) {
            this.showTooltip.set(true);
        }
    }

    onInputChange(event: UI5WrapperCustomEvent<RangeSlider, 'ui5Input'>): void {
        this.startValue.set(event.currentTarget.startValue);
        this.endValue.set(event.currentTarget.endValue);
    }

    onValueChange(event: UI5WrapperCustomEvent<RangeSlider, 'ui5Change'>): void {
        this.startValue.set(event.currentTarget.startValue);
        this.endValue.set(event.currentTarget.endValue);
    }
}
