import { Component, ViewChild } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-popover-dynamic-example',
    templateUrl: './popover-dynamic-example.component.html'
})
export class PopoverDynamicExampleComponent {

    @ViewChild('popoverComponent', { static: false })
    popoverComponent: PopoverComponent

    componentWithTasks = [
        {
            name: 'name 1',
            tasks: [
                {name: 'subName1'},
                {name: 'subName2'},
                {name: 'subName3'},
            ]
        },
        {
            name: 'name 2',
            tasks: [
                {name: 'subName1'},
                {name: 'subName2'},
                {name: 'subName3'},
            ]
        },
        {
            name: 'name 3',
            tasks: [
                {name: 'subName1'},
                {name: 'subName2'},
                {name: 'subName3'},
            ]
        },
        {
            name: 'name 4',
            tasks: [
                {name: 'subName1'},
                {name: 'subName2'},
                {name: 'subName3'},
            ]
        },
        {
            name: 'name 5',
            tasks: [
                {name: 'subName1'},
                {name: 'subName2'},
                {name: 'subName3'},
            ]
        },
    ];

    updatePopover(): void {
        this.popoverComponent.updatePopover();
    }

}
