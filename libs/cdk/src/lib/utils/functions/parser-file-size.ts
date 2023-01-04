const fileSizeMap = new Map([
    ['KB', 1024],
    ['MB', 1048576],
    ['GB', 1073741824],
    ['TB', 1099511627776]
]);

/** Parse file size to bytes */
export function parserFileSize(fileSize: string): number {
    if (fileSize === '') {
        return 0;
    }

    const sizes = fileSize.match(/[\d.]+|\D+/g);
    if (sizes && sizes.length > 1) {
        const size = Number(sizes[0].replace(/ +/g, ''));
        const unit = sizes[1].replace(/ +/g, '').toUpperCase();
        const unitSize = fileSizeMap.get(unit);

        if (isNaN(size)) {
            throw new Error('FileSizeError - Invalid File size please check.');
        }
        if (unit === 'B' || unit === 'BYTE' || unit === 'BYTES') {
            return size;
        }
        if (!unitSize) {
            throw new Error('FileSizeError - Invalid File size please check.');
        } else {
            return unitSize * size;
        }
    } else {
        if (isNaN(Number(sizes))) {
            throw new Error('FileSizeError - Invalid File size please check.');
        }

        return Number(sizes);
    }
}
