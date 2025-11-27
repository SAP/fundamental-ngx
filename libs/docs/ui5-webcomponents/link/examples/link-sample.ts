import { Component, computed, effect, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Link } from '@fundamental-ngx/ui5-webcomponents/link';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

interface SampleLink {
    text: string;
    href: string;
    icon?: string;
    endIcon?: string;
    tooltip: string;
}

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';
import 'fundamental-styles/dist/section.css';

// Import SAP UI Common CSS
import '@sap-ui/common-css/dist/sap-flex.css';
import '@sap-ui/common-css/dist/sap-heading.css';
import '@sap-ui/common-css/dist/sap-margin.css';
import '@sap-ui/common-css/dist/sap-padding.css';
import '@sap-ui/common-css/dist/sap-text.css';

@Component({
    selector: 'ui5-link-sample',
    templateUrl: './link-sample.html',
    standalone: true,
    imports: [Link, Switch, Button, SegmentedButton, SegmentedButtonItem, Label],
    styles: [
        `
            /* Minimal custom styles - most replaced with utility classes */
            .example-section {
                margin-bottom: 2rem;
                padding: 1rem;
            }

            .controls-section {
                background: var(--sapGroup_ContentBackground);
                border-radius: 0.25rem;
                padding: 1rem;
            }
        `
    ]
})
export class LinkExample {
    // Angular 20 signals for reactive state management
    readonly disabled = signal(false);
    readonly design = signal<'Default' | 'Subtle' | 'Emphasized'>('Default');
    readonly wrappingType = signal<'Normal' | 'None'>('Normal');
    readonly interactiveAreaSize = signal<'Normal' | 'Large'>('Normal');
    readonly target = signal<'_self' | '_blank' | '_top' | '_parent'>('_self');
    readonly showIcons = signal(true);
    readonly showTooltips = signal(true);

    // Sample data for different link types
    readonly linkTypes = signal([
        {
            text: 'Standard Link',
            href: 'https://sap.com',
            description: 'Default design link to SAP homepage'
        },
        {
            text: 'Subtle Link',
            href: 'https://ui5.sap.com',
            description: 'Less prominent styling for secondary actions'
        },
        {
            text: 'Emphasized Link',
            href: 'https://help.sap.com',
            description: 'More prominent styling for important actions'
        },
        {
            text: 'Disabled Link',
            href: 'https://sap.com/disabled',
            description: 'Non-interactive link state'
        }
    ]);

    // Sample links with various configurations
    readonly sampleLinks = signal<SampleLink[]>([
        {
            text: 'Download Report',
            href: '#download',
            icon: 'download',
            tooltip: 'Download the quarterly report'
        },
        {
            text: 'Edit Settings',
            href: '#settings',
            icon: 'action-settings',
            endIcon: 'navigation-right-arrow',
            tooltip: 'Navigate to settings page'
        },
        {
            text: 'External Link',
            href: 'https://github.com/SAP/ui5-webcomponents',
            icon: 'world',
            tooltip: 'Opens in new window'
        },
        {
            text: 'Help & Support',
            href: 'https://help.sap.com',
            endIcon: 'sys-help-2',
            tooltip: 'Get help and support'
        }
    ]);

    // Computed properties using Angular 20 features
    readonly currentDesign = computed(() => this.design());
    readonly isDisabled = computed(() => this.disabled());
    readonly shouldShowIcons = computed(() => this.showIcons());

    // Demo click counter for interactive examples
    readonly clickCount = signal(0);
    readonly lastClickedLink = signal<string>('');

    constructor() {
        // Angular 20 effect for logging state changes
        effect(() => {
            console.log('Link configuration changed:', {
                disabled: this.disabled(),
                design: this.design(),
                wrappingType: this.wrappingType(),
                interactiveAreaSize: this.interactiveAreaSize(),
                target: this.target()
            });
        });

        // Effect for demonstrating zoneless change detection
        effect(() => {
            if (this.clickCount() > 0) {
                console.log(`Total link clicks: ${this.clickCount()}`);
            }
        });
    }

    // Event handlers
    onLinkClick(linkText: string, event?: UI5WrapperCustomEvent<Link, 'ui5Click'>): void {
        // Prevent navigation for demo purposes on certain links
        if (linkText.includes('Download') || linkText.includes('Settings')) {
            event?.preventDefault();
        }

        this.clickCount.update((count) => count + 1);
        this.lastClickedLink.set(linkText);
        console.log(`Link clicked: ${linkText}`);
    }

    onDesignChange(design: string): void {
        this.design.set(design as 'Default' | 'Subtle' | 'Emphasized');
    }

    onSegmentedButtonChange(event: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        const selectedItems = event.detail.selectedItems;
        if (selectedItems && selectedItems.length > 0) {
            const selectedItem = selectedItems[0];
            const design = selectedItem.textContent?.trim();
            if (design) {
                this.onDesignChange(design);
            }
        }
    }

    onTargetChange(target: string): void {
        this.target.set(target as '_self' | '_blank' | '_top' | '_parent');
    }

    onWrappingTypeChange(wrappingType: string): void {
        this.wrappingType.set(wrappingType as 'Normal' | 'None');
    }

    onInteractiveAreaSizeChange(size: string): void {
        this.interactiveAreaSize.set(size as 'Normal' | 'Large');
    }

    toggleDisabled(): void {
        this.disabled.update((disabled) => !disabled);
    }

    toggleIcons(): void {
        this.showIcons.update((show) => !show);
    }

    toggleTooltips(): void {
        this.showTooltips.update((show) => !show);
    }

    resetDemo(): void {
        this.clickCount.set(0);
        this.lastClickedLink.set('');
        this.disabled.set(false);
        this.design.set('Default');
        this.wrappingType.set('Normal');
        this.interactiveAreaSize.set('Normal');
        this.target.set('_self');
        this.showIcons.set(true);
        this.showTooltips.set(true);
    }

    getLinkDesign(linkText: string): 'Default' | 'Subtle' | 'Emphasized' {
        if (linkText.includes('Subtle')) {
            return 'Subtle';
        }
        if (linkText.includes('Emphasized')) {
            return 'Emphasized';
        }
        return this.currentDesign();
    }

    isLinkDisabled(linkText: string): boolean {
        return linkText.includes('Disabled') || this.isDisabled();
    }

    getTooltip(originalTooltip: string): string | undefined {
        return this.showTooltips() ? originalTooltip : undefined;
    }

    getIcon(iconName: string | undefined): string | undefined {
        return this.shouldShowIcons() && iconName ? iconName : undefined;
    }
}
