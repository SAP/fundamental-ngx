import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-scroll-spy-offset-example',
    templateUrl: './scroll-spy-offset-example.component.html',
    styleUrls: ['./scroll-spy-offset-example.component.scss']
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
