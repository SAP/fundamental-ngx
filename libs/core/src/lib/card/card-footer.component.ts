import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ElementRef,
    Renderer2,
    ContentChildren,
    QueryList
} from '@angular/core';

import { CLASS_NAME } from './constants';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'fd-card-footer',
    templateUrl: './card-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFooterComponent implements OnInit {
    @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;

    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.cardFooter);
        window['__footer'] = this;
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
}
