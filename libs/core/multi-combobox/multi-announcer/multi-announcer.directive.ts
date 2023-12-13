/* eslint-disable @typescript-eslint/member-ordering */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ContentChildren, Directive, HostListener, inject, Input, QueryList } from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { TokenComponent } from '@fundamental-ngx/core/token';
import { resolveTranslationSyncFn } from '@fundamental-ngx/i18n';

@Directive({
    selector: '[fdMultiAnnouncer]',
    exportAs: 'fdMultiAnnouncer',
    standalone: true
})
export class MultiAnnouncerDirective {
    /** @ignore */
    @Input()
    multiAnnouncerOptions: unknown[];

    /** @ignore */
    @ContentChildren(TokenComponent, { descendants: true })
    private _tokens: QueryList<TokenComponent>;

    /** @ignore */
    private _noResultsAnnounced = false;

    /** @ignore */
    private _resultsAnnounced = false;

    /** @ignore */
    private _announcement = '';

    /** @ignore */
    private readonly _liveAnnouncer: LiveAnnouncer = inject(LiveAnnouncer);

    /** @ignore */
    private _resolveTranslation = resolveTranslationSyncFn();

    /** @ignore */
    @HostListener('keyup', ['$event'])
    private _makeSearchTermChangeAnnouncements(event: KeyboardEvent): void {
        if (KeyUtil.isKeyType(event, 'alphabetical') || KeyUtil.isKeyType(event, 'numeric')) {
            this._liveAnnouncer.clear();
            if (!this.multiAnnouncerOptions.length && !this._noResultsAnnounced) {
                this._buildAnnouncement(this._resolveTranslation('coreMultiInput.noResults'));
                this._noResultsAnnounced = true;
                this._resultsAnnounced = false;
            } else if (this.multiAnnouncerOptions.length) {
                if (this.multiAnnouncerOptions.length === 1) {
                    this._buildAnnouncement(
                        this._resolveTranslation('coreMultiInput.countListResultsSingular', { count: 1 })
                    );
                } else {
                    this._buildAnnouncement(
                        this._resolveTranslation('coreMultiInput.countListResultsPlural', {
                            count: this.multiAnnouncerOptions.length
                        })
                    );
                }
                this._buildAnnouncement(this._resolveTranslation('coreMultiInput.navigateSelectionsWithArrows'));
                if (!this._resultsAnnounced) {
                    this._noResultsAnnounced = false;
                    this._resultsAnnounced = true;
                }
            }
            if (this._tokens && this._tokens.length) {
                this._buildAnnouncement(this._resolveTranslation('coreMultiInput.escapeNavigateTokens'));
            }
            this._makeAnnouncement(this._announcement);
        }
    }

    /** @ignore */
    private _buildAnnouncement(message: string): void {
        this._announcement = this._announcement + message + ' ';
    }

    /** @ignore */
    private async _makeAnnouncement(message: string): Promise<void> {
        await this._liveAnnouncer.announce(message, 'assertive').then(() => {
            this._announcement = '';
        });
    }
}
