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

        if (isNaN(size)) {
            throw new Error('FileSizeError - Invalid File size please check.');
        } else if (unit === 'B' || unit === 'BYTE' || unit === 'BYTES') {
            return size;
        } else if (unit === 'KB') {
            return fileSizeMap.get(unit)! * size;
        } else if (unit === 'MB') {
            return fileSizeMap.get(unit)! * size;
        } else if (unit === 'GB') {
            return fileSizeMap.get(unit)! * size;
        } else if (unit === 'TB') {
            return fileSizeMap.get(unit)! * size;
        } else {
            throw new Error('FileSizeError - Invalid File size please check.');
        }
    } else {
        if (isNaN(Number(sizes))) {
            throw new Error('FileSizeError - Invalid File size please check.');
        }

        return Number(sizes);
    }
}
