import { Injectable } from '@angular/core';

const fileSizeMap = new Map([['KB', 1024], ['MB', 1048576], ['GB', 1073741824], ['TB', 1099511627776]]);

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
        acceptedExtensions: string
    ): FileUploadOutput {
        const maxSize = this._parseFileSize(maxFileSize);
        const minSize = this._parseFileSize(minFileSize);

        let allowedExtensions = null;
        if (acceptedExtensions) {
            allowedExtensions = acceptedExtensions.toLocaleLowerCase().replace(/[\s.]/g, '').split(',')
        }

        const fileUploadOutput: FileUploadOutput = {};

        fileUploadOutput.validFiles =
            files.filter(file => this._checkSize(file.size, maxSize, minSize) && this._checkExtension(file, allowedExtensions));
        fileUploadOutput.invalidFiles =
            files.filter(file => !this._checkSize(file.size, maxSize, minSize) || !this._checkExtension(file, allowedExtensions));

        return fileUploadOutput;
    }

    /** @hidden */
    private _checkExtension(file: File, allowedExtensions: string[]): boolean {
        const extension = file.name.split('.')[file.name.split('.').length - 1];
        return !allowedExtensions || allowedExtensions.lastIndexOf(extension) !== -1;
    }

    private _parseFileSize(fileSize: string): number {

        if (fileSize === '') {
            return 0;
        }
        const sizes = fileSize.match(/[\d\.]+|\D+/g);
        if (sizes.length > 1) {
            const size = Number(sizes[0].replace(/ +/g, ''));
            const unit = sizes[1].replace(/ +/g, '').toUpperCase();
            if (isNaN(size)) {
                throw new Error('FileSizeError - Invalid File size please check.');
            } else if (unit === 'B' || unit === 'BYTE' || unit === 'BYTES') {
                return size;
            } else if (unit === 'KB') {
                return fileSizeMap.get(unit) * size;
            } else if (unit === 'MB') {
                return fileSizeMap.get(unit) * size;
            } else if (unit === 'GB') {
                return fileSizeMap.get(unit) * size;
            } else if (unit === 'TB') {
                return fileSizeMap.get(unit) * size;
            } else {
                throw new Error('FileSizeError - Invalid File size please check.');
            }
        } else {
            if (isNaN(Number(sizes))) {
                throw new Error('FileSizeError - Invalid File size please check.');
            }
            return (Number(sizes));
        }
    }

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
