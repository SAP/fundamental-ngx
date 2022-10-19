import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convertBytes' })
export class ConvertBytesPipe implements PipeTransform {
    /** @hidden */
    private readonly _sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    /** @hidden */
    transform(bytes: number): string {
        return this._convertBytes(bytes);
    }

    /**
     * Convert bytes to KB, MB, GB, ...
     * @param bytes number
     * @param decimals number
     */
    private _convertBytes(bytes = 0, decimals = 2): string {
        if (bytes <= 0) {
            return '0 Bytes';
        }

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + this._sizes[i];
    }
}
