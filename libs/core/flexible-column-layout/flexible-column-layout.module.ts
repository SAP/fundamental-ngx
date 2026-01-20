import { ModuleWithProviders, NgModule } from '@angular/core';
import { DEFAULT_FLEXIBLE_LAYOUT_CONFIG, FD_FLEXIBLE_LAYOUT_CONFIG, FlexibleLayoutConfig } from './constants';
import { FlexibleColumnLayoutComponent } from './flexible-column-layout.component';
import { provideFlexibleColumnLayoutConfig } from './provide-config';

/**
 * Adds Flexible Column Layout functionality to your application.
 *
 * Can be imported in two ways:
 * * Plain `FlexibleColumnLayoutModule` with default configuration
 * * With `withConfig()` method which allows passing custom default configuration.
 */
/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [FlexibleColumnLayoutComponent],
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
        return {
            ngModule: FlexibleColumnLayoutModule,
            providers: provideFlexibleColumnLayoutConfig(config)
        };
    }
}
