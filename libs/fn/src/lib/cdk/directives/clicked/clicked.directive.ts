import { Directive, EventEmitter, HostListener, NgModule, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FN_CLICKED } from '../../tokens/clicked';

@Directive({
    selector: '[fnClicked]',
    providers: [
        {
            provide: FN_CLICKED,
            useExisting: ClickedDirective
        }
    ]
})
export class ClickedDirective extends Subject<MouseEvent | KeyboardEvent> {
    @Output() fnClicked = new EventEmitter<MouseEvent | KeyboardEvent>();

    constructor() {
        super();
    }

    @HostListener('click', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    onClick($event: MouseEvent | KeyboardEvent): void {
        $event.preventDefault();
        this.next($event);
        this.fnClicked.emit($event);
    }
}

@NgModule({
    declarations: [ClickedDirective],
    exports: [ClickedDirective]
})
export class ClickedBehaviorModule {}
