import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentDensityDirective } from './directives/content-density.directive';
import { DEFAULT_CONTENT_DENSITY } from './tokens/default-content-density.token';
import { ContentDensityMode } from './content-density.types';
import { ContentDensityStorage } from './classes/abstract-content-density-storage';
import { MemoryContentDensityStorage } from './providers/memory-content-density-storage';
import { ContentDensityControllerService } from './services/content-density-controller.service';

@NgModule({
    imports: [CommonModule],
    exports: [ContentDensityDirective],
    declarations: [ContentDensityDirective],
    providers: [
        {
            provide: ContentDensityStorage,
            useClass: MemoryContentDensityStorage
        },
        ContentDensityControllerService
    ]
})
export class ContentDensityModule {
    static forRoot({ defaultGlobalContentDensity }): ModuleWithProviders<ContentDensityModule> {
        return {
            ngModule: ContentDensityModule,
            providers: [
                {
                    provide: DEFAULT_CONTENT_DENSITY,
                    useValue: defaultGlobalContentDensity || ContentDensityMode.COZY
                }
            ]
        };
    }
}
