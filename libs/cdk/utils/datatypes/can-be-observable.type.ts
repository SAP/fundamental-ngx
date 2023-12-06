import { Observable } from 'rxjs';

export type CanBeObservable<T> = T | Observable<T>;
