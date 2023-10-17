import { Directive, HostListener, Inject, inject, Input, NgModule } from '@angular/core';
import { KeyUtil } from '../../functions';
import { FD_LANGUAGE, FdLanguage, TranslationResolver } from '@fundamental-ngx/i18n';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { firstValueFrom, Observable } from 'rxjs';

@Directive({
    selector: '[fdkMultiAnnouncer]',
    exportAs: 'fdkMultiAnnouncer',
    standalone: true
})
export class MultiAnnouncerDirective {
    /** @hidden */
    @Input()
    multiAnnouncerOptions: any[];

    /** @hidden */
    private readonly _translationResolver = new TranslationResolver();

    /** @hidden */
    private _noResultsAnnounced = false;

    /** @hidden */
    private _resultsAnnounced = false;

    /** @hidden */
    private _language: FdLanguage;

    /** @hidden */
    private _announcement = '';

    /** @hidden */
    private readonly _liveAnnouncer: LiveAnnouncer = inject(LiveAnnouncer);

    /** @hidden */
    constructor(@Inject(FD_LANGUAGE) private readonly _language$: Observable<FdLanguage>) {
        this._init();
    }

    /** @hidden */
    private async _init(): Promise<void> {
        this._language = await firstValueFrom(this._language$);
    }

    /** @hidden */
    @HostListener('keyup', ['$event'])
    private _makeSearchTermChangeAnnouncements(event: KeyboardEvent): void {
        if (KeyUtil.isKeyType(event, 'alphabetical') || KeyUtil.isKeyType(event, 'numeric')) {
            this._liveAnnouncer.clear();
            if (!this.multiAnnouncerOptions.length && !this._noResultsAnnounced) {
                this._buildAnnouncement('noResults');
                this._noResultsAnnounced = true;
                this._resultsAnnounced = false;
            } else if (this.multiAnnouncerOptions.length) {
                this._buildAnnouncement(this.multiAnnouncerOptions.length);
                if (!this._resultsAnnounced) {
                    this._buildAnnouncement('navigateSelectionsWithArrows');
                    this._noResultsAnnounced = false;
                    this._resultsAnnounced = true;
                }
            }
            this._buildAnnouncement('escapeNavigateTokens');
            this._makeAnnouncement(this._announcement);
        }
    }

    /** @hidden */
    private _buildAnnouncement(message: string | number): void {
        this._announcement =
            this._announcement +
            this._translationResolver.resolve(
                this._language,
                typeof message === 'string'
                    ? 'coreMultiInput.' + message
                    : message === 1
                    ? 'coreMultiInput.countListResultsSingular'
                    : 'coreMultiInput.countListResultsPlural',
                { count: message }
            ) +
            ' ';
    }

    /** @hidden */
    private async _makeAnnouncement(message: string): Promise<void> {
        await this._liveAnnouncer.announce(message, 'assertive').then(() => {
            this._announcement = '';
        });
    }
}

@NgModule({
    imports: [MultiAnnouncerDirective],
    exports: [MultiAnnouncerDirective]
})
export class MultiAnnouncerModule {}
