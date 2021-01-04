import { Component } from '@angular/core';

import { TableDataSource } from '@fundamental-ngx/platform';

import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-p13-example',
    templateUrl: './platform-table-p13-example.component.html'
})
export class PlatformTableP13ExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());
}

@Component({
    selector: 'fdp-table-p13-columns-example',
    templateUrl: './platform-table-p13-columns-example.component.html'
})
export class PlatformTableP13ColumnsExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());
}


@Component({
    selector: 'fdp-table-p13-sort-example',
    templateUrl: './platform-table-p13-sort-example.component.html'
})
export class PlatformTableP13SortExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());
}

@Component({
    selector: 'fdp-table-p13-filter-example',
    templateUrl: './platform-table-p13-filter-example.component.html'
})
export class PlatformTableP13FilterExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());
}

@Component({
    selector: 'fdp-table-p13-group-example',
    templateUrl: './platform-table-p13-group-example.component.html'
})
export class PlatformTableP13GroupExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());
}
