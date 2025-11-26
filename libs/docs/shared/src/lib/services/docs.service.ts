import { inject, Injectable } from '@angular/core';
import { PACKAGE_JSON } from '../tokens/package-json.token';

@Injectable()
export class DocsService {
    private _packageJson: Record<string, any> = inject(PACKAGE_JSON);

    getPackageJson(): Record<string, any> {
        return this._packageJson;
    }

    /**
     * Get version from package.json (NX Release maintains version in root package.json)
     * @returns The current monorepo version
     */
    getVersion(): string {
        return this._packageJson.version;
    }
}
