import { Injectable } from '@angular/core';

import { parserFileSize } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';

export interface FileUploadOutput {
    validFiles?: File[];
    invalidFiles?: File[];
}

@Injectable({ providedIn: 'root' })
export class FileUploaderService {
    /**
     * Method that validates files passed. It is based on
     * @param files File[]
     * @param minFileSize string
     * @param maxFileSize string
     * @param acceptedExtensions string
     */
    validateFiles(
        files: File[],
        minFileSize: string,
        maxFileSize: string,
        acceptedExtensions: Nullable<string>
    ): FileUploadOutput {
        const maxSize = parserFileSize(maxFileSize);
        const minSize = parserFileSize(minFileSize);

        let allowedExtensions: string[] | null = null;
        if (acceptedExtensions) {
            allowedExtensions = acceptedExtensions.toLocaleLowerCase().replace(/[\s.]/g, '').split(',');
        }

        const fileUploadOutput: FileUploadOutput = {};

        fileUploadOutput.validFiles = files.filter(
            (file) => this._checkSize(file.size, maxSize, minSize) && this._checkExtension(file, allowedExtensions)
        );
        fileUploadOutput.invalidFiles = files.filter(
            (file) => !this._checkSize(file.size, maxSize, minSize) || !this._checkExtension(file, allowedExtensions)
        );

        return fileUploadOutput;
    }

    /** @hidden */
    private _checkExtension(file: File, allowedExtensions: string[] | null): boolean {
        if (!allowedExtensions) {
            return true;
        }
        const extension = file.name.split('.')[file.name.split('.').length - 1].toLocaleLowerCase();
        return allowedExtensions.lastIndexOf(extension) !== -1;
    }

    /** @hidden */
    private _checkSize(fileSize: number, maxSize: number, minSize: number): boolean {
        if (maxSize && fileSize > maxSize) {
            return false;
        }
        if (minSize && fileSize < minSize) {
            return false;
        }
        return true;
    }
}
