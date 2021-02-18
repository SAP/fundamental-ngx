import {
    Component,
    OnInit,
    AfterContentInit,
    ChangeDetectionStrategy,
    ElementRef,
    ContentChild,
    Input,
    HostBinding,
    Renderer2
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
export class CardHeaderComponent implements OnInit, CssClassBuilder, AfterContentInit {
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
    constructor(private _elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        /** Add fd-card__avatar class to fd-avatar */
        const avatar = this.elementRef().nativeElement.querySelector('fd-avatar');
        if (avatar) {
            this.renderer.addClass(avatar, 'fd-card__avatar');
        }
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
