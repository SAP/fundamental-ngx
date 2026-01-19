import { DatePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BarcodeScannerDialog } from '@fundamental-ngx/ui5-webcomponents-fiori/barcode-scanner-dialog';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';

// Import CSS classes for styling
import '@sap-ui/common-css/dist/sap-display.css';
import '@sap-ui/common-css/dist/sap-flex.css';
import '@sap-ui/common-css/dist/sap-margin.css';
import '@sap-ui/common-css/dist/sap-text.css';
import 'fundamental-styles/dist/section.css';

interface ScanResult {
    text: string;
    timestamp: Date;
    format?: string;
}

@Component({
    selector: 'ui5-barcode-scanner-dialog-sample',
    templateUrl: './barcode-scanner-dialog-sample.html',
    standalone: true,
    imports: [BarcodeScannerDialog, Button, MessageStrip, CheckBox, Tag, DatePipe]
})
export class BarcodeScannerDialogExample {
    // Basic scanner dialog state
    readonly isBasicScannerOpen = signal(false);
    readonly lastScanResult = signal<ScanResult | null>(null);
    readonly scanCount = signal(0);
    readonly isAutoCloseEnabled = signal(true);
    readonly errorCount = signal(0);

    // Computed values
    readonly scanSuccessRate = computed(() => {
        const total = this.scanCount();
        const errors = this.errorCount();
        return total > 0 ? (((total - errors) / total) * 100).toFixed(1) : '100';
    });

    // Basic scanner methods
    openBasicScanner(): void {
        this.isBasicScannerOpen.set(true);
    }

    onBasicScannerClose(): void {
        this.isBasicScannerOpen.set(false);
    }

    onBasicScanSuccess(event: any): void {
        const scanText = event.detail?.text || 'Sample Barcode 123456789';
        const result: ScanResult = {
            text: scanText,
            timestamp: new Date(),
            format: 'Code128' // Mock format
        };

        this.lastScanResult.set(result);
        this.scanCount.update((count) => count + 1);

        if (this.isAutoCloseEnabled()) {
            this.isBasicScannerOpen.set(false);
        }
    }

    onBasicScanError(event: any): void {
        console.error('Basic scan error:', event.detail);
        this.errorCount.update((count) => count + 1);
    }

    toggleAutoClose(): void {
        this.isAutoCloseEnabled.update((enabled) => !enabled);
    }
}
