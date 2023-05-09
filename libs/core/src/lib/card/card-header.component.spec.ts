import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardHeaderComponent } from './card-header.component';
import { CLASS_NAME } from './constants';

describe('CardHeaderComponent', () => {
    let fixture: ComponentFixture<CardHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [CardHeaderComponent]
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

    it('should add tabindex to host', () => {
        expect(fixture.debugElement.attributes.tabindex).toBe('0');
    });
});
