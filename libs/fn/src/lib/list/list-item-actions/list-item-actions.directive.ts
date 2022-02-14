import { Directive, HostListener, OnInit, TemplateRef } from '@angular/core';

@Directive({
    selector: '[fnListItemActions]'
})
export class ListItemActionsDirective implements OnInit {
    constructor(readonly templateRef: TemplateRef<any>) {}

    @HostListener('click', ['$event'])
    onHostClick($event: MouseEvent): void {
        console.log({ $event });
    }

    ngOnInit(): void {
        console.log('test');
    }
}
