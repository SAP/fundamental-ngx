import {
    Component,
    OnInit,
    AfterContentInit,
    ChangeDetectionStrategy,
    ElementRef,
    ContentChild,
    Input,
    HostBinding,
    Renderer2,
    OnChanges,
    SimpleChanges
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
export class CardHeaderComponent implements OnInit, OnChanges, CssClassBuilder, AfterContentInit {
    /** Whether card header is interactive */
    @Input()
    interactive = true;

    /** @hidden */
    @Input()
    @HostBinding('attr.tabindex')
    tabindex = this.interactive ? '0' : '-1';

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

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('interactive' in changes) {
            this.tabindex = this.interactive ? '0' : '-1' ;
        }
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** @hidden */
    buildComponentCssClass(): string[] {
        return [
            CLASS_NAME.cardHeader,
            !this.interactive ? CLASS_NAME.cardHeaderNonInteractive : ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
