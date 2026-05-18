export interface UsageGuideDecisionOption {
    answer: string;
    recommendation: string;
    example: string;
}

export interface UsageGuideDecisionNode {
    question: string;
    options: UsageGuideDecisionOption[];
}

export interface UsageGuide {
    component: string;
    summary: string;
    decisionTree: UsageGuideDecisionNode[];
    commonPitfalls: string[];
    compositionPattern: string;
    relatedComponents: string[];
    resources?: string[];
}

export const USAGE_GUIDES: Record<string, UsageGuide> = {
    dialog: {
        component: 'dialog',
        summary:
            'Fundamental NGX provides three dialog API surfaces: template-based, component-based, and object-based. All are opened via DialogService.',
        decisionTree: [
            {
                question: 'What kind of dialog do you need?',
                options: [
                    {
                        answer: 'Simple confirmation or message',
                        recommendation:
                            'Use DialogDefaultContent with DialogService.open(). Minimal setup, no separate template or component needed.',
                        example: `const ref = this._dialogService.open(DialogDefaultContent, {
  data: {
    title: 'Confirm',
    content: 'Are you sure?',
    approveButton: 'Yes',
    approveButtonCallback: () => ref.close('confirmed')
  }
});`
                    },
                    {
                        answer: 'Custom layout with form fields or complex content',
                        recommendation:
                            'Use a template reference with DialogService.open(templateRef). Define your layout in an ng-template with fdDialogTemplate directive.',
                        example: `<!-- In template -->
<ng-template #dialogTemplate let-dialogRef>
  <fd-dialog-header>
    <h2 fd-title>Edit User</h2>
  </fd-dialog-header>
  <fd-dialog-body>
    <fd-form-group>...</fd-form-group>
  </fd-dialog-body>
  <fd-dialog-footer>
    <fd-button (click)="dialogRef.close('save')">Save</fd-button>
  </fd-dialog-footer>
</ng-template>

// In component class
this._dialogService.open(this.dialogTemplate, { width: '500px' });`
                    },
                    {
                        answer: 'Reusable dialog with its own logic and state',
                        recommendation:
                            'Create a standalone component and open it via DialogService.open(ComponentRef). The component receives DialogRef via injection.',
                        example: `// my-dialog.component.ts
@Component({ ... })
export class MyDialogComponent {
  private readonly _dialogRef = inject(DialogRef);

  save(): void {
    this._dialogRef.close(this.form.value);
  }
}

// Parent component
this._dialogService.open(MyDialogComponent, {
  data: { userId: 123 },
  width: '600px'
});`
                    }
                ]
            },
            {
                question: 'Which dialog component should you use?',
                options: [
                    {
                        answer: 'Standard dialog with full customization',
                        recommendation:
                            'Use fd-dialog (from @fundamental-ngx/core). Supports draggable, resizable, custom sizing.',
                        example: '<fd-dialog> with <fd-dialog-header>, <fd-dialog-body>, <fd-dialog-footer>'
                    },
                    {
                        answer: 'UI5 Web Components-based dialog',
                        recommendation:
                            'Use ui5-dialog (from @fundamental-ngx/ui5-webcomponents). Lighter weight, follows SAP Fiori design guidelines natively.',
                        example: '<ui5-dialog> with header-text input and default slot for content'
                    },
                    {
                        answer: 'Pre-built message/alert dialog',
                        recommendation:
                            'Use fd-message-box (from @fundamental-ngx/core). Built-in icons, semantic types (error, warning, success, information).',
                        example:
                            'this._messageBoxService.open(MessageBoxComponent, { type: "error", title: "Error", message: "Something went wrong" })'
                    }
                ]
            }
        ],
        commonPitfalls: [
            'TypeError: Cannot read properties of null — occurs when using the wrong dialog API surface. DialogDefaultContent expects data.content to be a string or TemplateRef, not a component reference.',
            'Dialog body not scrollable — wrap body content in <fd-dialog-body> which handles overflow automatically.',
            'Focus not trapped inside dialog — ensure focusTrapped: true in DialogConfig (default is true).',
            'Dialog not closing on Escape — check that escKeyClosable is not set to false in config.',
            'ARIA warnings — always provide ariaLabelledBy pointing to the dialog title element ID.'
        ],
        compositionPattern: `<fd-dialog>
  <fd-dialog-header>
    <h2 fd-title id="dialog-title">Dialog Title</h2>
  </fd-dialog-header>
  <fd-dialog-body>
    <!-- Your content here -->
  </fd-dialog-body>
  <fd-dialog-footer>
    <fd-bar barDesign="footer">
      <fd-bar-element>
        <button fd-button fdType="emphasized" (click)="close()">Save</button>
      </fd-bar-element>
      <fd-bar-element>
        <button fd-button fdType="transparent" (click)="dismiss()">Cancel</button>
      </fd-bar-element>
    </fd-bar>
  </fd-dialog-footer>
</fd-dialog>`,
        relatedComponents: [
            'fd-dialog-header',
            'fd-dialog-body',
            'fd-dialog-footer',
            'fd-bar',
            'fd-message-box',
            'ui5-dialog'
        ]
    },

    table: {
        component: 'table',
        summary:
            'Three table implementations: fd-table (core, lightweight), fdp-table (platform, feature-rich), and ui5-table (UI5 Web Components).',
        decisionTree: [
            {
                question: 'What table features do you need?',
                options: [
                    {
                        answer: 'Simple data display with manual column definition',
                        recommendation:
                            'Use fd-table (from @fundamental-ngx/core). Direct HTML table markup with fd-table directives.',
                        example: `<table fd-table>
  <thead fd-table-header>
    <tr fd-table-row>
      <th fd-table-cell>Name</th>
      <th fd-table-cell>Status</th>
    </tr>
  </thead>
  <tbody>
    @for (item of items(); track item.id) {
      <tr fd-table-row>
        <td fd-table-cell>{{ item.name }}</td>
        <td fd-table-cell>{{ item.status }}</td>
      </tr>
    }
  </tbody>
</table>`
                    },
                    {
                        answer: 'Sorting, filtering, grouping, pagination out of the box',
                        recommendation:
                            'Use fdp-table (from @fundamental-ngx/platform). Declarative configuration with built-in data source.',
                        example: `<fdp-table [dataSource]="dataSource" [columns]="columns">
  <fdp-column key="name" label="Name"></fdp-column>
  <fdp-column key="status" label="Status"></fdp-column>
</fdp-table>`
                    },
                    {
                        answer: 'SAP Fiori design system compliance',
                        recommendation:
                            'Use ui5-table (from @fundamental-ngx/ui5-webcomponents). Web component-based, automatic Fiori styling.',
                        example: `<ui5-table>
  <ui5-table-header-row slot="headerRow">
    <ui5-table-header-cell>Name</ui5-table-header-cell>
  </ui5-table-header-row>
  <ui5-table-row>
    <ui5-table-cell>John Doe</ui5-table-cell>
  </ui5-table-row>
</ui5-table>`
                    }
                ]
            }
        ],
        commonPitfalls: [
            'fd-table requires manual sort/filter implementation — use fdp-table if you need those features built-in.',
            'fdp-table dataSource must implement the DataSource interface from @fundamental-ngx/cdk.',
            '@for loops in fd-table require a track expression (e.g., track item.id).'
        ],
        compositionPattern: `<table fd-table>
  <thead fd-table-header>
    <tr fd-table-row>
      <th fd-table-cell>Column</th>
    </tr>
  </thead>
  <tbody>
    <tr fd-table-row>
      <td fd-table-cell>Data</td>
    </tr>
  </tbody>
</table>`,
        relatedComponents: [
            'fd-table-header',
            'fd-table-row',
            'fd-table-cell',
            'fdp-table',
            'ui5-table',
            'fd-pagination'
        ]
    },

    button: {
        component: 'button',
        summary:
            'fd-button is an attribute directive applied to native <button> or <a> elements. It is NOT an element selector.',
        decisionTree: [
            {
                question: 'What kind of button do you need?',
                options: [
                    {
                        answer: 'Standard action button',
                        recommendation:
                            'Use fd-button as an attribute on <button>. Key inputs: fdType (standard, positive, negative, attention, ghost, transparent), label.',
                        example:
                            '<button fd-button fdType="emphasized" label="Submit"></button>\n<button fd-button fdType="transparent" label="Cancel"></button>'
                    },
                    {
                        answer: 'Button with primary + dropdown actions',
                        recommendation:
                            'Use fd-split-button. Combines a main button with a dropdown menu for secondary actions.',
                        example:
                            '<fd-split-button label="Save" (primaryButtonClick)="save()">\n  <fd-menu>\n    <fd-menu-item text="Save as Draft"></fd-menu-item>\n  </fd-menu>\n</fd-split-button>'
                    },
                    {
                        answer: 'Toggle between multiple options',
                        recommendation:
                            'Use fd-segmented-button. A group of buttons where one (or more) can be selected.',
                        example:
                            '<fd-segmented-button>\n  <button fd-button label="List" [toggled]="view() === \'list\'" (click)="setView(\'list\')"></button>\n  <button fd-button label="Grid" [toggled]="view() === \'grid\'" (click)="setView(\'grid\')"></button>\n</fd-segmented-button>'
                    }
                ]
            }
        ],
        commonPitfalls: [
            'DO NOT use <fd-button> as an element — fd-button is an ATTRIBUTE directive. Correct: <button fd-button>, incorrect: <fd-button>.',
            'For links that look like buttons, use <a fd-button> instead of <button fd-button>.',
            'The label input sets the button text. You can also use content projection: <button fd-button>Click me</button>.'
        ],
        compositionPattern:
            '<button fd-button fdType="emphasized" label="Primary Action"></button>\n<button fd-button fdType="transparent" label="Secondary Action"></button>',
        relatedComponents: ['fd-split-button', 'fd-segmented-button', 'fd-toolbar', 'ui5-button']
    },

    'layout-grid': {
        component: 'layout-grid',
        summary:
            'Responsive grid layout using fd-layout-grid container and fdLayoutGridCol directive on child elements.',
        decisionTree: [
            {
                question: 'What layout approach do you need?',
                options: [
                    {
                        answer: 'Even columns that reflow responsively',
                        recommendation:
                            'Use fd-layout-grid with fdLayoutGridCol directive. Set column spans per breakpoint.',
                        example: `<fd-layout-grid>
  <div fdLayoutGridCol="4" [colMd]="6" [colLg]="4" [colXl]="3">
    Column 1
  </div>
  <div fdLayoutGridCol="4" [colMd]="6" [colLg]="4" [colXl]="3">
    Column 2
  </div>
</fd-layout-grid>`
                    },
                    {
                        answer: 'Master-detail or multi-panel layout',
                        recommendation:
                            'Use fd-flexible-column-layout for 1-2-3 column responsive layouts with SAP Fiori patterns.',
                        example: '<fd-flexible-column-layout [layout]="layout()">'
                    }
                ]
            }
        ],
        commonPitfalls: [
            'There is NO colSm input. The default/small breakpoint column span is set via the fdLayoutGridCol directive value itself (e.g., fdLayoutGridCol="6" means 6 columns on small screens).',
            'Breakpoint thresholds: small < 600px, medium 600-1024px, large 1024-1440px, extra-large > 1440px.',
            'fdLayoutGridCol is an ATTRIBUTE directive, not an element. Apply it to a div or other container element.',
            'Use [noGap]="true" on fd-layout-grid to remove gutters between columns.'
        ],
        compositionPattern: `<fd-layout-grid>
  <div fdLayoutGridCol="12" [colMd]="6" [colLg]="4">
    <!-- Content -->
  </div>
</fd-layout-grid>`,
        relatedComponents: ['fd-layout-grid', 'fd-flexible-column-layout']
    },

    card: {
        component: 'card',
        summary:
            'Card uses content projection with attribute directives for title and subtitle. Note: fd-card-title and fd-card-subtitle are ATTRIBUTE directives.',
        decisionTree: [
            {
                question: 'What type of card do you need?',
                options: [
                    {
                        answer: 'Standard content card',
                        recommendation: 'Use fd-card with fd-card-header and fd-card-content sections.',
                        example: `<fd-card>
  <fd-card-header>
    <h3 fd-card-title>Card Title</h3>
    <p fd-card-subtitle>Subtitle text</p>
  </fd-card-header>
  <fd-card-content>
    <p>Card body content here.</p>
  </fd-card-content>
</fd-card>`
                    },
                    {
                        answer: 'UI5 Web Components card',
                        recommendation: 'Use ui5-card. Simpler API with header-text and subtitle-text inputs.',
                        example: `<ui5-card>
  <ui5-card-header slot="header" title-text="Card Title" subtitle-text="Subtitle"></ui5-card-header>
  <div>Card content</div>
</ui5-card>`
                    }
                ]
            }
        ],
        commonPitfalls: [
            'fd-card-title and fd-card-subtitle are ATTRIBUTE directives. Use <h3 fd-card-title> not <fd-card-title>.',
            'fd-card-header wraps the title area. fd-card-content wraps the body area. Both are element selectors.',
            'For clickable cards, add [cardType]="\'list\'" and listen to (cardClick).'
        ],
        compositionPattern: `<fd-card>
  <fd-card-header>
    <fd-avatar image="..." size="xs"></fd-avatar>
    <h3 fd-card-title>Title</h3>
    <p fd-card-subtitle>Subtitle</p>
    <span fd-card-counter>3 of 10</span>
  </fd-card-header>
  <fd-card-content>
    <!-- Body content -->
  </fd-card-content>
</fd-card>`,
        relatedComponents: ['fd-card-header', 'fd-card-content', 'fd-avatar', 'fd-tile', 'ui5-card']
    },

    'fd-flexible-column-layout': {
        component: 'fd-flexible-column-layout',
        summary:
            'SAP Fiori master-detail layout that transitions between 1, 2, and 3 columns. Controlled by the FlexibleColumnLayout enum via the layout input. Content is projected via #startColumn, #midColumn, and #endColumn template reference variables.',
        decisionTree: [
            {
                question:
                    'Is the Flexible Column Layout the right choice for this use case? (Per UX specs: use it only for drill-down / list-detail navigation)',
                options: [
                    {
                        answer: 'List-detail or list-detail-detail drill-down navigation',
                        recommendation:
                            'Yes, use fd-flexible-column-layout. It is designed exactly for hierarchical drill-down flows where the user navigates deeper into detail columns.',
                        example: `// Typical flow: list → detail → sub-detail
layout = signal(FlexibleColumnLayout.OneColumnStartFullScreen);
// User selects item → TwoColumnsMidExpanded
// User drills further → ThreeColumnsEndExpanded`
                    },
                    {
                        answer: 'Workbench or tools layout (main column + side panels)',
                        recommendation:
                            'Do NOT use fd-flexible-column-layout. Use fd-dynamic-side-content instead. FCL is not meant for a main column with additional side columns.',
                        example: `// Use fd-dynamic-side-content for tool/workbench layouts`
                    },
                    {
                        answer: 'Dashboard with context-independent pages',
                        recommendation:
                            'Do NOT use fd-flexible-column-layout. Dashboards with independent tiles or cards do not fit the drill-down model FCL is built for.',
                        example: `// Use a grid layout (fd-layout-grid) for dashboards`
                    },
                    {
                        answer: 'Multiple instances of the same object type side by side',
                        recommendation:
                            'Do NOT use fd-flexible-column-layout. Use the multi-instance handling floor plan instead. FCL is for hierarchical drill-down, not parallel instances.',
                        example: `// Multi-instance handling floor plan for same-type parallel objects`
                    }
                ]
            },
            {
                question: 'What should the initial layout be when the app first loads?',
                options: [
                    {
                        answer: 'Start with one column (recommended default) — user drills in by selecting an item',
                        recommendation:
                            'Use OneColumnStartFullScreen as the initial layout. This is the UX-spec recommended default. The user opens new columns by navigating forward. Do not start with 3 columns — too much information at once confuses users.',
                        example: `layout = signal(FlexibleColumnLayout.OneColumnStartFullScreen);

// On item select → navigate to 2-column layout:
onItemSelect() {
  this.layout.set(FlexibleColumnLayout.TwoColumnsMidExpanded);
}`
                    },
                    {
                        answer: 'Start with two columns (list always visible alongside a default detail)',
                        recommendation:
                            'Acceptable when your use case requires always showing a default detail. Ensure size S shows the FIRST column — FCL always shows the last (rightmost) column in size S by default, so starting at TwoColumnsStartExpanded or TwoColumnsMidExpanded may hide the list on phone.',
                        example: `layout = signal(FlexibleColumnLayout.TwoColumnsMidExpanded);
// Must verify size-S behavior shows startColumn, not midColumn`
                    }
                ]
            },
            {
                question:
                    'You need a 2-column layout — which ratio fits the use case? (UX spec defaults: 33:67 or 67:33)',
                options: [
                    {
                        answer: 'List is primary — user browses and selects items frequently',
                        recommendation:
                            'Use TwoColumnsStartExpanded (67% start / 33% mid). The list column is dominant. Ratio is fixed by default but the user can drag the splitter.',
                        example: `layout = signal(FlexibleColumnLayout.TwoColumnsStartExpanded);
// startColumn: 67%, midColumn: 33%`
                    },
                    {
                        answer: 'Detail is primary — user mainly reads or edits the detail view',
                        recommendation:
                            'Use TwoColumnsMidExpanded (33% start / 67% mid). The detail column is dominant. This is the most common 2-column layout for object pages.',
                        example: `layout = signal(FlexibleColumnLayout.TwoColumnsMidExpanded);
// startColumn: 33%, midColumn: 67%`
                    },
                    {
                        answer: 'End column is the primary detail (start is the list, mid is a sub-list)',
                        recommendation:
                            'Use TwoColumnsEndExpanded (33% start / 67% end). Use when mid column acts as a navigation step rather than a destination.',
                        example: `layout = signal(FlexibleColumnLayout.TwoColumnsEndExpanded);
// startColumn: 33%, endColumn: 67%`
                    }
                ]
            },
            {
                question:
                    'You need a 3-column layout — which ratio? (Only available on desktop L/XL; tablet M shows 2 of the 3 columns at a time; phone S always shows a single column)',
                options: [
                    {
                        answer: 'Mid (detail) column is primary content — equal side columns',
                        recommendation:
                            'Use ThreeColumnsMidExpanded (25% : 50% : 25%). Mid column gets half the width. Good when the detail view is the main work area.',
                        example: `layout = signal(FlexibleColumnLayout.ThreeColumnsMidExpanded);
// startColumn: 25%, midColumn: 50%, endColumn: 25%`
                    },
                    {
                        answer: 'End (sub-detail) column is primary content',
                        recommendation:
                            'Use ThreeColumnsEndExpanded (25% : 25% : 50%). End column gets half the width. Use when the user has drilled to the deepest level and needs space there.',
                        example: `layout = signal(FlexibleColumnLayout.ThreeColumnsEndExpanded);
// startColumn: 25%, midColumn: 25%, endColumn: 50%`
                    },
                    {
                        answer: 'Start (list) column is minimized — focus is on mid and end columns',
                        recommendation:
                            'Use ThreeColumnsStartMinimized (0% : 67% : 33%). Start column is hidden. Close and Full Screen actions appear on the right border of mid column to let users restore the layout.',
                        example: `layout = signal(FlexibleColumnLayout.ThreeColumnsStartMinimized);
// startColumn: 0%, midColumn: 67%, endColumn: 33%`
                    },
                    {
                        answer: 'End (sub-detail) column is minimized — focus is on start and mid columns',
                        recommendation:
                            'Use ThreeColumnsEndMinimized (67% : 33% : 0%). End column is hidden. Use when the user has navigated back from the deepest level but keeps the 3-column state.',
                        example: `layout = signal(FlexibleColumnLayout.ThreeColumnsEndMinimized);
// startColumn: 67%, midColumn: 33%, endColumn: 0%`
                    }
                ]
            },
            {
                question: 'fd-flexible-column-layout vs ui5-flexible-column-layout?',
                options: [
                    {
                        answer: 'Angular-native with full control over layout percentages',
                        recommendation:
                            'Use fd-flexible-column-layout. Customize column widths via layoutDefinitions (FlexibleColumnLayoutDefinition array).',
                        example: `import { FlexibleColumnLayout } from '@fundamental-ngx/core/flexible-column-layout';`
                    },
                    {
                        answer: 'SAP UI5 design system compliance out of the box',
                        recommendation:
                            'Use ui5-flexible-column-layout from @fundamental-ngx/ui5-webcomponents. Slots are start-column, mid-column, end-column attributes.',
                        example: `<ui5-flexible-column-layout layout="TwoColumnsMidExpanded">
  <div slot="startColumn">Master</div>
  <div slot="midColumn">Detail</div>
</ui5-flexible-column-layout>`
                    }
                ]
            }
        ],
        commonPitfalls: [
            'All six title inputs are required for accessibility: collapseTitle, collapseTitleStartBtn, collapseTitleEndBtn, expandTitle, expandTitleStartBtn, expandTitleEndBtn. Omitting any causes runtime errors.',
            'separatorAriaLabel is required for screen reader accessibility of the column resize handles.',
            'layoutDefinitions input is required — provide a FlexibleColumnLayoutDefinition[] that maps each FlexibleColumnLayout value to column width percentages.',
            'Content projection uses template reference variables (#startColumn, #midColumn, #endColumn) inside ng-template elements — NOT named slot attributes. The ng-template must be a direct child of fd-flexible-column-layout.',
            '#midColumn and #endColumn are only rendered when the active layout includes those columns. Do not assume they are always mounted.',
            'FlexibleColumnLayout enum values: OneColumnStartFullScreen | OneColumnMidFullScreen | OneColumnEndFullScreen | TwoColumnsStartExpanded | TwoColumnsMidExpanded | TwoColumnsEndExpanded | ThreeColumnsMidExpanded | ThreeColumnsEndExpanded | ThreeColumnsStartMinimized | ThreeColumnsEndMinimized.',
            'Import FlexibleColumnLayout enum from @fundamental-ngx/core/flexible-column-layout, not a deep path.'
        ],
        compositionPattern: `import { FlexibleColumnLayout } from '@fundamental-ngx/core/flexible-column-layout';

// In component
layout = signal<FlexibleColumnLayout>(FlexibleColumnLayout.OneColumnStartFullScreen);

// Template
<fd-flexible-column-layout
  [layout]="layout()"
  [layoutDefinitions]="layoutDefs"
  collapseTitle="Collapse panel"
  collapseTitleStartBtn="Collapse start panel"
  collapseTitleEndBtn="Collapse end panel"
  expandTitle="Expand panel"
  expandTitleStartBtn="Expand start panel"
  expandTitleEndBtn="Expand end panel"
  separatorAriaLabel="Resize column separator">
  <ng-template #startColumn>
    <!-- Master / list panel -->
  </ng-template>
  <ng-template #midColumn>
    <!-- Detail panel -->
  </ng-template>
  <ng-template #endColumn>
    <!-- Extra detail panel (3-column layouts only) -->
  </ng-template>
</fd-flexible-column-layout>`,
        relatedComponents: ['ui5-flexible-column-layout', 'fd-layout-grid', 'fd-dynamic-page', 'fd-shellbar'],
        resources: [
            'UX specs: https://www.sap.com/design-system/fiori-design-web/v1-145/page-types/page-layouts/flexible-column-layout'
        ]
    }
};
