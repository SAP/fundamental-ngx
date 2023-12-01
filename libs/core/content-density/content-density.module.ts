import { ModuleWithProviders, NgModule } from '@angular/core';
import { ContentDensityModuleConfig } from './content-density.types';
import { ContentDensityDirective } from './directives/content-density.directive';
import { provideContentDensity } from './provide-content-density';

@NgModule({
    imports: [ContentDensityDirective],
    exports: [ContentDensityDirective]
})
export class ContentDensityModule {
    /** Module with providers */
    static forRoot(config?: ContentDensityModuleConfig): ModuleWithProviders<ContentDensityModule> {
        return {
            ngModule: ContentDensityModule,
            providers: [provideContentDensity(config)]
        };
    }
}
