import {
    Component,
    OnInit,
    Renderer2,
    ElementRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    HostListener
} from '@angular/core';

import { CLASS_NAME } from './constants';

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
    @Input() badge: string[] = [];

    @Output() cardSwipe: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.card);
    }

    @HostListener('swipeLeft')
    /** @hidden */
    _swipeLeft(): void {
        console.log('swipeLeft');
    }

    @HostListener('swipeRight')
    /** @hidden */
    _swipeRight(): void {
        console.log('swipeRight');
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
}
