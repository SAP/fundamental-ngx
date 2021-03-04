import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { CardHeaderComponent } from './card-header.component';
import { CLASS_NAME } from './constants';

describe('CardHeaderComponent', () => {
    let fixture: ComponentFixture<CardHeaderComponent>;
    let cardHeader: CardHeaderComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [CardHeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardHeaderComponent);
        cardHeader = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add cardHeader className to host', () => {
        expect(fixture.debugElement.classes[CLASS_NAME.cardHeader]).toBeTrue();
    });

    it('should add tabindex to host', () => {
        expect(fixture.debugElement.attributes.tabindex).toBe('0');
    });
});
