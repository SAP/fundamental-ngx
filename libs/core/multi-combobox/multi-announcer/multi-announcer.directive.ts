import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ContentChildren, Directive, HostListener, inject, Input, QueryList } from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { TokenComponent } from '@fundamental-ngx/core/token';
import { FdLanguageKeyIdentifier, resolveTranslationSyncFn } from '@fundamental-ngx/i18n';

@Directive({
    selector: '[fdMultiAnnouncer]',
    exportAs: 'fdMultiAnnouncer',
    standalone: true
})
export class MultiAnnouncerDirective {
    /** @hidden */
    @Input()
    multiAnnouncerOptions: unknown[];

    /** @hidden */
    @ContentChildren(TokenComponent, { descendants: true })
    private _tokens: QueryList<TokenComponent>;

    /** @hidden */
    private _noResultsAnnounced = false;

    /** @hidden */
    private _resultsAnnounced = false;

    /** @hidden */
    private _announcement = '';

    /** @hidden */
    private readonly _liveAnnouncer: LiveAnnouncer = inject(LiveAnnouncer);

    /** @hidden */
    private _resolveTranslation = resolveTranslationSyncFn();

    /** @hidden */
    @HostListener('keyup', ['$event'])
    protected _makeSearchTermChangeAnnouncements(event: KeyboardEvent): void {
        if (KeyUtil.isKeyType(event, 'alphabetical') || KeyUtil.isKeyType(event, 'numeric')) {
            this._liveAnnouncer.clear();
            const count = this.multiAnnouncerOptions?.length;
            if (!count && !this._noResultsAnnounced) {
                this._buildAnnouncement(this._resolveTranslation('coreMultiInput.noResults'));
                this._noResultsAnnounced = true;
                this._resultsAnnounced = false;
            } else if (count) {
                const trKey: FdLanguageKeyIdentifier =
                    count === 1 ? 'coreMultiInput.countListResultsSingular' : 'coreMultiInput.countListResultsPlural';
                this._buildAnnouncement(this._resolveTranslation(trKey, { count }));
                this._buildAnnouncement(this._resolveTranslation('coreMultiInput.navigateSelectionsWithArrows'));
                if (!this._resultsAnnounced) {
                    this._noResultsAnnounced = false;
                    this._resultsAnnounced = true;
                }
            }
            if (this._tokens?.length) {
                this._buildAnnouncement(this._resolveTranslation('coreMultiInput.escapeNavigateTokens'));
            }
            this._makeAnnouncement(this._announcement);
        }
    }

    /** @hidden */
    private _buildAnnouncement(message: string): void {
        this._announcement = this._announcement + message + ' ';
    }

    /** @hidden */
    private async _makeAnnouncement(message: string): Promise<void> {
        await this._liveAnnouncer.announce(message, 'assertive').then(() => {
            this._announcement = '';
        });
    }
}
