import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgClass } from '@angular/common';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule, ListSecondaryDirective } from '@fundamental-ngx/core/list';
import { ToolbarComponent, ToolbarLabelDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';

const sort = (a, b, key?: string): number => {
    if (key) {
        return a[key] > b[key] ? 1 : -1;
    } else {
        return a > b ? 1 : -1;
    }
};

@Pipe({
    name: 'sortBy',
    pure: false,
    standalone: true
})
export class SortByPipe implements PipeTransform {
    transform(tableRows: any[], ascending: boolean, sortKey?: string): any[] {
        const ascModifier: number = ascending ? 1 : -1;
        tableRows.sort((a, b) => sort(a, b, sortKey) * ascModifier);
        return tableRows;
    }
}

@Component({
    selector: 'fd-list-data-example',
    templateUrl: './list-data-example.component.html',
    styleUrls: ['./list-data-example.component.scss'],
    imports: [
        ToolbarComponent,
        ToolbarLabelDirective,
        ToolbarSpacerDirective,
        InputGroupModule,
        FormsModule,
        ButtonComponent,
        ListModule,
        NgClass,
        ListSecondaryDirective,
        SortByPipe
    ]
})
export class ListDataExampleComponent implements OnInit {
    items = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];

    ascendingSort = true;

    displayedItems: string[] = [];

    searchTerm = '';

    constructor(private liveAnnouncer: LiveAnnouncer) {}

    ngOnInit(): void {
        this.handleSearchTermChange('');
    }

    removeItem(index: number): void {
        const allValuesIndex = this.items.indexOf(this.displayedItems[index]);
        this.items.splice(allValuesIndex, 1);
        this.displayedItems.splice(index, 1);
    }

    handleSearchTermChange(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.displayedItems = this.items.filter((item) =>
            item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    }

    changeSort(ascending: boolean): void {
        this.ascendingSort = ascending;
        this.liveAnnouncer.clear();
        this.liveAnnouncer.announce(ascending ? 'ascending' : 'descending', 'assertive');
    }
}
