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
    requisition: Observable<Requisition>;

    constructor(esFactory: EntityStoreBuilderFactory) {
        const builder = esFactory.create(Requisition);
        this.requisitionStore = builder.create();

        this.requisition = this.requisitionStore.get('requisition_id');
    }
}
