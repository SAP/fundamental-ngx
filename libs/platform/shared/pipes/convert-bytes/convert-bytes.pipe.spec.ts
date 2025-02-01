import { ConvertBytesPipe } from './convert-bytes.pipe';

describe('Pipe: ConvertBytesPipe', () => {
    let pipe: ConvertBytesPipe;

    beforeEach(() => {
        pipe = new ConvertBytesPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should show 0 if a negative value', () => {
        const result = pipe.transform(-10);
        expect(result).toEqual('0 Bytes');
    });

    it('should convert bytes to bytes label', () => {
        const result = pipe.transform(500);
        expect(result).toEqual('500 Bytes');
    });

    it('should convert bytes to kilobytes label', () => {
        const result = pipe.transform(1024);
        expect(result).toEqual('1 KB');
    });

    it('should convert bytes to megabytes label', () => {
        const result = pipe.transform(1024 * 1024);
        expect(result).toEqual('1 MB');
    });

    it('should convert bytes to gigabytes label', () => {
        const result = pipe.transform(5614165161);
        expect(result).toEqual('5.23 GB');
    });

    it('should convert bytes to terabytes label', () => {
        const result = pipe.transform(45645645646456);
        expect(result).toEqual('41.51 TB');
    });

    it('should convert bytes to petabytes label', () => {
        const result = pipe.transform(7878534525234456);
        expect(result).toEqual('7 PB');
    });


    it('should convert bytes to exabyte label', () => {
        const result = pipe.transform(Number(4684567346346346345n));
        expect(result).toEqual('4.06 EB');
    });

    it('should convert bytes to zettabyte label', () => {
        const result = pipe.transform(Number(5685685673452523537484n));
        expect(result).toEqual('4.82 ZB');
    });

    it('should convert bytes to yottabyte label', () => {
        const result = pipe.transform(Number(5685685673452523537484568n));
        expect(result).toEqual('4.7 YB');
    });
});
