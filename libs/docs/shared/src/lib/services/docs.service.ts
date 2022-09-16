import { Inject, Injectable } from '@angular/core';
import { PACKAGE_JSON } from '../tokens/package-json.token';

@Injectable()
export class DocsService {
    constructor(@Inject(PACKAGE_JSON) private _packageJson: Record<string, any>) {}

    getPackageJson(): Record<string, any> {
        return this._packageJson;
    }

    rawFileContents(path: string): Promise<string> {
        return import(`!${path}?raw`);
    }
}
