import { Observable } from 'rxjs';

export class SkeletonConsumer extends Observable<boolean> {
    constructor(dataSource: Observable<boolean>) {
        super((subscriber) => {
            const subscription = dataSource.subscribe((skeletonState) => {
                subscriber.next(skeletonState);
            });

            return () => {
                subscription.unsubscribe();
            };
        });
    }
}
