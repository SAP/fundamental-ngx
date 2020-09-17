import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { CardModule } from '../card.module';
import { CLASS_NAME } from '../constants';

import { CardKpiHeaderComponent } from './card-kpi-header.component';
import { CardKpiValueComponent } from './card-kpi-value.component';
import { CardKpiScaleIconComponent } from './card-kpi-scale-icon.component';
import { CardKpiScaleTextComponent } from './card-kpi-scale-text.component';
import { CardKpiAnalyticsComponent } from './card-kpi-analytics.component';
import { CardKpiAnalyticsContentComponent } from './card-kpi-analytics-content.component';
import { CardKpiAnalyticsLabelComponent } from './card-kpi-analytics-label.component';

@Component({
    template: `
        <fd-card-kpi-header>
            <fd-card-kpi-value>KPI</fd-card-kpi-value>
            <fd-card-kpi-scale-icon>Icon</fd-card-kpi-scale-icon>
            <fd-card-kpi-scale-text>K</fd-card-kpi-scale-text>

            <fd-card-kpi-analytics>
                <fd-card-kpi-analytics-label>Label</fd-card-kpi-analytics-label>
                <fd-card-kpi-analytics-content>Content</fd-card-kpi-analytics-content>
            </fd-card-kpi-analytics>
            <fd-card-kpi-analytics>
                <fd-card-kpi-analytics-label>Label</fd-card-kpi-analytics-label>
                <fd-card-kpi-analytics-content>Content</fd-card-kpi-analytics-content>
            </fd-card-kpi-analytics>
        </fd-card-kpi-header>
    `
})
class CardKpiHeaderHostTestComponent {
    @ViewChild(CardKpiHeaderComponent) header: CardKpiHeaderComponent;
    @ViewChild(CardKpiValueComponent) kpiValue: CardKpiValueComponent;
    @ViewChild(CardKpiScaleIconComponent) scaleIcon: CardKpiScaleIconComponent;
    @ViewChild(CardKpiScaleTextComponent) scaleText: CardKpiScaleTextComponent;
    @ViewChild(CardKpiAnalyticsComponent) analytics: CardKpiAnalyticsComponent;
    @ViewChild(CardKpiAnalyticsLabelComponent) analyticsLabel: CardKpiAnalyticsLabelComponent;
    @ViewChild(CardKpiAnalyticsContentComponent) analyticsContent: CardKpiAnalyticsContentComponent;
}
describe('CardKpiHeaderComponent', () => {
    let fixture: ComponentFixture<CardKpiHeaderHostTestComponent>;
    let host: CardKpiHeaderHostTestComponent;

    beforeEach(async(() => {
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
        expect(debugEl.classes[CLASS_NAME.cardAnalyticalArea]).toBeTrue();
    });

    describe('KPI value option', () => {
        it('should add className to its host element', () => {
            const debugEl = fixture.debugElement.query(By.directive(CardKpiValueComponent));
            expect(debugEl.classes[CLASS_NAME.cardAnalyticsKpiValue]).toBeTrue();
        });
    });

    describe('KPI scale', () => {
        describe('icon', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiScaleIconComponent));
                expect(debugEl.classes[CLASS_NAME.cardAnalyticsScaleIcon]).toBeTrue();
            });
        });

        describe('text', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiScaleTextComponent));
                expect(debugEl.classes[CLASS_NAME.cardAnalyticsScaleText]).toBeTrue();
            });
        });
    });

    describe('analytics area', () => {
        it('should add className to its host element', () => {
            const debugEl = fixture.debugElement.query(By.directive(CardKpiAnalyticsComponent));
            expect(debugEl.classes[CLASS_NAME.cardAnalytics]).toBeTrue();
        });

        describe('label', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiAnalyticsLabelComponent));
                expect(debugEl.classes[CLASS_NAME.cardAnalyticsText]).toBeTrue();
            });
        });

        describe('value', () => {
            it('should add className to its host element', () => {
                const debugEl = fixture.debugElement.query(By.directive(CardKpiAnalyticsContentComponent));
                expect(debugEl.classes[CLASS_NAME.cardAnalyticsContent]).toBeTrue();
            });
        });
    });
});
