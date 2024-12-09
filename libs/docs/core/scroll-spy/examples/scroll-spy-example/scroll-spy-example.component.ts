import { CdkScrollable } from '@angular/cdk/overlay';

import { Component, OnInit } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ScrollSpyModule } from '@fundamental-ngx/core/scroll-spy';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';

@Component({
    selector: 'fd-scroll-spy-example',
    templateUrl: './scroll-spy-example.component.html',
    styleUrls: ['./scroll-spy-example.component.scss'],
    imports: [IconComponent, CdkScrollable, ScrollbarDirective, ScrollSpyModule]
})
export class ScrollSpyExampleComponent implements OnInit {
    selectedSpy = 'element-0';
    items: any[] = [];

    ngOnInit(): void {
        this.generateItems(9);
    }

    generateItems(count: number): void {
        for (let i = 0; i < count; ++i) {
            this.items.push({ name: 'Element ' + i, id: 'element-' + i });
        }
    }
}
