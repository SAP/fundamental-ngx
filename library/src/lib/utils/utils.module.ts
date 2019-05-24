import { ModuleWithProviders, NgModule } from '@angular/core';

import { HashService } from './hash.service';

@NgModule({})
export class UtilsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UtilsModule,
            providers: [HashService]
        }
    }
}
