import { Injectable } from "@angular/core";
import { validateConfig } from "@angular/router/src/config";

const DISPLAY_NUM_PAGES = 3;
const MORE = -1;

@Injectable()
export class PaginationService {
    constructor() {}
    
    public calculatePagination(current: number, total: number): number[] {
        const pages = [];

        if (total <= DISPLAY_NUM_PAGES) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (current <= DISPLAY_NUM_PAGES) {
                for (let i = 1; i <= DISPLAY_NUM_PAGES; i++) {
                    pages.push(i);
                }
                pages.push(MORE);
                pages.push(total);
            } else if (current > total - (DISPLAY_NUM_PAGES - 1)) {
                pages.push(1);
                pages.push(MORE);
                for (let i = total - (DISPLAY_NUM_PAGES - 1); i <= total; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push(MORE);
                const buffer = Math.floor(DISPLAY_NUM_PAGES / 2);
                for (let i = current - buffer; i <= current + buffer; i++) {
                    pages.push(i);
                }
                pages.push(MORE);
                pages.push(total);
            }
        }
        return pages;
    }
}


