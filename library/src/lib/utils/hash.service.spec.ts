import { HashService } from './hash.service';

describe('HashService', () => {
    let service: HashService;
    beforeEach(() => {
        service = new HashService();
    });

    it('Should return "FUI" plus a generated hash value', () => {
        const retVal = service.hash();
        const newVal = service.hash();
        expect(newVal).toBe(retVal + 1);
    });
});
