import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseThemingConfig } from './config';
import { ThemingConfig } from './interfaces/theming-config.interface';
import { ThemingService } from './theming.service';
import { THEMING_CONFIG_TOKEN } from './tokens';

@NgModule({
    imports: [CommonModule],
    providers: [
        {
            provide: THEMING_CONFIG_TOKEN,
            useValue: new BaseThemingConfig()
        },
        ThemingService
    ]
})
export class ThemingModule {
    static withConfig(config: Partial<ThemingConfig>): ModuleWithProviders<ThemingModule> {
        return {
            ngModule: ThemingModule,
            providers: [
                {
                    provide: THEMING_CONFIG_TOKEN,
                    useValue: config
                }
            ]
        };
    }
}
