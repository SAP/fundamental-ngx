import { Component } from '@angular/core';
import { EntityStore, EntityStoreBuilderFactory } from '@fundamental-ngx/store';
import { Observable } from 'rxjs';

import { Item, Requisition } from '../../store.config';
@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    itemStore: EntityStore<Item>;
    items$: Observable<Item[]>;

    constructor(esFactory: EntityStoreBuilderFactory) {
        const builder = esFactory.create(Item);
        this.itemStore = builder.create();

        const query = this.itemStore.queryBuilder.build();
        this.items$ = query.fetch();
    }
}
