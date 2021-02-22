import { InjectionToken } from "@angular/core";

import { Type } from "../../domain/decorators";

export interface FundamentalStoreConfig {
    root: string;
    entities: FundamentalEntityModelMap;
    serviceTimeout?: number;
    enableDevtools?: boolean;
}

export interface FundamentalEntityModelMap {
    [index: string]: Type<any>;
}

export const ENTITY_MODEL_MAP = new InjectionToken<FundamentalEntityModelMap>('ENTITY MODEL MAP');
