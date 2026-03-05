import { Component, computed, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ContentDensityMode,
    GlobalContentDensityService,
    provideContentDensity
} from '@fundamental-ngx/core/content-density';
import { SelectModule } from '@fundamental-ngx/core/select';
import { ContentDensityUserComponent } from './content-density-user/content-density-user.component';

@Component({
    selector: 'fd-content-density-example',
    templateUrl: './content-density-example.component.html',
    imports: [SelectModule, FormsModule, ContentDensityUserComponent],
    providers: [GlobalContentDensityService, provideContentDensity()]
})
export class ContentDensityExampleComponent {
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

    protected onChange(density: string): void {
        this._contentDensityService.updateContentDensity(density as ContentDensityMode);
    }
}
