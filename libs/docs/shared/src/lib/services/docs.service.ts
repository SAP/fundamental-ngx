import { inject, Injectable } from '@angular/core';
import { PACKAGE_JSON } from '../tokens/package-json.token';
import { LERNA_JSON } from '../tokens/lerna-json.token';

@Injectable()
export class DocsService {
    private _packageJson: Record<string, any> = inject(PACKAGE_JSON);
    private _lernaJson: Record<string, any> = inject(LERNA_JSON);

    getPackageJson(): Record<string, any> {
        return this._packageJson;
    }

    getLernaJson(): Record<string, any> {
        return this._lernaJson;
    }

    rawFileContents(path: string): Promise<string> {
        return import(`!${path}?raw`);
    }
}
