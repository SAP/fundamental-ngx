import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Input,
    OnDestroy,
    ViewEncapsulation,
    forwardRef,
    input
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedInputButtonDirective } from './directives/feed-input-button.directive';
import { FeedInputTextareaDirective } from './directives/feed-input-textarea.directive';

@Component({
    selector: 'fd-feed-input',
    templateUrl: './feed-input.component.html',
    styleUrl: './feed-input.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class FeedInputComponent implements AfterContentInit, OnDestroy {
    /** Component disable state */
    @Input()
    disabled = false;

    /** @hidden */
    @ContentChild(forwardRef(() => FeedInputTextareaDirective))
    textareaElement: FeedInputTextareaDirective;

    /** @hidden */
    @ContentChild(forwardRef(() => FeedInputButtonDirective))
    buttonElement: FeedInputButtonDirective;

    /** Value for aria label */
    ariaLabel = input<string>();

    /** @hidden */
    private readonly _subscriptions = new Subscription();

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.disabled) {
            this.textareaElement.disabled = true;
        }

        this._subscriptions.add(
            this.textareaElement.valueChange.subscribe((value) => (this.buttonElement.disabled = !value))
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
