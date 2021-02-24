import { Component } from '@angular/core';
import { Requisition } from './store.config';

import { EntityStore, EntityStoreBuilderFactory } from '@fundamental-ngx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'fundamental-ngx-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    requisitionStore: EntityStore<Requisition>;
    requisitions: Observable<Requisition[]>;

    constructor(esFactory: EntityStoreBuilderFactory) {
        const builder = esFactory.create(Requisition);
        this.requisitionStore = builder.create();

        this.requisitions = this.requisitionStore.getAll();
    }
}
