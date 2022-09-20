import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonStateDirective } from './directives/skeleton-state.directive';
import { SkeletonModuleConfig } from './skeleton.types';
import { SkeletonGlobalService } from './services/skeleton-global.service';
import { DEFAULT_SKELETON_STATE } from './tokens/default-skeleton-state.token';
import { SkeletonComponent } from './components/skeleton.component';
import { SkeletonTemplateDirective } from './directives/skeleton-template.directive';
import { SkeletonConsumerDirective } from './directives/skeleton-consumer.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [SkeletonStateDirective, SkeletonTemplateDirective, SkeletonConsumerDirective, SkeletonComponent],
    exports: [SkeletonStateDirective, SkeletonTemplateDirective, SkeletonConsumerDirective, SkeletonComponent]
})
export class SkeletonModule {
    static forRoot(
        config: SkeletonModuleConfig = { defaultSkeletonState: false }
    ): ModuleWithProviders<SkeletonModule> {
        return {
            ngModule: SkeletonModule,
            providers: [
                {
                    provide: DEFAULT_SKELETON_STATE,
                    useValue: config.defaultSkeletonState
                },
                SkeletonGlobalService
            ]
        };
    }
}
