import { TestBed } from '@angular/core/testing';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';

describe('CalendarLegendFocusingService', () => {
    let service: CalendarLegendFocusingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalendarLegendFocusingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
