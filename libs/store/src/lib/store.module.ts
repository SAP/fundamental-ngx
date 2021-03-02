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

import { EntityMetaOptionsService, DefaultEntityMetaOptionsService } from './infrastructure/persistence/utils';
import {
    DefaultEntityServerServiceFactory,
    DefaultHttpUrlGenerator,
    HttpUrlGenerator,
    DefaultEntityStoreBuilderFactory,
    EntityStoreBuilderFactory,
    EntityServerServiceFactoryResolver,
    EntityRestServerServiceFactory,
    EntityInMemoryServerServiceFactory,
    EntityLocalStorageServerServiceFactory
} from './infrastructure/persistence/store';
import { QueryAdapterFactory } from './infrastructure/persistence/query/query-adapter';
import { ENTITY_MODEL_MAP, FundamentalStoreConfig } from './infrastructure/configuration';

function mapFundamentalConfigToNgrxConfig(conf: FundamentalStoreConfig): EntityDataModuleConfig {
    const entityMetadata: EntityMetadataMap = {};
    const pluralNames: { [name: string]: string } = {};

    for (const entity in conf.entities) {
        if (conf.entities.hasOwnProperty(entity)) {
            entityMetadata[entity] = {};
        }
    }

    return { entityMetadata: entityMetadata, pluralNames: pluralNames };
}

@NgModule({
    imports: [StoreRootModule, EffectsRootModule, EntityDataModule]
})
export class FundamentalRootStoreModule {}

@NgModule({
    imports: [StoreFeatureModule, EffectsFeatureModule, EntityDataModule]
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
            timeout: conf.serviceTimeout
        };

        const providers: Provider[] = [
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
            ...entityDataModule.providers,

            { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },

            { provide: ENTITY_MODEL_MAP, useValue: conf.entities },
            { provide: EntityMetaOptionsService, useClass: DefaultEntityMetaOptionsService },
            { provide: EntityStoreBuilderFactory, useClass: DefaultEntityStoreBuilderFactory },

            QueryAdapterFactory,

            EntityServerServiceFactoryResolver,
            EntityRestServerServiceFactory,
            EntityInMemoryServerServiceFactory,
            EntityLocalStorageServerServiceFactory,
            { provide: DefaultDataServiceFactory, useClass: DefaultEntityServerServiceFactory },
            { provide: HttpUrlGenerator, useClass: DefaultHttpUrlGenerator }
        ];

        return {
            ngModule: FundamentalRootStoreModule,
            providers: providers
        };
    }

    static forFeature(conf: FundamentalStoreConfig): ModuleWithProviders<FundamentalStoreModule> {
        throw Error('FundamentalStoreModule.forFeature() is not implement yet');

        return {
            ngModule: FundamentalStoreModuleForFeature,
            providers: []
        };
    }
}
