import { inject, Injectable } from '@angular/core';
import { CORE_PACKAGE_JSON, PACKAGE_JSON } from '../tokens/package-json.token';

@Injectable()
export class DocsService {
    private _packageJson: Record<string, any> = inject(PACKAGE_JSON);
    private _corePackageJson: Record<string, any> = inject(CORE_PACKAGE_JSON);

    getPackageJson(): Record<string, any> {
        return this._packageJson;
    }

    /**
     * Get version from core library's package.json
     * @returns The current library version
     */
    getVersion(): string {
        return this._corePackageJson.version;
    }
}
