import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardModule } from '../card.module';
import { CardKpiAnalyticsContentDirective } from './card-kpi-analytics-content.directive';
import { CardKpiAnalyticsLabelDirective } from './card-kpi-analytics-label.directive';
import { CardKpiAnalyticsDirective } from './card-kpi-analytics.directive';
import { CardKpiHeaderComponent } from './card-kpi-header.component';
import { CardKpiScaleIconDirective } from './card-kpi-scale-icon.directive';
import { CardKpiScaleTextDirective } from './card-kpi-scale-text.directive';
import { CardKpiValueDirective } from './card-kpi-value.directive';

import { CommonModule } from '@angular/common';
import { CLASS_NAME } from '../constants';

@Component({
    template: `
        <fd-card-kpi-header>
            <strong fd-card-kpi-value>KPI</strong>
            <span fd-card-kpi-scale-icon>Icon</span>
            <span fd-card-kpi-scale-text>K</span>

            <div fd-card-kpi-analytics>
                <label fd-card-kpi-analytics-label>Label</label>
                <span fd-card-kpi-analytics-content>Content</span>
            </div>
            <div fd-card-kpi-analytics>
                <label fd-card-kpi-analytics-label>Label</label>
                <span fd-card-kpi-analytics-content>Content</span>
            </div>
        </fd-card-kpi-header>
    `
})
class CardKpiHeaderHostTestComponent {}

describe('CardKpiHeaderComponent', () => {
    let fixture: ComponentFixture<CardKpiHeaderHostTestComponent>;
    let host: CardKpiHeaderHostTestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, CardModule],
            declarations: [CardKpiHeaderHostTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardKpiHeaderHostTestComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should add className to host', () => {
        const debugEl = fixture.debugElement.query(By.directive(CardKpiHeaderComponent));
        expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticalArea)).toBe(true);
    });

    describe('KPI value option', () => {
        it('should add className to its host element', () => {
            const debugEl = fixture.debugElement.query(By.directive(CardKpiValueDirective));
            expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsKpiValue)).toBe(true);
        });
    });

    describe('KPI scale', () => {
        describe('icon', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiScaleIconDirective));
                expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsScaleIcon)).toBe(true);
            });
        });

        describe('text', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiScaleTextDirective));
                expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsScaleText)).toBe(true);
            });
        });
    });

    describe('analytics area', () => {
        it('should add className to its host element', () => {
            const debugEl = fixture.debugElement.query(By.directive(CardKpiAnalyticsDirective));
            expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalytics)).toBe(true);
        });

        describe('label', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiAnalyticsLabelDirective));
                expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsText)).toBe(true);
            });
        });

        describe('value', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiAnalyticsContentDirective));
                expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsContent)).toBe(true);
            });
        });
    });
});
