import { Component } from '@angular/core';
import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-pagination-mobile-example',
    templateUrl: './pagination-mobile-example.component.html',
    imports: [PaginationModule, ToolbarItemDirective]
})
export class PaginationMobileExampleComponent {
    totalItems = 50;
    currentPage = 2;

    onPageChange(page: number): void {
        this.currentPage = page;
    }
}
