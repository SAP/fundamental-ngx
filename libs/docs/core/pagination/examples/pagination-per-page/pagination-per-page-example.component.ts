import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { PaginationModule } from '@fundamental-ngx/core/pagination';

@Component({
    selector: 'fd-pagination-per-page-example',
    templateUrl: './pagination-per-page-example.component.html',
    standalone: true,
    imports: [PaginationModule, ToolbarItemDirective, SegmentedButtonModule, FormsModule, NgFor, ButtonModule]
})
export class PaginationPerPageExampleComponent {
    totalItems = 150;
    currentPage1 = 2;
    currentPage2 = 2;
    currentPage3 = 2;

    customItemsPerPage = 5;

    pageChanged1(event: number): void {
        this.currentPage1 = event;
    }
    pageChanged2(event: number): void {
        this.currentPage2 = event;
    }
    pageChanged3(event: number): void {
        this.currentPage3 = event;
    }
}
