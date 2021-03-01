import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

    itemForm: FormGroup = new FormGroup({
        category: new FormControl(),
        name: new FormControl(),
        supplier: new FormControl(),
        price: new FormControl(),
        uom: new FormControl(),
    });

    constructor(
        private commonService: CommonService,
        private esFactory: EntityStoreBuilderFactory
    ) {
        const builder = esFactory.create(Item);
        this.itemStore = builder.create();
    }

    ngOnInit(): void {
        this.commonService.setTitle('Home');

        // create query
        const query = this.itemStore.queryBuilder
            .where(eq('category', 'Dairy'))
            .build();

        // invoke query
        this.items$ = query
            .orderBy({field: 'name'}, {field: 'price'})
            .fetch();
    }

    onSubmit(): void {
        const item: Item = new Item();
        item.category = this.itemForm.value.category;
        item.name = this.itemForm.value.name;
        item.price = this.itemForm.value.price;
        item.supplier = this.itemForm.value.supplier;
        item.uom = this.itemForm.value.uom;
        this.itemStore.save(item);
    }
}
