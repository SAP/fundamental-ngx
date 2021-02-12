import { InjectionToken, NgModule } from '@angular/core';

export const ENTITY_MAP = new InjectionToken<any>('ENTITY MAP');

@NgModule({
    imports: []
})
export class EntityStoreModule {
    static forRoot(config): any {
        return {
            ngModule: EntityStoreModule,
            providers: [
                { provide: ENTITY_MAP, useValue: config.entities },
            ]
        };
    }
}
