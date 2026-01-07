import { Component, computed, effect, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Card } from '@fundamental-ngx/ui5-webcomponents/card';
import { CardHeader } from '@fundamental-ngx/ui5-webcomponents/card-header';
import { Carousel } from '@fundamental-ngx/ui5-webcomponents/carousel';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';
import {
    BackgroundDesign,
    BorderDesign,
    CarouselArrowsPlacement,
    CarouselPageIndicatorType
} from '@fundamental-ngx/ui5-webcomponents/types';

import '@ui5/webcomponents-icons/dist/AllIcons.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';
import 'fundamental-styles/dist/panel.css';
import 'fundamental-styles/dist/section.css';

interface ImageStyle {
    url: string;
    title: string;
    description: string;
    gradient: string;
}

@Component({
    selector: 'ui5-carousel-sample',
    templateUrl: './carousel-sample.html',
    standalone: true,
    imports: [Carousel, Card, CardHeader, Tag, Icon, Title, Label, Button, SegmentedButton, SegmentedButtonItem, Switch]
})
export class CarouselExample {
    // Basic carousel signals
    readonly basicCurrentPage = signal<number>(0);

    // Configuration signals
    readonly cyclic = signal<boolean>(false);
    readonly itemsPerPage = signal<string>('S1 M1 L1 XL1');
    readonly hideNavigationArrows = signal<boolean>(false);
    readonly hidePageIndicator = signal<boolean>(false);
    readonly pageIndicatorType = signal<CarouselPageIndicatorType>(CarouselPageIndicatorType.Default);
    readonly backgroundDesign = signal<BackgroundDesign>(BackgroundDesign.Translucent);
    readonly pageIndicatorBackgroundDesign = signal<BackgroundDesign>(BackgroundDesign.Solid);
    readonly pageIndicatorBorderDesign = signal<BorderDesign>(BorderDesign.Solid);
    readonly arrowsPlacement = signal<CarouselArrowsPlacement>(CarouselArrowsPlacement.Content);

    // Demo content signals
    readonly currentImagePage = signal<number>(0);
    readonly currentProductPage = signal<number>(0);
    readonly currentFeaturePage = signal<number>(0);

    // Options for configuration
    readonly pageIndicatorTypes = computed(() => Object.values(CarouselPageIndicatorType));
    readonly backgroundDesigns = computed(() => Object.values(BackgroundDesign));
    readonly borderDesigns = computed(() => Object.values(BorderDesign));
    readonly arrowsPlacements = computed(() => Object.values(CarouselArrowsPlacement));

    // Sample data signals
    readonly images = signal<Array<ImageStyle>>([
        {
            url: 'https://picsum.photos/800/500?id=1',
            title: 'Nature Landscape',
            description: 'Beautiful mountain scenery with clear blue sky',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            url: 'https://picsum.photos/800/500?id=2',
            title: 'Urban Architecture',
            description: 'Modern city skyline during golden hour',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            url: 'https://picsum.photos/800/500?id=3',
            title: 'Ocean View',
            description: 'Peaceful ocean waves at sunset',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            url: 'https://picsum.photos/800/500?id=4',
            title: 'Forest Path',
            description: 'Winding trail through autumn forest',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
            url: 'https://picsum.photos/800/500?id=5',
            title: 'Desert Dunes',
            description: 'Golden sand dunes under starlit sky',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }
    ]);

    readonly products = signal<
        Array<{ name: string; price: string; rating: number; category: string; status: string }>
    >([
        { name: 'Wireless Headphones', price: '$299.99', rating: 5, category: 'Electronics', status: 'In Stock' },
        { name: 'Smart Watch', price: '$399.99', rating: 4, category: 'Wearables', status: 'Limited' },
        { name: 'Laptop Stand', price: '$79.99', rating: 5, category: 'Accessories', status: 'In Stock' },
        { name: 'USB-C Hub', price: '$49.99', rating: 4, category: 'Electronics', status: 'In Stock' },
        { name: 'Bluetooth Speaker', price: '$159.99', rating: 5, category: 'Audio', status: 'New' },
        { name: 'Mechanical Keyboard', price: '$199.99', rating: 4, category: 'Accessories', status: 'In Stock' }
    ]);

    readonly features = signal<Array<{ icon: string; title: string; description: string; badge: string }>>([
        {
            icon: 'sap-icon://accelerated',
            title: 'High Performance',
            description: 'Optimized for speed and efficiency with latest technology',
            badge: 'New'
        },
        {
            icon: 'sap-icon://shield',
            title: 'Secure by Design',
            description: 'Enterprise-grade security with end-to-end encryption',
            badge: 'Trusted'
        },
        {
            icon: 'sap-icon://world',
            title: 'Global Scale',
            description: 'Available worldwide with 24/7 support in multiple languages',
            badge: 'Enterprise'
        },
        {
            icon: 'sap-icon://puzzle',
            title: 'Easy Integration',
            description: 'Simple APIs and comprehensive documentation for quick setup',
            badge: 'Developer'
        }
    ]);

    // Computed display properties
    readonly currentConfiguration = computed(() => ({
        cyclic: this.cyclic(),
        itemsPerPage: this.itemsPerPage(),
        hideNavigationArrows: this.hideNavigationArrows(),
        hidePageIndicator: this.hidePageIndicator(),
        pageIndicatorType: this.pageIndicatorType(),
        backgroundDesign: this.backgroundDesign(),
        pageIndicatorBackgroundDesign: this.pageIndicatorBackgroundDesign(),
        pageIndicatorBorderDesign: this.pageIndicatorBorderDesign(),
        arrowsPlacement: this.arrowsPlacement()
    }));

    readonly totalImages = computed(() => this.images().length);
    readonly totalProducts = computed(() => this.products().length);
    readonly totalFeatures = computed(() => this.features().length);

    constructor() {
        // Using Angular 20 effects for reactive side effects
        effect(() => {
            console.log('Carousel configuration changed:', this.currentConfiguration());
        });

        effect(() => {
            console.log('Image carousel page:', this.currentImagePage());
        });

        effect(() => {
            console.log('Product carousel page:', this.currentProductPage());
        });

        effect(() => {
            console.log('Feature carousel page:', this.currentFeaturePage());
        });
    }

    // Navigation event handlers
    onBasicNavigate(event: UI5WrapperCustomEvent<Carousel, 'ui5Navigate'>): void {
        const detail = event.detail;
        this.basicCurrentPage.set(detail.selectedIndex);
        console.log('Basic carousel navigated to page:', detail.selectedIndex);
    }

    onImageNavigate(event: UI5WrapperCustomEvent<Carousel, 'ui5Navigate'>): void {
        const detail = event.detail;
        this.currentImagePage.set(detail.selectedIndex);
        console.log('Image carousel navigated to page:', detail.selectedIndex);
    }

    onProductNavigate(event: UI5WrapperCustomEvent<Carousel, 'ui5Navigate'>): void {
        const detail = event.detail;
        this.currentProductPage.set(detail.selectedIndex);
        console.log('Product carousel navigated to page:', detail.selectedIndex);
    }

    onFeatureNavigate(event: UI5WrapperCustomEvent<Carousel, 'ui5Navigate'>): void {
        const detail = event.detail;
        this.currentFeaturePage.set(detail.selectedIndex);
        console.log('Feature carousel navigated to page:', detail.selectedIndex);
    }

    // Configuration change handlers
    onPageIndicatorTypeChange(event: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        if (selectedItems.length > 0) {
            const selectedType = selectedItems[0].innerText as CarouselPageIndicatorType;
            this.pageIndicatorType.set(selectedType);
        }
    }

    onArrowsPlacementChange(event: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        const detail = event.detail;
        const selectedItems = detail.selectedItems || [];
        if (selectedItems.length > 0) {
            const selectedPlacement = selectedItems[0].innerText as CarouselArrowsPlacement;
            this.arrowsPlacement.set(selectedPlacement);
        }
    }

    // Toggle methods
    toggleCyclic(): void {
        this.cyclic.update((current) => !current);
    }

    toggleNavigationArrows(): void {
        this.hideNavigationArrows.update((current) => !current);
    }

    togglePageIndicator(): void {
        this.hidePageIndicator.update((current) => !current);
    }

    // Preset configurations
    setMobileConfiguration(): void {
        this.itemsPerPage.set('S1 M2 L3 XL4');
        this.pageIndicatorType.set(CarouselPageIndicatorType.Numeric);
        this.arrowsPlacement.set(CarouselArrowsPlacement.Navigation);
    }

    setDesktopConfiguration(): void {
        this.itemsPerPage.set('S1 M1 L2 XL3');
        this.pageIndicatorType.set(CarouselPageIndicatorType.Default);
        this.arrowsPlacement.set(CarouselArrowsPlacement.Content);
    }

    resetConfiguration(): void {
        this.cyclic.set(false);
        this.itemsPerPage.set('S1 M1 L1 XL1');
        this.hideNavigationArrows.set(false);
        this.hidePageIndicator.set(false);
        this.pageIndicatorType.set(CarouselPageIndicatorType.Default);
        this.backgroundDesign.set(BackgroundDesign.Translucent);
        this.pageIndicatorBackgroundDesign.set(BackgroundDesign.Solid);
        this.pageIndicatorBorderDesign.set(BorderDesign.Solid);
        this.arrowsPlacement.set(CarouselArrowsPlacement.Content);
    }

    // Helper methods
    getStarRating(rating: number): string[] {
        return Array(5)
            .fill('')
            .map((_, i) => (i < rating ? '★' : '☆'));
    }

    getTagType(status: string): string {
        const types: { [key: string]: string } = {
            New: '8',
            Featured: '5',
            Sale: '1',
            Popular: '9',
            Trusted: '6',
            Enterprise: '7',
            Developer: '10'
        };
        return types[status] || '1';
    }

    getImageStyle(image: ImageStyle): string {
        return `
            height: 500px;
            background: ${image.gradient};
            background-image: url('${image.url}');
            background-size: cover;
            background-position: center;
            background-blend-mode: overlay;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
    }

    getCardImageStyle(image: ImageStyle): string {
        return `
            height: 250px;
            background: ${image.gradient};
            background-image: url('${image.url}');
            background-size: cover;
            background-position: center;
            background-blend-mode: overlay;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
    }
}
