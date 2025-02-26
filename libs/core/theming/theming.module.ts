import { ModuleWithProviders, NgModule } from '@angular/core';
import { ThemingConfig } from './interfaces/theming-config.interface';
import { provideTheming } from './provide-theming';
import { ThemingService } from './theming.service';

@NgModule({
    imports: [],
    providers: [ThemingService]
})
export class ThemingModule {
    /** Module with providers */
    static withConfig(config: Partial<ThemingConfig>): ModuleWithProviders<ThemingModule> {
        return {
            ngModule: ThemingModule,
            providers: [provideTheming(config)]
        };
    }
}
