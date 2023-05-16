import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DataProvider } from '@fundamental-ngx/cdk/data-source';
import { FdTreeDataSource, TreeItem } from '@fundamental-ngx/core/tree';
import { delay, Observable, of } from 'rxjs';

let index = 0;
let totalIndex = 0;

@Component({
    selector: 'fd-lazily-loaded-tree-items-example',
    templateUrl: './lazily-loaded-tree-items-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazilyLoadedTreeItemsExampleComponent {
    model: TreeItem<AdditionalTreeItemData>;
    items = new ExampleObservableTreeDataSource();
}

export interface AdditionalTreeItemData {
    title: string;
    icon: string;
}

export class ExampleObservableTreeDataSource<T = TreeItem<AdditionalTreeItemData>> extends FdTreeDataSource<T> {
    constructor(_level = 1) {
        totalIndex++;
        super(new FdTreeLazyLoadingDataProvider<T>(_level));
    }
}

export class FdTreeLazyLoadingDataProvider<T> extends DataProvider<T> {
    constructor(private _level: number) {
        // Initiate data provider with an empty array.
        super([]);
    }
    // Since the initial state does not include any value, set it on fetch method, imitating the http request.
    fetch(params: Map<string, any>): Observable<T[]> {
        // Set items on fetch and simulate quick http request
        this.values = of(generateItems<T>(20, this._level)).pipe(delay(5000));
        return super.fetch(params);
    }

    // Since the initial state does not include any value, return a plain number.
    getTotalItems(params: Map<string, any>): Observable<number> {
        return of(20);
    }
}

function generateItems<T = TreeItem<AdditionalTreeItemData>>(length = 20, level = 1, generateChildren = true): T[] {
    const items: T[] = [];
    for (let i = 0; i < length; i++) {
        items.push({
            expanded: false,
            data: {
                title: `Item ${i + 1} (Level ${level})`,
                icon: glyphs[i % glyphs.length],
                value: ++index
            },
            children: level < 5 ? new ExampleObservableTreeDataSource(level + 1) : []
        } as T);
    }

    return items;
}

const glyphs = [
    'accidental-leave',
    'account',
    'wrench',
    'windows-doors',
    'washing-machine',
    'visits',
    'video',
    'travel-expense',
    'temperature',
    'task',
    'synchronize',
    'survey',
    'settings',
    'search',
    'sales-document',
    'retail-store',
    'refresh',
    'product',
    'present',
    'ppt-attachment',
    'pool',
    'pie-chart',
    'picture',
    'photo-voltaic',
    'phone',
    'pending',
    'pdf-attachment',
    'past'
];
