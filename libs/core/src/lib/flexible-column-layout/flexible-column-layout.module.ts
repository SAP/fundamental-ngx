import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { cloneDeep, merge } from 'lodash-es';
import { DEFAULT_FLEXIBLE_LAYOUT_CONFIG, FD_FLEXIBLE_LAYOUT_CONFIG, FlexibleLayoutConfig } from './constants';
import { FlexibleColumnLayoutComponent } from './flexible-column-layout.component';

/**
 * Adds Flexible Column Layout functionality to your application.
 *
 * Can be imported in two ways:
 * * Plain `FlexibleColumnLayoutModule` with default configuration
 * * With `withConfig()` method which allows passing custom default configuration.
 */
@NgModule({
    declarations: [FlexibleColumnLayoutComponent],
    imports: [CommonModule, ButtonModule],
    exports: [FlexibleColumnLayoutComponent],
    providers: [
        {
            provide: FD_FLEXIBLE_LAYOUT_CONFIG,
            useValue: DEFAULT_FLEXIBLE_LAYOUT_CONFIG
        }
    ]
})
export class FlexibleColumnLayoutModule {
    /**
     * Allows configuring module on a global level with custom configuration.
     * @param config User's custom configuration.
     */
    static withConfig(config: Partial<FlexibleLayoutConfig>): ModuleWithProviders<FlexibleColumnLayoutModule> {
        config = merge(cloneDeep(DEFAULT_FLEXIBLE_LAYOUT_CONFIG), cloneDeep(config));
        return {
            ngModule: FlexibleColumnLayoutModule,
            providers: [
                {
                    provide: FD_FLEXIBLE_LAYOUT_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
