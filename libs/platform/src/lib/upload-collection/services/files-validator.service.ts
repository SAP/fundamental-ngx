import { Injectable } from '@angular/core';

import { parserFileSize } from '@fundamental-ngx/cdk/utils';
import { FilesValidatorOutput, FilesValidatorParams } from '../models/upload-collection.models';

@Injectable({ providedIn: 'root' })
export class FilesValidatorService {
    /**
     * Method that validates files passed. It is based on
     * @param files File[]
     * @param params ValidateFilesParams
     */
    validation(
        files: File[],
        { maxFileNameLength, fileTypes, maxFileSize, mimeTypes }: FilesValidatorParams
    ): FilesValidatorOutput {
        return files.reduce((res, file) => {
            if (
                (fileTypes && fileTypes.length > 0 && this._checkByFileExtension(file, fileTypes)) ||
                (mimeTypes && mimeTypes.length > 0 && this._checkByMimeType(file, mimeTypes))
            ) {
                if (!res.typeMismatch) {
                    res.typeMismatch = [];
                }

                res.typeMismatch.push(file);

                return res;
            }

            if (maxFileSize) {
                const maxSize = parserFileSize(maxFileSize);
                if (file.size > maxSize) {
                    if (!res.fileSizeExceed) {
                        res.fileSizeExceed = [];
                    }

                    res.fileSizeExceed.push(file);

                    return res;
                }
            }

            if (typeof maxFileNameLength === 'number' && this._checkByFileNameLength(file, maxFileNameLength)) {
                if (!res.filenameLengthExceed) {
                    res.filenameLengthExceed = [];
                }

                res.filenameLengthExceed.push(file);

                return res;
            }

            if (!res.validFiles) {
                res.validFiles = [];
            }

            res.validFiles.push(file);

            return res;
        }, {} as FilesValidatorOutput);
    }

    /** @hidden */
    private _checkByFileExtension(file: File, fileTypes: string[]): boolean {
        const fileNameSplit = file.name.split('.');
        const extension = fileNameSplit[fileNameSplit.length - 1].toLocaleLowerCase();

        return !fileTypes.some((type) => type.replace('.', '').toLowerCase() === extension);
    }

    /** @hidden */
    private _checkByMimeType(file: File, mimeTypes: string[]): boolean {
        return !mimeTypes.some((type) => type.toLowerCase() === file.type);
    }

    /** @hidden */
    private _checkByFileNameLength(file: File, maxFileNameLength: number): boolean {
        const fileNameSplit = file.name.split('.');
        fileNameSplit.pop();
        const fileName = fileNameSplit.join('.');

        return fileName.length > maxFileNameLength;
    }
}
