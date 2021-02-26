import { Component, OnInit } from '@angular/core';
import { EntityStore, EntityStoreBuilderFactory } from '@fundamental-ngx/store';
import { CommonService } from '../../service/common.service';
import { Item } from '../../store.config';

@Component({
    templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

    itemStore: EntityStore<Item>;

    constructor(
        private commonService: CommonService,
        private esFactory: EntityStoreBuilderFactory
    ) {
        const builder = esFactory.create(Item);
        this.itemStore = builder.create();
    }

    ngOnInit(): void {
        this.commonService.setTitle('Catalog');
    }
}
