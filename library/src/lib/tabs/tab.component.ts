import { Component, EventEmitter, HostListener, Input, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'fd-tab',
    templateUrl: './tab.component.html',
    host: {
        role: 'tabpanel',
        class: 'fd-tabs__panel',
        '[attr.aria-expanded]': 'expanded ? true : null',
        '[class.is-expanded]': 'expanded'
    }
})
export class TabPanelComponent {
    @Input()
    title: string | TemplateRef<any>;

    @Input()
    disabled: boolean;

    @Output()
    tabClicked: EventEmitter<number> = new EventEmitter<number>();

    expanded = false;

    index: number;

    @HostListener('click')
    tabClickHandler(): void {
        this.tabClicked.emit(this.index);
    }
}
