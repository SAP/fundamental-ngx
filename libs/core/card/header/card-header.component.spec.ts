import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CLASS_NAME } from '../constants';
import { CardHeaderComponent } from './card-header.component';

describe('CardHeaderComponent', () => {
    let fixture: ComponentFixture<CardHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CardHeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardHeaderComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add cardHeader className to host', () => {
        expect(fixture.debugElement.nativeElement.className.includes(CLASS_NAME.cardHeader)).toBe(true);
    });
});
