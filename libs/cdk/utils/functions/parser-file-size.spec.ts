import { parserFileSize } from './parser-file-size';

describe('parserFileSize', () => {
    it('should verify diffrent valid file size of parsing', () => {
        let size;
        size = parserFileSize('2byte');
        expect(size === 2);
        size = parserFileSize('2KB');
        expect(size === 2048);
        size = parserFileSize('5kb');
        expect(size === 5120);
        size = parserFileSize('12Mb ');
        expect(size === 12582912);
        size = parserFileSize('2 gb');
        expect(size === 2147483648);
        size = parserFileSize('2 k b');
        expect(size === 2048);
        size = parserFileSize('120');
        expect(size === 120);
    });

    it('should verify diffrent invalid file size of parsing', () => {
        expect((): void => {
            parserFileSize('KB');
        }).toThrow(new Error('FileSizeError - Invalid File size please check.'));

        expect((): void => {
            parserFileSize('hb');
        }).toThrow(new Error('FileSizeError - Invalid File size please check.'));

        expect((): void => {
            parserFileSize('2vf');
        }).toThrow(new Error('FileSizeError - Invalid File size please check.'));

        expect((): void => {
            parserFileSize('gb3');
        }).toThrow(new Error('FileSizeError - Invalid File size please check.'));
    });
});
