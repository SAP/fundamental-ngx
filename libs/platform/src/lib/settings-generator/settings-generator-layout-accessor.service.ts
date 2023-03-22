import { Injectable, Type } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { BaseSettingsGeneratorLayout } from './layouts/base-settings-generator-layout';

/**
 * Service, used as a registry of the available layouts for Settings Generator Component.
 */
@Injectable()
export class SettingsGeneratorLayoutAccessorService {
    /** @hidden */
    private readonly _layouts = new Map<string, Type<BaseSettingsGeneratorLayout>>();

    /**
     * Adds custom layout component to layouts registry for later usage with Settings Generator component.
     * @param layoutName Name of the Layout
     * @param layoutComponent Component type to be used for defined layout.
     */
    addLayout(layoutName: string, layoutComponent: Type<BaseSettingsGeneratorLayout>): void {
        this._layouts.set(layoutName, layoutComponent);
    }

    /**
     * Gets Component type for defined layout.
     * @param layoutName
     */
    getLayout(layoutName: string): Nullable<Type<BaseSettingsGeneratorLayout>> {
        return this._layouts.get(layoutName);
    }
}
