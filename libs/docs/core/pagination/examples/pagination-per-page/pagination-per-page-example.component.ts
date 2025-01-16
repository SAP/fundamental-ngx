import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-pagination-per-page-example',
    templateUrl: './pagination-per-page-example.component.html',
    imports: [PaginationModule, ToolbarItemDirective, SegmentedButtonModule, FormsModule, ButtonComponent]
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
