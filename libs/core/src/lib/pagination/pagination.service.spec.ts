import { TestBed, inject } from '@angular/core/testing';
import { PaginationService } from './pagination.service';
import { Pagination } from './pagination.model';

describe('PaginationService', () => {
    let service: PaginationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaginationService]
        });
        service = TestBed.get(PaginationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should default to 10 pages per page', () => {
        const pages = service.getPages({ totalItems: 10, itemsPerPage: null });
        expect(pages.length).toEqual(1);
    });

    it('should default to first current page', () => {
        const pagination: Pagination = { totalItems: 10, itemsPerPage: 2 };
        const pages = service.validate(pagination);
        expect(pagination.currentPage).toEqual(1);
    });

    it('should calc 5 pages', () => {
        const total = service.getTotalPages({ totalItems: 50, itemsPerPage: 10 });
        expect(total).toEqual(5);
    });

    it('should calc 4 pages', () => {
        const total = service.getTotalPages({ totalItems: 39, itemsPerPage: 10 });
        expect(total).toEqual(4);
    });

    it('should calc 3 pages', () => {
        const total = service.getTotalPages({ totalItems: 21, itemsPerPage: 10 });
        expect(total).toEqual(3);
    });

    it('should default to 10 items per page', () => {
        const pagination: Pagination = {
            totalItems: 10
        };
        service.validate(pagination);
        expect(pagination.itemsPerPage).toEqual(service.DEFAULT_ITEMS_PER_PAGE);
    });

    it('should default to first page', () => {
        const pagination: Pagination = {
            totalItems: 10
        };
        service.validate(pagination);
        expect(pagination.currentPage).toEqual(1);
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
            totalItems: 50,
            itemsPerPage: 10
        };
        const pages = service.getPages(pagination);
        expect(pages[3]).toEqual(service.MORE);
    });

    it('should have two dots sections', () => {
        const pagination: Pagination = {
            totalItems: 100,
            itemsPerPage: 10,
            currentPage: 4
        };
        const pages = service.getPages(pagination);
        expect(pages[1]).toEqual(service.MORE);
        expect(pages[5]).toEqual(service.MORE);
    });

    it('should not have two dots sections if second to last page is currentPage', () => {
        const pagination: Pagination = {
            totalItems: 150,
            itemsPerPage: 2,
            currentPage: 73
        };
        const pages = service.getPages(pagination);
        expect(pages[1]).toEqual(service.MORE);
        expect(pages[5]).not.toEqual(service.MORE);
        expect(pages[5]).toEqual(75);
    })
});
