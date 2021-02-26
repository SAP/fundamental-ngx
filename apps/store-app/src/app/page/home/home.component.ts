import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EntityStore, EntityStoreBuilderFactory, eq } from '@fundamental-ngx/store';
import { Observable } from 'rxjs';
import { CommonService } from '../../service/common.service';

import { Item } from '../../store.config';
@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    itemStore: EntityStore<Item>;
    items$: Observable<Item[]>;

    constructor(
        private commonService: CommonService,
        private esFactory: EntityStoreBuilderFactory
    ) {
        const builder = esFactory.create(Item);
        this.itemStore = builder.create();
    }

    ngOnInit(): void {
        this.commonService.setTitle('Home');

        const query = this.itemStore.queryBuilder
            .where(eq('category', 'Dairy'))
            .build();

        this.items$ = query
            .orderBy({field: 'name'}, {field: 'price'})
            .fetch();
    }
}
