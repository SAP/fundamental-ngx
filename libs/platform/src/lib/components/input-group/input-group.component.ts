import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    ElementRef,
    AfterContentInit,
    ViewEncapsulation,
    HostBinding,
    ChangeDetectorRef,
    Renderer2
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { InputComponent } from '../form/input/input.component';
import { ContentDensity, Status } from '../form/form-control';
import { BaseComponent } from '../base';

import { InputGroupConfig } from './input-group.config';

/**
 * Fundamental input group component
 *
 */
@Component({
    selector: 'fdp-input-group',
    templateUrl: './input-group.component.html',
    styleUrls: ['./input-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupComponent extends BaseComponent implements AfterContentInit {
    /**
     * content Density of element: 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
    }
    get contentDensity(): ContentDensity {
        return this._contentDensity;
    }

    /**
     * control state: 'success' | 'error' | 'warning' | 'default' | 'information'
     */
    @Input()
    set state(state: Status) {
        this._controlStateClass = `is-${state}`;
    }

    /**
     * @hidden
     * Assign predefined className to host element
     * to make css selector stronger
     */
    @HostBinding('class')
    className = 'fdp-input-group';

    /** @hidden */
    @ContentChildren(InputComponent)
    _inputControls: QueryList<InputComponent>;

    /** @hidden */
    _contentDensity: ContentDensity = this._inputGroupConfig.contentDensity;

    _controlStateClass: string;

    /** @hidden */
    constructor(
        _cd: ChangeDetectorRef,
        private _renderer: Renderer2,
        protected _elementRef: ElementRef<any>,
        protected _inputGroupConfig: InputGroupConfig
    ) {
        super(_cd);
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._inputControls.changes
            .pipe(startWith(this._inputControls))
            .subscribe((inputControls: QueryList<InputComponent>) => {
                inputControls.forEach((control) => {
                    this.setupFdpInputComponent(control);
                    this.setupClassesForChildInputElements();
                });
            });
    }

    private setupFdpInputComponent(inputComponent: InputComponent): void {
        if (this._contentDensity) {
            inputComponent.contentDensity = this._contentDensity;
        }
    }

    private setupClassesForChildInputElements(): void {
        const hostElement: HTMLElement = this._elementRef.nativeElement;

        if (!hostElement) {
            return;
        }

        hostElement.querySelectorAll('input:not([type="button"])').forEach((inputElement) => {
            this._renderer.addClass(inputElement, 'fd-input-group__input');
        });
    }
}
