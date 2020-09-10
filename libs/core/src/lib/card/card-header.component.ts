import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ElementRef,
    Renderer2,
    Input,
    Output,
    EventEmitter,
    forwardRef
} from '@angular/core';

import { CLASS_NAME, CARD_CHILD_TOKEN } from './constants';

@Component({
    selector: 'fd-card-header',
    templateUrl: './card-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: CARD_CHILD_TOKEN,
            useExisting: forwardRef(() => CardHeaderComponent)
        }
    ]
})
export class CardHeaderComponent implements OnInit {
    @Input() avatarSource: string;

    @Input() title: string;

    @Input() subtitle: string;

    @Input() counter: string;

    @Output() headerClick: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.cardHeader);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
}
