import { Component } from '@angular/core';

import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';
import { TableDataSource } from '@fundamental-ngx/platform';

import { TableDataProviderExample, ExampleItem } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-p13-example',
    templateUrl: './platform-table-p13-example.component.html'
})
export class PlatformTableP13ExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }
}

@Component({
    selector: 'fdp-table-p13-columns-example',
    templateUrl: './platform-table-p13-columns-example.component.html'
})
export class PlatformTableP13ColumnsExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }
}

@Component({
    selector: 'fdp-table-p13-sort-example',
    templateUrl: './platform-table-p13-sort-example.component.html'
})
export class PlatformTableP13SortExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }
}

@Component({
    selector: 'fdp-table-p13-filter-example',
    templateUrl: './platform-table-p13-filter-example.component.html'
})
export class PlatformTableP13FilterExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }
}

@Component({
    selector: 'fdp-table-p13-group-example',
    templateUrl: './platform-table-p13-group-example.component.html'
})
export class PlatformTableP13GroupExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }
}
