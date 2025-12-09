import { Component, signal } from '@angular/core';
import { NavigationLayout } from '@fundamental-ngx/ui5-webcomponents-fiori/navigation-layout';
import { NavigationLayoutMode } from '@fundamental-ngx/ui5-webcomponents-fiori/types';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

interface NavigationItem {
    id: string;
    label: string;
    icon: string;
    selected?: boolean;
}

interface ContentSection {
    title: string;
    description: string;
}

@Component({
    selector: 'ui5-navigation-layout-sample',
    standalone: true,
    imports: [NavigationLayout, Button, List, ListItemStandard, Title, Text, Avatar, Icon],
    templateUrl: './navigation-layout-sample.html'
})
export class NavigationLayoutSample {
    // Expose enum for template
    readonly NavigationLayoutMode = NavigationLayoutMode;

    // State signals
    currentMode = signal<(typeof NavigationLayoutMode)[keyof typeof NavigationLayoutMode]>(NavigationLayoutMode.Auto);
    selectedNavItem = signal<string>('home');

    // Navigation items
    navigationItems = signal<NavigationItem[]>([
        { id: 'home', label: 'Home', icon: 'home', selected: true },
        { id: 'products', label: 'Products', icon: 'product' },
        { id: 'orders', label: 'Orders', icon: 'cart' },
        { id: 'customers', label: 'Customers', icon: 'customer' },
        { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
        { id: 'settings', label: 'Settings', icon: 'action-settings' }
    ]);

    // Content sections for different navigation items
    contentSections: Record<string, ContentSection> = {
        home: {
            title: 'Dashboard',
            description:
                'Welcome to your dashboard. Here you can see an overview of your business metrics and recent activities.'
        },
        products: {
            title: 'Product Catalog',
            description:
                'Browse and manage your product inventory. Add new products, update pricing, and track stock levels.'
        },
        orders: {
            title: 'Order Management',
            description: 'View and process customer orders. Track order status, manage fulfillment, and handle returns.'
        },
        customers: {
            title: 'Customer Directory',
            description:
                'Manage your customer relationships. View customer profiles, purchase history, and contact information.'
        },
        analytics: {
            title: 'Business Analytics',
            description: 'Analyze your business performance with detailed reports and visualizations of key metrics.'
        },
        settings: {
            title: 'Application Settings',
            description: 'Configure your application preferences, user permissions, and system integrations.'
        }
    };

    // Methods
    changeMode(mode: (typeof NavigationLayoutMode)[keyof typeof NavigationLayoutMode]): void {
        this.currentMode.set(mode);
    }

    selectNavItem(itemId: string): void {
        this.selectedNavItem.set(itemId);
        // Update selected state
        this.navigationItems.update((items) => items.map((item) => ({ ...item, selected: item.id === itemId })));
    }

    getCurrentContent(): ContentSection {
        return this.contentSections[this.selectedNavItem()] || this.contentSections.home;
    }
}
