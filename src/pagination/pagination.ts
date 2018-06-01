import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

export interface PaginationObject {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

enum PaginationPageType {
  More = -1
}

@Component({
  selector: 'fd-pagination',
  template: `
  <div class="fd-pagination">
    <span class="fd-pagination__total">{{ pagination.totalItems }} items</span>
    <nav class="fd-pagination__nav">
      <a class="fd-pagination__link fd-pagination__link--previous" aria-label="Previous"
          [attr.aria-disabled]="pagination.currentPage === 1 ? true : null" 
          (click)="goToPage(pagination.currentPage - 1)">
      </a>
      <a class="fd-pagination__link" *ngFor="let page of pages">
        <a href="#"  class="fd-pagination__link"
           (click)="goToPage(page, $event)"
           *ngIf="page !== -1; else more"
           [attr.aria-selected]="pagination.currentPage === page">{{page}}</a>
        <ng-template #more>
          <span class="fd-pagination__link fd-pagination__link--more"
            aria-hidden="true"
            aria-label="..."
            role="presentation"></span>
        </ng-template>
      </a>
      <a class="fd-pagination__link fd-pagination__link--next" aria-label="Next"
          [attr.aria-disabled]="pagination.currentPage === total ? true : null"
          (click)="goToPage(pagination.currentPage + 1)">
      </a>
    </nav>
  </div>
  `
})
export class Pagination implements OnChanges {

  private static readonly displayNumPages = 3;

  @Input()
  pagination: PaginationObject;

  @Output()
  selected = new EventEmitter<number>();

  total: number;

  pages: number[];

  ngOnChanges() {
    this.total = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);

    if (this.pagination.currentPage > this.total || this.pagination.currentPage < 1) {
      throw new Error(`Pagination requires a current page ${this.pagination.currentPage} below ${this.total} or greater than 0`);
    }

    this.calculatePagination(this.pagination.currentPage);
  }

  calculatePagination(current: number) {
    const pages = [];

    if (this.total <= Pagination.displayNumPages) {
      for (let i = 1; i <= this.total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= Pagination.displayNumPages) {
        for (let i = 1; i <= Pagination.displayNumPages; i++) {
          pages.push(i);
        }
        pages.push(PaginationPageType.More);
        pages.push(this.total);
      } else if (current > (this.total - (Pagination.displayNumPages - 1))) {
        pages.push(1);
        pages.push(PaginationPageType.More);
        for (let i = this.total - (Pagination.displayNumPages - 1); i <= this.total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(PaginationPageType.More);
        const buffer = Math.floor(Pagination.displayNumPages / 2);
        for (let i = current - buffer; i <= current + buffer; i++) {
          pages.push(i);
        }
        pages.push(PaginationPageType.More);
        pages.push(this.total);
      }
    }

    this.pages = pages;
  }

  goToPage(page: number, $event: MouseEvent) {
    if ($event) {
      $event.preventDefault();
    }
    if (page > this.total || page < 1) {
      return;
    }
    this.pagination.currentPage = page;
    this.calculatePagination(page);
    this.selected.emit(page);
  }

}
