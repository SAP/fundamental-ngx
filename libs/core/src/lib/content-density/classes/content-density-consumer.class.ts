import { map, Observable } from 'rxjs';
import { ContentDensityMode } from '../content-density.types';
import { isCompact, isCondensed, isCozy } from '../helpers/density-type-checkers';

export class ContentDensityConsumer extends Observable<ContentDensityMode> {
    isCompact$: Observable<boolean>;
    isCozy$: Observable<boolean>;
    isCondensed$: Observable<boolean>;

    constructor(dataSource: Observable<ContentDensityMode>) {
        super((subscriber) => {
            const subscription = dataSource.subscribe((density) => {
                subscriber.next(density);
            });
            return () => {
                subscription.unsubscribe();
            };
        });

        this.isCompact$ = dataSource.pipe(map(isCompact));
        this.isCozy$ = dataSource.pipe(map(isCozy));
        this.isCondensed$ = dataSource.pipe(map(isCondensed));
    }
}
