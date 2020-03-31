import { FdDate } from './fd-date';

export interface SpecialDayRule {
    specialDayNumber: number;
    rule: (fdDate: FdDate) => boolean;
}
