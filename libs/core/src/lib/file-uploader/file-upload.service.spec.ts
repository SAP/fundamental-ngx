import { FileUploaderService, FileUploadOutput } from './file-uploader.service';


describe('FileUploadService', () => {
    const service: FileUploaderService = new FileUploaderService();
    const anyService = <any>service;

    const fileSource: Partial<File>[] = [
        { name: 'image.png', size: 110000 },
        { name: 'image.jpeg', size: 1000 },
        { name: 'music.mp3', size: 50000 },
        { name: 'video.avi', size: 9000000 },
        { name: 'text.txt', size: 123 }
    ];

    it('should valid files with min size', () => {
        const files: FileUploadOutput = service.validateFiles(
            <any>fileSource,
            '1KB',
            '',
            null)
        expect(files.validFiles.length).toBe(3);
        expect(files.invalidFiles.length).toBe(2);
    });

    it('should valid files with max size', () => {
        const files: FileUploadOutput = service.validateFiles(
            <any>fileSource,
            '',
            '1KB',
            null)
        expect(files.validFiles.length).toBe(2);
        expect(files.invalidFiles.length).toBe(3);
    });

    it('should valid files with max size and min size', () => {
        const files: FileUploadOutput = service.validateFiles(
            <any>fileSource,
            '500byte',
            '10Kb',
            null)
        expect(files.validFiles.length).toBe(1);
        expect(files.invalidFiles.length).toBe(4);
    });

    it('should valid files with max size and min size and extension', () => {
        const files: FileUploadOutput = service.validateFiles(
            <any>fileSource,
            '2KB',
            '1Mb',
            'png, jpeg, mp3')
        expect(files.validFiles.length).toBe(2);
        expect(files.invalidFiles.length).toBe(3);
    });

    it('should valid files with extension', () => {
        const files: FileUploadOutput = service.validateFiles(
            <any>fileSource,
            '',
            '',
            'png, jpeg, mp3')
        expect(files.validFiles.length).toBe(3);
        expect(files.invalidFiles.length).toBe(2);
    });

    it('should verify diffrent valid file size of parsing', () => {
        let size;
        size = anyService._parseFileSize('2byte');
        expect(size === 2);
        size = anyService._parseFileSize('2KB');
        expect(size === 2048);
        size = anyService._parseFileSize('5kb');
        expect(size === 5120);
        size = anyService._parseFileSize('12Mb ');
        expect(size === 12582912);
        size = anyService._parseFileSize('2 gb');
        expect(size === 2147483648);
        size = anyService._parseFileSize('2 k b');
        expect(size === 2048);
        size = anyService._parseFileSize('120');
        expect(size === 120);
    });


    it('should verify diffrent invalid file size of parsing', () => {

        expect(function (): void {
            anyService._parseFileSize('KB')
        }).toThrow(new Error('FileSizeError - Invalid File size please check.'));

        expect(function (): void {
            anyService._parseFileSize('hb')
        }).toThrow(new Error('FileSizeError - Invalid File size please check.'));

        expect(function (): void {
            anyService._parseFileSize('2vf')
        }).toThrow(new Error('FileSizeError - Invalid File size please check.'));

        expect(function (): void {
            anyService._parseFileSize('gb3')
        }).toThrow(new Error('FileSizeError - Invalid File size please check.'));

    });
});
