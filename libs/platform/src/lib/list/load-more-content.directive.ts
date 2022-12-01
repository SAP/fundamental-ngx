import { Directive, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
    selector: '[fdpListLoadMoreContent]'
})
export class LoadMoreContentDirective {
    /** @hidden */
    constructor(readonly templateRef: TemplateRef<LoadMoreContentContext>) {}
}

interface _LoadMoreContentContext {
    loadTitle: string;
    loading: boolean;
    loadingLabel: Observable<string>;
    lastChunk: {
        start: number;
        end: number;
    };
    total: number;
}

export interface LoadMoreContentContext extends _LoadMoreContentContext {
    $implicit: _LoadMoreContentContext;
}
