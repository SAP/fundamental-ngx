import { FileUploaderService, FileUploadOutput } from './file-uploader.service';

describe('FileUploadService', () => {
    const service: FileUploaderService = new FileUploaderService();

    const fileSource: Partial<File>[] = [
        { name: 'image.png', size: 110000 },
        { name: 'image.jpeg', size: 1000 },
        { name: 'music.mp3', size: 50000 },
        { name: 'video.avi', size: 9000000 },
        { name: 'text.txt', size: 123 },
        { name: 'image.PNG', size: 110000 },
        { name: 'image.JPEG', size: 1000 },
        { name: 'music.MP3', size: 50000 },
        { name: 'video.AVI', size: 9000000 },
        { name: 'text.TXT', size: 123 }
    ];

    it('should valid files with min size', () => {
        const files: FileUploadOutput = service.validateFiles(<any>fileSource, '1KB', '', null);
        expect(files.validFiles?.length).toBe(6);
        expect(files.invalidFiles?.length).toBe(4);
    });

    it('should valid files with max size', () => {
        const files: FileUploadOutput = service.validateFiles(<any>fileSource, '', '1KB', null);
        expect(files.validFiles?.length).toBe(4);
        expect(files.invalidFiles?.length).toBe(6);
    });

    it('should valid files with max size and min size', () => {
        const files: FileUploadOutput = service.validateFiles(<any>fileSource, '500byte', '10Kb', null);
        expect(files.validFiles?.length).toBe(2);
        expect(files.invalidFiles?.length).toBe(8);
    });

    it('should valid files with max size and min size and extension', () => {
        const files: FileUploadOutput = service.validateFiles(<any>fileSource, '2KB', '1Mb', 'png, jpeg, mp3');
        expect(files.validFiles?.length).toBe(4);
        expect(files.invalidFiles?.length).toBe(6);
    });

    it('should valid files with extension', () => {
        const files: FileUploadOutput = service.validateFiles(<any>fileSource, '', '', 'png, jpeg, mp3');
        expect(files.validFiles?.length).toBe(6);
        expect(files.invalidFiles?.length).toBe(4);
    });
});
