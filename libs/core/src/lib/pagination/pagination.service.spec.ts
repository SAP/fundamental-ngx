import { TestBed } from '@angular/core/testing';
import { PaginationService } from './pagination.service';
import { Pagination } from './pagination.model';

describe('PaginationService', () => {
    let service: PaginationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaginationService]
        });
        service = TestBed.inject(PaginationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getPages', () => {
        it('should not truncate pages if <= 9pages', () => {
            const pages = service.getPages({ totalItems: 180, itemsPerPage: 20, currentPage: 5 });

            expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('should truncate and has a buffer as the penultimate value', () => {
            const pages = service.getPages({ totalItems: 200, itemsPerPage: 20, currentPage: 4 });

            expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7, -1, 10]);
        });

        it('should truncate and has a buffer as the second value', () => {
            const pages = service.getPages({ totalItems: 200, itemsPerPage: 20, currentPage: 8 });

            expect(pages).toEqual([1, -1, 4, 5, 6, 7, 8, 9, 10]);
        });

        it('should truncate and has a buffers as the second and penultimate values', () => {
            const pages = service.getPages({ totalItems: 220, itemsPerPage: 20, currentPage: 6 });

            expect(pages).toEqual([1, -1, 4, 5, 6, 7, 8, -1, 11]);
        });
    });

    describe('getTotalPages', () => {
        it('should return pages count', () => {
            expect(service.getTotalPages({ totalItems: 50, itemsPerPage: 10 })).toEqual(5);
            expect(service.getTotalPages({ totalItems: 39, itemsPerPage: 10 })).toEqual(4);
            expect(service.getTotalPages({ totalItems: 21, itemsPerPage: 10 })).toEqual(3);
        });

        it('should return 0 if itemsPerPage is 0', () => {
            const total = service.getTotalPages({ totalItems: 21, itemsPerPage: 0 });
            expect(total).toEqual(0);
        });

        it('should return 0 if itemsPerPage is empty', () => {
            let total = service.getTotalPages({ totalItems: 21, itemsPerPage: null });
            expect(total).toEqual(0);
            total = service.getTotalPages({ totalItems: 21, itemsPerPage: undefined });
            expect(total).toEqual(0);
        });
    });

    it('should calc 3 pages', () => {
        const pagination: Pagination = {
            totalItems: 30,
            itemsPerPage: 10
        };
        const pages = service.getPages(pagination);
        expect(pages.length).toEqual(3);
    });

    it('should have one dots section', () => {
        const pagination: Pagination = {
            totalItems: 100,
            itemsPerPage: 10
        };

        // pages:   1 2 3 4 5 6 7 ... 100
        // indexes: 0 1 2 3 4 5 6 7   8

        const pages = service.getPages(pagination);

        expect(pages[7]).toEqual(service.moreElementValue);
    });

    it('should have two dots sections', () => {
        const pagination: Pagination = {
            totalItems: 110,
            itemsPerPage: 10,
            currentPage: 6
        };

        // pages:   1 .. 4 5 6 7 8 ... 100
        // indexes: 0 1  2 3 4 5 6 7   8

        const pages = service.getPages(pagination);

        expect(pages[1]).toEqual(service.moreElementValue);
        expect(pages[7]).toEqual(service.moreElementValue);
    });

    it('should not have two dots sections if second to last page is currentPage', () => {
        const pagination: Pagination = {
            totalItems: 150,
            itemsPerPage: 2,
            currentPage: 73
        };

        // pages:   1 .. 69 70 71 72 73 74 75
        // indexes: 0 1  2  3  4  5  6  7  8

        const pages = service.getPages(pagination);

        expect(pages[1]).toEqual(service.moreElementValue);
        expect(pages.filter((value) => value === service.moreElementValue).length).toEqual(1);
    });
});
