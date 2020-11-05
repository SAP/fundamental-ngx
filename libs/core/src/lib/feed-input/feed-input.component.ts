import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Input,
    ViewEncapsulation,
    AfterContentInit,
    forwardRef,
    OnDestroy
} from '@angular/core';
import { FeedInputButtonDirective, FeedInputTextareaDirective } from '../..';
import { Subscription } from 'rxjs';

@Component({
    selector: 'fd-feed-input',
    templateUrl: './feed-input.component.html',
    styleUrls: ['./feed-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedInputComponent implements AfterContentInit, OnDestroy {
    /** component disable state */
    @Input()
    disabled = false;

    /** @hidden */
    @ContentChild(forwardRef(() => FeedInputTextareaDirective))
    textareaElement: FeedInputTextareaDirective;

    /** @hidden */
    @ContentChild(forwardRef(() => FeedInputButtonDirective))
    buttonElement: FeedInputButtonDirective;

    /** @hidden */
    private _subscriptions = new Subscription();

    ngAfterContentInit(): void {
        this._subscriptions.add(
            this.textareaElement.valueChange.subscribe((value => {
            this.buttonElement.disabled = !Boolean(value)})
        ));
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
