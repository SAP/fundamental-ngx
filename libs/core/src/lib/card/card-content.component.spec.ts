import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { CardContentComponent } from './card-content.component';

import { CLASS_NAME } from './constants';

describe('CardContentComponent', () => {
    let fixture: ComponentFixture<CardContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [CardContentComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardContentComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.nativeElement.className.includes(CLASS_NAME.cardContent)).toBe(true);
    });
});
