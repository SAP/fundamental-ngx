import { Component, computed, inject, Signal } from '@angular/core';
import {
    ContentDensityDirective,
    ContentDensityMode,
    GlobalContentDensityService
} from '@fundamental-ngx/core/content-density';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';

@Component({
    selector: 'ui5-content-density-basic-sample',
    templateUrl: './content-density-basic-sample.html',
    standalone: true,
    imports: [Button, Input, SegmentedButton, SegmentedButtonItem, Switch, Label, ContentDensityDirective]
})
export class ContentDensityBasicSampleComponent {
    /** Expose ContentDensityMode enum for template */
    protected readonly ContentDensityMode = ContentDensityMode;

    /** Current content density as a signal */
    protected readonly currentDensity: Signal<ContentDensityMode>;

    /** Computed signal for display label */
    protected readonly densityLabel: Signal<string>;

    private readonly _contentDensityService = inject(GlobalContentDensityService);

    constructor() {
        this.currentDensity = this._contentDensityService.currentDensitySignal;
        this.densityLabel = computed(() => {
            const density = this.currentDensity();
            return density ? density.charAt(0).toUpperCase() + density.slice(1) : '';
        });
    }

    protected selectDensity(density: ContentDensityMode): void {
        this._contentDensityService.updateContentDensity(density);
    }
}
