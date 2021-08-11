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
        it('should not truncate pages', () => {
            const pages = service.getPages({ totalItems: 140, itemsPerPage: 20, currentPage: 1 });
            expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7]);
        });
        it('should truncate and has a buffer as the penultimate value', () => {
            const pages = service.getPages({ totalItems: 160, itemsPerPage: 20, currentPage: 1 });
            expect(pages).toEqual([1, 2, 3, -1, 8]);
        });

        it('should truncate and has a buffer as the second value', () => {
            const pages = service.getPages({ totalItems: 160, itemsPerPage: 20, currentPage: 8 });
            expect(pages).toEqual([1, -1, 6, 7, 8]);
        });

        it('should truncate and has a buffers as the second and penultimate values', () => {
            const pages = service.getPages({ totalItems: 160, itemsPerPage: 20, currentPage: 5 });
            expect(pages).toEqual([1, -1, 4, 5, 6, -1, 8]);
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
        const pages = service.getPages(pagination);
        expect(pages[3]).toEqual(service.buffer);
    });

    it('should have two dots sections', () => {
        const pagination: Pagination = {
            totalItems: 100,
            itemsPerPage: 10,
            currentPage: 4
        };
        const pages = service.getPages(pagination);
        expect(pages[1]).toEqual(service.buffer);
        expect(pages[5]).toEqual(service.buffer);
    });

    it('should not have two dots sections if second to last page is currentPage', () => {
        const pagination: Pagination = {
            totalItems: 150,
            itemsPerPage: 2,
            currentPage: 73
        };
        const pages = service.getPages(pagination);
        expect(pages[1]).toEqual(service.buffer);
        expect(pages[5]).not.toEqual(service.buffer);
        expect(pages[5]).toEqual(75);
    });
});
