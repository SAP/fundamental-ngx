import { HashService } from './hash.service';

describe('HashService', () => {
    let service: HashService;
    beforeEach(() => {
        service = new HashService();
    });

    it('Should return "FUI" plus a generated hash value', () => {
        spyOn(Math, 'random').and.returnValue(1);
        expect(service.hash()).toBe('FUI1000000');
    });
});
