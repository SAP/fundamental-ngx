import { Component } from '@angular/core';

@Component({
    selector: 'fd-scrollbar-example',
    template: `
        <div fd-scrollbar style="height: 200px;">
            <div style="width: 9000px; height: 9000px;"></div>
        </div>
    `
})
export class ScrollbarExampleComponent {}
