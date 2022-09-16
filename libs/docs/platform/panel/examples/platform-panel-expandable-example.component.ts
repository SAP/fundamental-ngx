import { Component } from '@angular/core';

import { PanelConfig, PanelExpandChangeEvent } from '@fundamental-ngx/platform/panel';
import { PlatformConfig } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-platform-panel-expandable-example',
    templateUrl: './platform-panel-expandable-example.component.html',
    providers: [
        /**
         * We are overriding the default content density,
         * if we had many panel components on this page
         * all of those would have used this default configuration,
         * in case if in injector was no GlobalContentDensityService
         * or nothing was setting the content density from above.
         *
         * Same could be done with
         * {
         *     provide: CONTENT_DENSITY_DIRECTIVE,
         *     useValue: of('compact')
         * }
         */
        {
            provide: PanelConfig,
            useFactory: PanelConfig.createProviderFactory({ contentDensity: 'compact' }),
            deps: [PlatformConfig]
        }
    ]
})
export class PlatformPanelExpandableExampleComponent {
    public expanded = true;

    public onExpandChange(event: PanelExpandChangeEvent): void {
        this.expanded = event.payload;
    }
}
