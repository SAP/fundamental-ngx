import {
    NgModule,
    OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrListComponent } from './pr-list.component';
import { TableModule } from '@fundamental-ngx/core';
import { PrListRoutingModule } from './pr-list-routing.module';
import {
    Message,
    MessagingService,
    TopicSubscriber
} from '@fundamental-ngx/app-shell';

@NgModule({
    imports: [CommonModule, TableModule, PrListRoutingModule],
    declarations: [PrListComponent],
    exports: [PrListComponent]
})
export class PrListModule implements OnDestroy {
    private subscriber: TopicSubscriber<Message>;

    constructor(private msgBus: MessagingService) {
        this.subscriber = this.msgBus.subscribe('theme:change', (value => {
            console.log('Theme changed....', value);
        }));
    }

    ngOnDestroy(): void {
        this.subscriber.unSubscribe();
    }
}
