import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    OnChanges,
    ElementRef,
    AfterContentInit,
    ContentChildren,
    QueryList,
    Renderer2,
    SkipSelf,
    Optional
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core';

import { ContentDensity } from '../../form/form-control';
import { ButtonComponent } from '../../button/public_api';

import { InputGroupComponent } from '../input-group.component';

@Component({
    selector: 'fdp-input-group-addon',
    templateUrl: './addon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupAddonComponent implements CssClassBuilder, OnInit, OnChanges, AfterContentInit {
    /** user's custom classes */
    @Input()
    class: string;

    /**@hidden */
    @ContentChildren(ButtonComponent)
    _fdpButtons: QueryList<ButtonComponent>;

    /**@hidden */
    get _contentDensity(): ContentDensity {
        return this._inputGroup?.contentDensity;
    }

    /**@hidden */
    constructor(
        private _elementRef: ElementRef<any>,
        private _renderer: Renderer2,
        @Optional() @SkipSelf() private _inputGroup: InputGroupComponent
    ) {}

    /**@hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /**@hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /**@hidden */
    ngAfterContentInit(): void {
        this.buildComponentCssClass();

        this._fdpButtons.changes
            .pipe(startWith(this._fdpButtons))
            .subscribe((fdpButtons: QueryList<ButtonComponent>) => {
                fdpButtons.forEach((button) => this.setupChildButton(button));
            });
    }

    @applyCssClass
    /**@hidden */
    buildComponentCssClass(): string[] {
        return [
            'fd-input-group__addon',
            this._fdpButtons?.length > 0 ? 'fd-input-group__addon--button' : '',
            this._contentDensity === 'compact' ? 'fd-input-group__addon--compact' : ''
        ];
    }

    /**@hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    private setupChildButton(fdbButton: ButtonComponent): void {
        if (this._contentDensity) {
            fdbButton.contentDensity = this._contentDensity;
        }

        const element: HTMLElement = this.elementRef().nativeElement;

        if (!element) {
            return;
        }

        element.querySelectorAll('button').forEach((button) => {
            this._renderer.addClass(button, 'fd-input-group__button');
        });
    }
}
