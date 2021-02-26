import { Component } from '@angular/core';
import { EntityStore, EntityStoreBuilderFactory, eq } from '@fundamental-ngx/store';
import { Observable } from 'rxjs';

import { Item } from '../../store.config';
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
        this.items$ = query.where(eq('category', 'Dairy'))
            .orderBy({field: 'name'}, {field: 'price'})
            .fetch();
    }
}
