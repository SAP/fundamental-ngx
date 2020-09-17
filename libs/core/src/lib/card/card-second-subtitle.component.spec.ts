import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { CardSecondSubtitleComponent } from './card-second-subtitle.component';
import { CLASS_NAME } from './constants';

describe('CardSecondSubtitleComponent', () => {
    let fixture: ComponentFixture<CardSecondSubtitleComponent>;
    let component: CardSecondSubtitleComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [CardSecondSubtitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardSecondSubtitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.classes[CLASS_NAME.cardSecondSubtitle]).toBeTrue();
    });
});
