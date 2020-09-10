import {
    Component,
    OnInit,
    Renderer2,
    ElementRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { CLASS_NAME } from './constants';

export type HeaderPosition = 'top' | 'bottom';

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
    @Input() headerPosition: HeaderPosition = 'top';

    @Input() title: string;

    @Input() subtitle: string;

    @Input() counter: string;

    @Output() cardSwipe: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.card);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
}
