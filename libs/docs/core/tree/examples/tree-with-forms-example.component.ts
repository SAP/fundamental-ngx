import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataProvider } from '@fundamental-ngx/cdk/data-source';
import { FdTreeDataSource, SelectionPlacement, TreeComponent, TreeItem } from '@fundamental-ngx/core/tree';
import { delay, of } from 'rxjs';

let itemsIndex = 0;

@Component({
    selector: 'fd-tree-with-forms-example',
    templateUrl: './tree-with-forms-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeWithFormsExampleComponent {
    treeSelectionValue = [];
    selectionPlacement: SelectionPlacement = 'none';
    items = new ExampleObservableTreeDataSource(1);
    items2 = new ExampleObservableTreeDataSource(1);
    model: TreeItem<AdditionalTreeItemData>;

    singleForm: FormGroup;
    multipleForm: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.singleForm = formBuilder.group({
            selection: 1
        });

        this.multipleForm = formBuilder.group({
            selection: [[63]]
        });
    }
}

export interface AdditionalTreeItemData {
    title: string;
    value: number;
    icon: string;
}

export class ExampleObservableTreeDataSource<T = TreeItem<AdditionalTreeItemData>> extends FdTreeDataSource<T> {
    limitless = true;
    constructor(_level) {
        super(new DataProvider<T>(of(generateItems<T>(2, _level)).pipe(delay(500))));
    }
}

function generateItems<T = TreeItem<AdditionalTreeItemData>>(length = 20, level = 1, generateChildren = true): T[] {
    const items: T[] = [];
    for (let i = 0; i < length; i++) {
        items.push({
            expanded: false,
            data: {
                title: `Item ${i + 1} (Level ${level})`,
                value: ++itemsIndex,
                icon: glyphs[i % glyphs.length]
            },
            children:
                level === 1
                    ? generateItems(length, level + 1)
                    : level < 5
                    ? new ExampleObservableTreeDataSource(level + 1)
                    : []
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
