/* eslint-disable @typescript-eslint/member-ordering */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directive, HostListener, inject, Input } from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { resolveTranslationSyncFn } from '@fundamental-ngx/i18n';

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
                if (!this._resultsAnnounced) {
                    this._buildAnnouncement(this._resolveTranslation('coreMultiInput.navigateSelectionsWithArrows'));
                    this._noResultsAnnounced = false;
                    this._resultsAnnounced = true;
                }
            }
            this._buildAnnouncement(this._resolveTranslation('coreMultiInput.escapeNavigateTokens'));
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
