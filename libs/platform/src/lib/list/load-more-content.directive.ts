import { Directive, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
    selector: '[fdpListLoadMoreContent]'
})
export class LoadMoreContentDirective {
    /** @hidden */
    constructor(readonly templateRef: TemplateRef<LoadMoreContentContext>) {}
}

export interface LoadMoreContentContext {
    loadTitle: string;
    loading: boolean;
    loadingLabel: Observable<string>;
    lastChunk: {
        start: number;
        end: number;
    };
    total: number;
}
