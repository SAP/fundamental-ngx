import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { CardSubtitleComponent } from './card-subtitle.component';
import { CLASS_NAME } from './constants';

describe('CardSubtitleComponent', () => {
    let fixture: ComponentFixture<CardSubtitleComponent>;
    let component: CardSubtitleComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [CardSubtitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardSubtitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.classes[CLASS_NAME.cardSubtitle]).toBeTrue();
    });
});
