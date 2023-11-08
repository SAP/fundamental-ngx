import { CdkScrollable } from '@angular/cdk/overlay';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ScrollSpyModule } from '@fundamental-ngx/core/scroll-spy';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';

@Component({
    selector: 'fd-scroll-spy-offset-example',
    templateUrl: './scroll-spy-offset-example.component.html',
    styleUrls: ['./scroll-spy-offset-example.component.scss'],
    standalone: true,
    imports: [NgFor, IconComponent, CdkScrollable, ScrollbarDirective, ScrollSpyModule]
})
export class ScrollSpyOffsetExampleComponent implements OnInit {
    selectedSpy = 'element-2';
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
