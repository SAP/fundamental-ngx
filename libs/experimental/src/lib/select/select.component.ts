import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren, ElementRef,
    HostListener,
    Input, OnDestroy,
    QueryList, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ExperimentalOptionComponent } from './option/option.component';
import { KeyUtil } from '@fundamental-ngx/core';
import { ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
/**
 * Select component intended to mimic
 * the behaviour of the native select element.
 */
@Component({
    selector: 'fn-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentalSelectComponent implements AfterContentInit, OnDestroy {

    /** Whether or not the select is opened. */
    @Input()
    opened = false;

    /** The select label. */
    @Input()
    label: string;

    /** The select placeholder. */
    @Input()
    placeholder: string;

    /** The select value. */
    @Input()
    value: string;

    /** Whether or not this select is editable. */
    @Input()
    editable = false;

    @ContentChildren(ExperimentalOptionComponent)
    options: QueryList<ExperimentalOptionComponent>;

    @ViewChild('selectInput', {read: ElementRef})
    selectInput: ElementRef;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(private _cdRef: ChangeDetectorRef, private _elRef: ElementRef) {
    }

    ngAfterContentInit(): void {
        this.options.forEach(option => {
            this._subscriptions.add(option.optionClicked.subscribe(clickedOption => {
                this.optionClicked(clickedOption);
            }))
        })
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        if (document.activeElement === this.selectInput.nativeElement && KeyUtil.isKeyCode(event, TAB)) {
            this.options.first.focus();
        } else if (this.opened && KeyUtil.isKeyCode(event, ESCAPE)) {
            this.opened = false;
            this.selectInput.nativeElement.blur();
        } else if (!this.opened && document.activeElement === this.selectInput.nativeElement && KeyUtil.isKeyCode(event, SPACE)) {
            this.opened = true;
        }
        this._cdRef.markForCheck();
    }

    @HostListener('document:click', ['$event.target'])
    clickOut(target: ElementRef): void {
        if (!this._elRef.nativeElement.contains(target as any) && this.opened) {
            this.opened = false;
        }
    }

    selectInputClicked(): void {
        this.opened = !this.opened;
    }

    optionClicked(clickedOption: ExperimentalOptionComponent): void {
        this.options.forEach(option => {
            option === clickedOption ? option.selected = true : option.selected = false;
        });
        this.value = clickedOption.value;
        this.opened = false;
        this._cdRef.markForCheck();
    }

}
