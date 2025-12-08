import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { IllustratedMessage } from '@fundamental-ngx/ui5-webcomponents-fiori/illustrated-message';
import { IllustrationMessageDesign, IllustrationMessageType } from '@fundamental-ngx/ui5-webcomponents-fiori/types';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Link } from '@fundamental-ngx/ui5-webcomponents/link';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import illustrations (BeforeSearch is loaded by default, others must be explicitly imported)
import '@ui5/webcomponents-fiori/dist/illustrations/Achievement.js';
import '@ui5/webcomponents-fiori/dist/illustrations/DragFilesToUpload.js';
import '@ui5/webcomponents-fiori/dist/illustrations/NoActivities.js';
import '@ui5/webcomponents-fiori/dist/illustrations/NoData.js';
import '@ui5/webcomponents-fiori/dist/illustrations/NoEntries.js';
import '@ui5/webcomponents-fiori/dist/illustrations/NoMail.js';
import '@ui5/webcomponents-fiori/dist/illustrations/NoNotifications.js';

@Component({
    selector: 'ui5-illustrated-message-sample',
    standalone: true,
    imports: [IllustratedMessage, Button, Title, Text, Input, Link],
    templateUrl: './illustrated-message-sample.html'
})
export class IllustratedMessageSample {
    // Expose enums for template
    readonly IllustrationMessageType = IllustrationMessageType;
    readonly IllustrationMessageDesign = IllustrationMessageDesign;

    // State signals
    searchQuery = signal('');
    hasSearchResults = signal(false);
    selectedDesign = signal<(typeof IllustrationMessageDesign)[keyof typeof IllustrationMessageDesign]>(
        IllustrationMessageDesign.Auto
    );
    isLoading = signal(false);
    uploadComplete = signal(false);

    // Search functionality
    performSearch(): void {
        const query = this.searchQuery().trim();
        if (query) {
            this.isLoading.set(true);
            // Simulate search
            setTimeout(() => {
                this.hasSearchResults.set(true);
                this.isLoading.set(false);
            }, 1000);
        }
    }

    clearSearch(): void {
        this.searchQuery.set('');
        this.hasSearchResults.set(false);
    }

    // Upload functionality
    handleFileUpload(): void {
        this.isLoading.set(true);
        setTimeout(() => {
            this.uploadComplete.set(true);
            this.isLoading.set(false);
        }, 1500);
    }

    resetUpload(): void {
        this.uploadComplete.set(false);
    }

    // Design change
    changeDesign(design: (typeof IllustrationMessageDesign)[keyof typeof IllustrationMessageDesign]): void {
        this.selectedDesign.set(design);
    }

    // Handle search input
    onSearchInput(event: UI5WrapperCustomEvent<Input, 'ui5Input'>): void {
        const input = event.target as HTMLInputElement;
        this.searchQuery.set(input.value || '');
    }
}
