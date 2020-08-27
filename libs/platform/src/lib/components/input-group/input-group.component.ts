import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    ElementRef,
    ViewEncapsulation,
    ChangeDetectorRef,
    Renderer2,
    AfterViewInit,
    OnInit
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { InputComponent } from '../form/input/input.component';
import { ContentDensity, Status } from '../form/form-control';
import { BaseComponent } from '../base';

import { InputGroupConfig } from './input-group.config';

const CSS_CLASS_NAME = {
    inputGroup: 'fdp-input-group',
    inputGroupInnerInput: 'fd-input-group__input'
} as const;

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
export class InputGroupComponent extends BaseComponent implements OnInit, AfterViewInit {
    /**
     * content Density of element: 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        if (this._inputControls) {
            this.setupChildInputControls(this._inputControls);
        }
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

    /** @hidden */
    @ContentChildren(InputComponent)
    _inputControls: QueryList<InputComponent>;

    /** @hidden */
    _contentDensity: ContentDensity = this._inputGroupConfig.contentDensity;

    /** @hidden */
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
    ngOnInit(): void {
        /**
         * Assign predefined className to host element
         * to make css selector stronger
         */
        this._renderer.addClass(this._elementRef.nativeElement, CSS_CLASS_NAME.inputGroup);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        /**
         * Can't subscribe to input controls in ngAfterContentInit
         * because we need to have access to inputElemRef
         */
        this._inputControls.changes
            .pipe(startWith(this._inputControls))
            .subscribe((inputControls: QueryList<InputComponent>) => {
                this.setupChildInputControls(inputControls);
            });
    }

    /** @hidden */
    private setupChildInputControls(inputControls = this._inputControls): void {
        inputControls.forEach((control) => {
            control.contentDensity = this._contentDensity;
            const inputEl = control.inputElemRef.nativeElement as HTMLInputElement | null;
            if (inputEl) {
                this._renderer.addClass(inputEl, CSS_CLASS_NAME.inputGroupInnerInput);
            }
        });
    }
}
