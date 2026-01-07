import { Component, signal } from '@angular/core';
import { Panel } from '@fundamental-ngx/ui5-webcomponents/panel';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

@Component({
    selector: 'ui5-sticky-header-panel-sample',
    templateUrl: './sticky-header-panel.html',
    styles: `
        .scrollable-content {
            max-height: 200px;
            overflow-y: auto;
        }
    `,
    standalone: true,
    imports: [Panel, Text]
})
export class StickyHeaderPanelExample {
    readonly stickyEnabled = signal<boolean>(true);

    readonly contentSections = signal([
        {
            title: 'Introduction',
            content:
                'This section demonstrates the sticky header functionality. When enabled, the panel header remains visible while scrolling through the content.'
        },
        {
            title: 'Features Overview',
            content:
                'The sticky header feature is particularly useful for long content areas where you want to maintain context and provide easy access to panel controls.'
        },
        {
            title: 'Implementation Details',
            content:
                'The sticky header uses CSS position sticky to keep the header in view. This works well with various content types including lists, forms, and text.'
        },
        {
            title: 'Best Practices',
            content:
                'Use sticky headers for panels with extensive content that users need to scroll through while maintaining access to header actions or information.'
        },
        {
            title: 'Performance Considerations',
            content:
                'Sticky headers have minimal performance impact and work well across modern browsers. They enhance user experience by reducing navigation overhead.'
        },
        {
            title: 'Accessibility',
            content:
                'Sticky headers maintain accessibility standards and work well with screen readers and keyboard navigation patterns.'
        }
    ]);
}
