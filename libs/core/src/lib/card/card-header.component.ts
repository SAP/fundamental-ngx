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
    OnChanges
} from '@angular/core';

import { AvatarComponent } from '@fundamental-ngx/core/avatar';

import { CLASS_NAME } from './constants';
import { CardSubtitleDirective } from './card-subtitle.directive';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';
import { applyCssClass } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'fd-card-header',
    templateUrl: './card-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeaderComponent implements OnInit, OnChanges, CssClassBuilder, AfterContentInit {
    /** Whether card header is interactive */
    @Input()
    interactive = true;

    /** Tab Index attribute for card header */
    @Input()
    @HostBinding('attr.tabindex')
    set tabindex(tabindex: string) {
        this._tabindex = tabindex;
    }
    get tabindex(): string {
        return !this.interactive ? '-1' : this._tabindex;
    }

    /** @hidden */
    private _tabindex = '0';

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
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardHeader, !this.interactive ? CLASS_NAME.cardHeaderNonInteractive : ''];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
