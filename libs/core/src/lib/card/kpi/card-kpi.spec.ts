import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
    CardKpiAnalyticsContentDirective,
    CardKpiAnalyticsDirective,
    CardKpiAnalyticsLabelDirective,
    CardKpiHeaderComponent,
    CardKpiScaleIconDirective,
    CardKpiScaleTextDirective,
    CardKpiValueDirective,
    CardModule
} from '@fundamental-ngx/core/card';

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
        expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticalArea)).toBeTrue();
    });

    describe('KPI value option', () => {
        it('should add className to its host element', () => {
            const debugEl = fixture.debugElement.query(By.directive(CardKpiValueDirective));
            expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsKpiValue)).toBeTrue();
        });
    });

    describe('KPI scale', () => {
        describe('icon', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiScaleIconDirective));
                expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsScaleIcon)).toBeTrue();
            });
        });

        describe('text', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiScaleTextDirective));
                expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsScaleText)).toBeTrue();
            });
        });
    });

    describe('analytics area', () => {
        it('should add className to its host element', () => {
            const debugEl = fixture.debugElement.query(By.directive(CardKpiAnalyticsDirective));
            expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalytics)).toBeTrue();
        });

        describe('label', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiAnalyticsLabelDirective));
                expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsText)).toBeTrue();
            });
        });

        describe('value', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiAnalyticsContentDirective));
                expect(debugEl.nativeElement.className.includes(CLASS_NAME.cardAnalyticsContent)).toBeTrue();
            });
        });
    });
});
