import { BehaviorSubject } from 'rxjs';
import { Variant } from './variant.interface';

export interface VariantManagement<T = any> {
    activeVariantChangeSubject: BehaviorSubject<Variant | null>;
    activeVariant: Variant;
    updateActivePreset(data: T, componentName: string | null): void;
    getActiveVariantData(): T;
    getOriginalActiveVariantData(): T;
}
