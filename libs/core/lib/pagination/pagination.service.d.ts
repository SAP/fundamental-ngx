import { Pagination } from './pagination.model';
/**
 * Service that is used to retrieve all the pages,
 * the number of pages,
 * and to validate the pagination object.
 */
export declare class PaginationService {
    /** Constant representing the default number of items per page. */
    DEFAULT_ITEMS_PER_PAGE: number;
    /** @hidden */
    MORE: number;
    /** @hidden */
    constructor();
    /**
     * Returns a number array representing the pages of the pagination object.
     * @param pagination An object of type *Pagination*.
     */
    getPages(pagination: Pagination): number[];
    /**
     * Retrieves the total number of pages.
     * @param pagination An object of type *Pagination*.
     */
    getTotalPages(pagination: Pagination): number;
    /**
     * Provides validation for the pagination object.
     * @param pagination An object of type *Pagination*.
     */
    validate(pagination: Pagination): void;
}
