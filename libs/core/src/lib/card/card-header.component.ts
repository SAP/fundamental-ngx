import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ElementRef,
    ContentChild,
    Input,
    HostBinding
} from '@angular/core';

import { applyCssClass, CssClassBuilder } from '../utils/public_api';
import { AvatarComponent } from '../avatar/avatar.component';

import { CLASS_NAME } from './constants';
import { CardSubtitleDirective } from './card-subtitle.directive';

@Component({
    selector: 'fd-card-header',
    templateUrl: './card-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeaderComponent implements OnInit, CssClassBuilder {
    /** @hidden */
    @Input()
    @HostBinding('attr.tabindex')
    tabindex = '0';

    /** @hidden */
    class: string;

    /** @hidden */
    @ContentChild(AvatarComponent)
    _avatar: AvatarComponent;

    /** @hidden */
    @ContentChild(CardSubtitleDirective)
    _subtitle: CardSubtitleDirective;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** @hidden */
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardHeader];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
