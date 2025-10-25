import { Component, computed, effect, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { RangeSlider } from '@fundamental-ngx/ui5-webcomponents/range-slider';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Slider } from '@fundamental-ngx/ui5-webcomponents/slider';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';
import 'fundamental-styles/dist/section.css';

// Import SAP UI Common CSS
import '@sap-ui/common-css/dist/sap-flex.css';
import '@sap-ui/common-css/dist/sap-margin.css';
import '@sap-ui/common-css/dist/sap-padding.css';
import '@sap-ui/common-css/dist/sap-position.css';
import '@sap-ui/common-css/dist/sap-text.css';

@Component({
    selector: 'ui5-slider-sample',
    templateUrl: './slider-sample.html',
    standalone: true,
    imports: [Slider, RangeSlider, Button, Switch, SegmentedButton, SegmentedButtonItem, Label],
    styles: [
        `
            .sap-helper-text {
                color: var(--sapNeutralTextColor);
                font-size: 0.875rem;
            }

            .sap-helper-text-small {
                color: var(--sapNeutralTextColor);
                font-size: 0.75rem;
            }

            .progress-bar-container {
                width: 100%;
                height: 8px;
                background: var(--sapNeutralBackground);
                border-radius: 4px;
                overflow: hidden;
            }

            .progress-bar-fill {
                height: 100%;
                transition: all 0.1s ease;
            }

            .temperature-indicator {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: linear-gradient(to right, #4fc3f7, #f44336);
            }
        `
    ]
})
export class SliderExample {
    // Basic slider signals
    readonly basicSliderValue = signal<number>(25);
    readonly volumeValue = signal<number>(75);
    readonly temperatureValue = signal<number>(22);

    // Range slider signals
    readonly priceRangeStart = signal<number>(300);
    readonly priceRangeEnd = signal<number>(700);
    readonly timeRangeStart = signal<number>(9);
    readonly timeRangeEnd = signal<number>(17);

    // Configuration signals
    readonly showTooltip = signal<boolean>(true);
    readonly showTickmarks = signal<boolean>(false);
    readonly editableTooltip = signal<boolean>(false);
    readonly disabled = signal<boolean>(false);
    readonly step = signal<number>(1);
    readonly labelInterval = signal<number>(0);

    // Demo configuration signals
    readonly configSliderValue = signal<number>(50);
    readonly configMin = signal<number>(0);
    readonly configMax = signal<number>(100);

    // Advanced demo signals
    readonly progressValue = signal<number>(0);
    readonly brightnessValue = signal<number>(80);
    readonly qualityValue = signal<number>(5);
    readonly zoomValue = signal<number>(100);

    // Computed values for display
    readonly temperatureDisplay = computed(() => `${this.temperatureValue()}°C`);
    readonly volumeDisplay = computed(() => `${this.volumeValue()}%`);
    readonly priceRange = computed(() => `$${this.priceRangeStart()} - $${this.priceRangeEnd()}`);
    readonly timeRange = computed(() => `${this.timeRangeStart()}:00 - ${this.timeRangeEnd()}:00`);
    readonly qualityText = computed(() => {
        const quality = this.qualityValue();
        if (quality <= 2) {return 'Low';}
        if (quality <= 4) {return 'Medium';}
        if (quality <= 6) {return 'High';}
        if (quality <= 8) {return 'Very High';}
        return 'Ultra';
    });
    readonly zoomDisplay = computed(() => `${this.zoomValue()}%`);

    // Available step options
    readonly stepOptions = computed(() => [1, 5, 10, 20]);
    readonly labelIntervalOptions = computed(() => [0, 2, 5, 10]);

    constructor() {
        // Auto-increment progress demo
        effect(() => {
            const interval = setInterval(() => {
                const current = this.progressValue();
                if (current >= 100) {
                    this.progressValue.set(0);
                } else {
                    this.progressValue.set(current + 1);
                }
            }, 100);

            return () => clearInterval(interval);
        });
    }

    // Event handlers for basic sliders
    onBasicSliderChange(event: any): void {
        this.basicSliderValue.set(event.target.value);
    }

    onVolumeChange(event: any): void {
        this.volumeValue.set(event.target.value);
    }

    onTemperatureChange(event: any): void {
        this.temperatureValue.set(event.target.value);
    }

    // Event handlers for range sliders
    onPriceRangeChange(event: any): void {
        this.priceRangeStart.set(event.target.startValue);
        this.priceRangeEnd.set(event.target.endValue);
    }

    onTimeRangeChange(event: any): void {
        this.timeRangeStart.set(event.target.startValue);
        this.timeRangeEnd.set(event.target.endValue);
    }

    // Event handlers for configurable slider
    onConfigSliderChange(event: any): void {
        this.configSliderValue.set(event.target.value);
    }

    // Event handlers for advanced demo sliders
    onBrightnessChange(event: any): void {
        this.brightnessValue.set(event.target.value);
    }

    onQualityChange(event: any): void {
        this.qualityValue.set(event.target.value);
    }

    onZoomChange(event: any): void {
        this.zoomValue.set(event.target.value);
    }

    // Configuration toggle methods
    toggleTooltip(): void {
        this.showTooltip.update((value) => !value);
    }

    toggleTickmarks(): void {
        this.showTickmarks.update((value) => !value);
    }

    toggleEditableTooltip(): void {
        this.editableTooltip.update((value) => !value);
    }

    toggleDisabled(): void {
        this.disabled.update((value) => !value);
    }

    // Configuration setter methods
    onStepChange(event: any): void {
        const selectedText = event.target.text;
        this.step.set(Number(selectedText));
    }

    onLabelIntervalChange(event: any): void {
        const selectedText = event.target.text;
        this.labelInterval.set(Number(selectedText));
    }

    // Preset configuration methods
    setBasicConfiguration(): void {
        this.showTooltip.set(false);
        this.showTickmarks.set(false);
        this.editableTooltip.set(false);
        this.step.set(1);
        this.labelInterval.set(0);
        this.configMin.set(0);
        this.configMax.set(100);
    }

    setAdvancedConfiguration(): void {
        this.showTooltip.set(true);
        this.showTickmarks.set(true);
        this.editableTooltip.set(true);
        this.step.set(10);
        this.labelInterval.set(2);
        this.configMin.set(0);
        this.configMax.set(100);
    }

    setCustomRangeConfiguration(): void {
        this.showTooltip.set(true);
        this.showTickmarks.set(false);
        this.editableTooltip.set(false);
        this.step.set(5);
        this.labelInterval.set(0);
        this.configMin.set(-50);
        this.configMax.set(150);
    }

    resetConfiguration(): void {
        this.showTooltip.set(true);
        this.showTickmarks.set(false);
        this.editableTooltip.set(false);
        this.disabled.set(false);
        this.step.set(1);
        this.labelInterval.set(0);
        this.configMin.set(0);
        this.configMax.set(100);
        this.configSliderValue.set(50);
    }

    // Utility methods for demos
    getProgressColor(): string {
        const progress = this.progressValue();
        if (progress < 25) {return 'var(--sapErrorColor)';}
        if (progress < 50) {return 'var(--sapCriticalColor)';}
        if (progress < 75) {return 'var(--sapNeutralColor)';}
        return 'var(--sapSuccessColor)';
    }

    getBrightnessFilter(): string {
        return `brightness(${this.brightnessValue()}%)`;
    }
}
