import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { and, EntityStore, EntityStoreBuilderFactory, eq, gt } from '@fundamental-ngx/store';

// import { Requisition } from './store.config';
import { Requisition } from './entities';

@Component({
    selector: 'fundamental-ngx-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    requisitionStore: EntityStore<Requisition>;
    requisition: Observable<Requisition>;

    constructor(esBuilderFactory: EntityStoreBuilderFactory) {
        const builder = esBuilderFactory.create(Requisition);
        this.requisitionStore = builder.create();

        /* const queryAll = this.requisitionStore.queryBuilder
            .where(and(eq('title', 'Last Req'), gt('totalAmount', 50)))
            .build();

        queryAll.fetch().subscribe(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        ); */

        this.requisition = this.requisitionStore.get('REQ_0100');

        this.requisition.subscribe({
            next: (data) => {
                console.log('Got requisition data:', data);
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {
                console.log('requisition subscription was completed');
            }
        });

        const req = this.requisitionStore.createEntityInstance({ title: '123'} as Requisition);
        console.log(req.identity);
    }
}
