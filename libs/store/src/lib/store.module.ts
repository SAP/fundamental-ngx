import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import {
    DefaultDataServiceConfig,
    DefaultDataServiceFactory,
    EntityDataModule,
    EntityDataModuleConfig,
    EntityMetadataMap
} from '@ngrx/data';
import { StoreModule, StoreFeatureModule, StoreRootModule } from '@ngrx/store';
import { EffectsModule, EffectsFeatureModule, EffectsRootModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EntityMetaOptionsService } from './infrastructure/persistence/entity-options.service';
import { DefaultEntityMetaOptionsService } from './infrastructure/persistence/default-entity-options.service';
import {
    DefaultHttpUrlGenerator,
    HttpUrlGenerator
} from './infrastructure/persistence/store/entity-store-server/http-url-generator';
import { EntityStoreServerServiceFactory } from './infrastructure/persistence/store/entity-store-server/entity-store-server';
import { ENTITY_MODEL_MAP, FundamentalStoreConfig } from './infrastructure/configuration';

function mapFundamentalConfigToNgrxConfig(conf: FundamentalStoreConfig): EntityDataModuleConfig {
    const entityMetadata: EntityMetadataMap = {};
    const pluralNames: { [name: string]: string } = {};

    for (const entity in conf.entities) {
        if (conf.entities.hasOwnProperty(entity)) {
            entityMetadata[entity] = {};
        }
    }

    return { entityMetadata, pluralNames };
}

@NgModule({
    imports: [StoreRootModule, EffectsRootModule],
    exports: [StoreRootModule, EffectsRootModule]
})
export class FundamentalRootStoreModule {}

@NgModule({
    imports: [StoreFeatureModule, EffectsFeatureModule],
    exports: [StoreFeatureModule, EffectsFeatureModule]
})
export class FundamentalStoreModuleForFeature {}

@NgModule()
export class FundamentalStoreModule {
    static forRoot(conf: FundamentalStoreConfig): ModuleWithProviders<FundamentalStoreModule> {
        // configure ngrx EntityDataModule
        const entityDataModuleConfig = mapFundamentalConfigToNgrxConfig(conf);
        const entityDataModule = EntityDataModule.forRoot(entityDataModuleConfig);
        const defaultDataServiceConfig: DefaultDataServiceConfig = {
            root: conf.root,
            timeout: conf.serviceTimeout || 3000
        };

        const providers: Provider[] = [
            ...entityDataModule.providers,
            ...EffectsModule.forRoot([]).providers,
            ...StoreModule.forRoot({}, {}).providers,
            ...(conf.enableDevtools
                ? [
                      StoreDevtoolsModule.instrument({
                          maxAge: 25,
                          logOnly: false
                      }).providers
                  ]
                : []),

            { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },

            { provide: ENTITY_MODEL_MAP, useValue: conf.entities },
            { provide: EntityMetaOptionsService, useClass: DefaultEntityMetaOptionsService },
            { provide: HttpUrlGenerator, useClass: DefaultHttpUrlGenerator },
            { provide: DefaultDataServiceFactory, useClass: EntityStoreServerServiceFactory }
        ];

        return {
            ngModule: FundamentalRootStoreModule,
            providers
        };
    }

    static forFeature(conf: FundamentalStoreConfig): ModuleWithProviders<FundamentalStoreModule> {
        throw Error('FundamentalStoreModule.forFeature() is not implemented yet');
    }
}
