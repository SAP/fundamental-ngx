import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
    selector: 'app-tile',
    templateUrl: './tile-docs.component.html'
})
export class TileDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['simple', 'media', 'product']
                    },
                    hasActions: {
                        type: 'boolean'
                    },
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    size: {
                        type: 'string',
                        enum: ['s', 'm', 'l']
                    },
                    circle: {
                        type: 'boolean'
                    },
                    transparent: {
                        type: 'boolean'
                    },
                    colorAccent: {
                        type: 'string',
                        enum: ['default', '1', '2', '3', '4', '5', '6', '7', '8', '9']
                    },
                    glyphs: {
                        type: 'string',
                        enum: [
                            '',
                            'accelerated',
                            'accept',
                            'accidental-leave',
                            'account',
                            'accounting-document-verification',
                            'action',
                            'action-settings',
                            'activate',
                            'activities',
                            'activity-2',
                            'activity-assigned-to-goal',
                            'activity-individual',
                            'activity-items',
                            'add',
                            'add-activity',
                            'add-activity-2',
                            'add-contact',
                            'add-coursebook',
                            'add-document',
                            'add-equipment',
                            'add-favorite',
                            'add-filter',
                            'add-photo',
                            'add-process',
                            'add-product',
                            'address-book',
                            'addresses',
                            'alert',
                            'along-stacked-chart',
                            'alphabetical-order',
                            'appointment',
                            'appointment-2',
                            'approvals',
                            'area-chart',
                            'arobase',
                            'arrow-bottom',
                            'arrow-down',
                            'arrow-left',
                            'arrow-right',
                            'arrow-top',
                            'attachment',
                            'attachment-audio',
                            'attachment-e-pub',
                            'attachment-html',
                            'attachment-photo',
                            'attachment-text-file',
                            'attachment-video',
                            'attachment-zip-file',
                            'back-to-top',
                            'background',
                            'badge',
                            'bar-chart',
                            'bar-code',
                            'basket',
                            'batch-payments',
                            'bbyd-active-sales',
                            'bbyd-dashboard',
                            'bed',
                            'begin',
                            'bell',
                            'blank-tag',
                            'blank-tag-2',
                            'bo-strategy-management',
                            'bold-text',
                            'bookmark',
                            'border',
                            'broken-link',
                            'bubble-chart',
                            'building',
                            'bullet-text',
                            'burglary',
                            'bus-public-transport',
                            'business-by-design',
                            'business-card',
                            'business-objects-experience',
                            'business-objects-explorer',
                            'business-objects-mobile',
                            'business-one',
                            'calendar',
                            'call',
                            'camera',
                            'cancel',
                            'cancel-maintenance',
                            'cancel-share',
                            'capital-projects',
                            'car-rental',
                            'card',
                            'cargo-train',
                            'cart',
                            'cart-2',
                            'cart-3',
                            'cart-4',
                            'cart-5',
                            'cart-approval',
                            'cart-full',
                            'cause',
                            'chain-link',
                            'chalkboard',
                            'chart-axis',
                            'chart-table-view',
                            'Chart-Tree-Map',
                            'check-availability',
                            'checklist',
                            'checklist-2',
                            'checklist-item',
                            'checklist-item-2',
                            'chevron-phase',
                            'chevron-phase-2',
                            'choropleth-chart',
                            'circle-task',
                            'circle-task-2',
                            'citizen-connect',
                            'clear-filter',
                            'clinical-order',
                            'clinical-tast-tracker',
                            'close-command-field',
                            'cloud',
                            'co',
                            'collaborate',
                            'collapse',
                            'collapse-group',
                            'collections-insight',
                            'collections-management',
                            'collision',
                            'color-fill',
                            'column-chart-dual-axis',
                            'comment',
                            'commission-check',
                            'company-view',
                            'compare',
                            'compare-2',
                            'competitor',
                            'complete',
                            'connected',
                            'contacts',
                            'copy',
                            'course-book',
                            'course-program',
                            'create',
                            'create-entry-time',
                            'create-form',
                            'create-leave-request',
                            'create-session',
                            'credit-card',
                            'crm-sales',
                            'crm-service-manager',
                            'crop',
                            'crossed-line-chart',
                            'curriculum',
                            'cursor',
                            'customer',
                            'customer-and-contacts',
                            'customer-and-supplier',
                            'customer-briefing',
                            'customer-financial-fact-sheet',
                            'customer-history',
                            'customer-order-entry',
                            'customer-view',
                            'customize',
                            'database',
                            'date-time',
                            'decision',
                            'decline',
                            'decrease-line-height',
                            'delete',
                            'detail-view',
                            'developer-settings',
                            'dimension',
                            'disconnected',
                            'discussion',
                            'discussion-2',
                            'dishwasher',
                            'display',
                            'display-more',
                            'doc-attachment',
                            'doctor',
                            'document',
                            'document-text',
                            'documents',
                            'donut-chart',
                            'down',
                            'download',
                            'download-from-cloud',
                            'draw-rectangle',
                            'drill-down',
                            'drill-up',
                            'drop-down-list',
                            'dropdown',
                            'duplicate',
                            'e-care',
                            'e-learning',
                            'eam-work-order',
                            'edit',
                            'edit-outside',
                            'education',
                            'electrocardiogram',
                            'electronic-medical-record',
                            'email',
                            'email-read',
                            'employee',
                            'employee-approvals',
                            'employee-lookup',
                            'employee-pane',
                            'employee-rejections',
                            'end-user-experience-monitoring',
                            'endoscopy',
                            'energy-saving-lightbulb',
                            'enter-more',
                            'eraser',
                            'error',
                            'example',
                            'excel-attachment',
                            'exitfullscreen',
                            'expand',
                            'expand-group',
                            'expense-report',
                            'explorer',
                            'factory',
                            'fallback',
                            'family-care',
                            'family-protection',
                            'favorite',
                            'favorite-list',
                            'fax-machine',
                            'feed',
                            'feeder-arrow',
                            'filter',
                            'filter-analytics',
                            'filter-facets',
                            'filter-fields',
                            'flag',
                            'flight',
                            'fob-watch',
                            'folder',
                            'folder-blank',
                            'folder-full',
                            'form',
                            'forward',
                            'fridge',
                            'full-screen',
                            'full-stacked-chart',
                            'full-stacked-column-chart',
                            'functional-location',
                            'future',
                            'gantt-bars',
                            'general-leave-request',
                            'generate-shortcut',
                            'geographic-bubble-chart',
                            'globe',
                            'goal',
                            'goalseek',
                            'grid',
                            'group',
                            'group-2',
                            'header',
                            'heading-1',
                            'heading-2',
                            'heading-3',
                            'headset',
                            'heating-cooling',
                            'heatmap-chart',
                            'hello-world',
                            'hide',
                            'hint',
                            'history',
                            'home',
                            'home-share',
                            'horizontal-bar-chart',
                            'horizontal-bar-chart-2',
                            'horizontal-bullet-chart',
                            'horizontal-grip',
                            'horizontal-stacked-chart',
                            'horizontal-waterfall-chart',
                            'hr-approval',
                            'idea-wall',
                            'image-viewer',
                            'inbox',
                            'incident',
                            'incoming-call',
                            'increase-line-height',
                            'indent',
                            'initiative',
                            'inspect',
                            'inspect-down',
                            'inspection',
                            'instance',
                            'insurance-car',
                            'insurance-house',
                            'insurance-life',
                            'internet-browser',
                            'inventory',
                            'ipad',
                            'ipad-2',
                            'iphone',
                            'iphone-2',
                            'it-host',
                            'it-instance',
                            'it-system',
                            'italic-text',
                            'jam',
                            'journey-arrive',
                            'journey-change',
                            'journey-depart',
                            'key',
                            'key-user-settings',
                            'kpi-corporate-performance',
                            'kpi-managing-my-area',
                            'lab',
                            'laptop',
                            'lateness',
                            'lead',
                            'lead-outdated',
                            'leads',
                            'learning-assistant',
                            'legend',
                            'less',
                            'letter',
                            'lightbulb',
                            'line-chart',
                            'line-chart-dual-axis',
                            'line-chart-time-axis',
                            'line-charts',
                            'list',
                            'loan',
                            'locate-me',
                            'locked',
                            'log',
                            'machine',
                            'manager',
                            'manager-insight',
                            'map',
                            'map-2',
                            'map-3',
                            'marketing-campaign',
                            'master-task-triangle',
                            'master-task-triangle-2',
                            'meal',
                            'measure',
                            'measurement-document',
                            'measuring-point',
                            'media-forward',
                            'media-pause',
                            'media-play',
                            'media-reverse',
                            'media-rewind',
                            'meeting-room',
                            'menu',
                            'menu2',
                            'message-error',
                            'message-information',
                            'message-popup',
                            'message-success',
                            'message-warning',
                            'microphone',
                            'mileage',
                            'minimize',
                            'mirrored-task-circle',
                            'mirrored-task-circle-2',
                            'money-bills',
                            'monitor-payments',
                            'move',
                            'mri-scan',
                            'multiple-bar-chart',
                            'multiple-line-chart',
                            'multiple-pie-chart',
                            'multiple-radar-chart',
                            'multiselect',
                            'multiselect-all',
                            'multiselect-none',
                            'my-sales-order',
                            'my-view',
                            'nav-back',
                            'navigation-down-arrow',
                            'navigation-left-arrow',
                            'navigation-right-arrow',
                            'navigation-up-arrow',
                            'negative',
                            'Netweaver-business-client',
                            'newspaper',
                            'notes',
                            'notification-2',
                            'number-sign',
                            'numbered-text',
                            'nurse',
                            'nutrition-activity',
                            'official-service',
                            'offsite-work',
                            'open-command-field',
                            'open-folder',
                            'opportunities',
                            'opportunity',
                            'order-status',
                            'org-chart',
                            'outbox',
                            'outdent',
                            'outgoing-call',
                            'overflow',
                            'overlay',
                            'overview-chart',
                            'paging',
                            'paid-leave',
                            'palette',
                            'paper-plane',
                            'passenger-train',
                            'past',
                            'paste',
                            'pause',
                            'payment-approval',
                            'pdf-attachment',
                            'pdf-reader',
                            'pending',
                            'per-diem',
                            'performance',
                            'permission',
                            'person-placeholder',
                            'personnel-view',
                            'pharmacy',
                            'phone',
                            'photo-voltaic',
                            'physical-activity',
                            'picture',
                            'pie-chart',
                            'pipeline-analysis',
                            'play',
                            'pool',
                            'popup-window',
                            'positive',
                            'post',
                            'ppt-attachment',
                            'present',
                            'print',
                            'private',
                            'process',
                            'product',
                            'program-triangles',
                            'program-triangles-2',
                            'project-definition-triangle',
                            'project-definition-triangle-2',
                            'projector',
                            'provision',
                            'pull-down',
                            'pushpin-off',
                            'pushpin-on',
                            'puzzle',
                            'quality-issue',
                            'question-mark',
                            'radar-chart',
                            'receipt',
                            'record',
                            'redo',
                            'refresh',
                            'repost',
                            'request',
                            'reset',
                            'resize',
                            'resize-corner',
                            'resize-horizontal',
                            'resize-vertical',
                            'response',
                            'restart',
                            'retail-store',
                            'retail-store-manager',
                            'rhombus-milestone',
                            'rhombus-milestone-2',
                            'role',
                            'sales-document',
                            'sales-notification',
                            'sales-order',
                            'sales-order-item',
                            'sales-quote',
                            'sap-box',
                            'sap-logo-shape',
                            'sap-ui5',
                            'save',
                            'scatter-chart',
                            'scissors',
                            'screen-split-one',
                            'screen-split-three',
                            'screen-split-two',
                            'search',
                            'settings',
                            'share',
                            'share-2',
                            'shelf',
                            'shield',
                            'shipping-status',
                            'shortcut',
                            'show',
                            'signature',
                            'simple-payment',
                            'simulate',
                            'slim-arrow-down',
                            'slim-arrow-left',
                            'slim-arrow-right',
                            'slim-arrow-up',
                            'soccor',
                            'sonography',
                            'sort',
                            'sort-ascending',
                            'sort-descending',
                            'sorting-ranking',
                            'sound',
                            'sound-loud',
                            'sound-off',
                            'source-code',
                            'status-critical',
                            'status-inactive',
                            'status-negative',
                            'status-positive',
                            'step',
                            'stethoscope',
                            'stop',
                            'study-leave',
                            'subway-train',
                            'suitcase',
                            'supplier',
                            'survey',
                            'switch-classes',
                            'switch-views',
                            'synchronize',
                            'syntax',
                            'syringe',
                            'sys-add',
                            'sys-back',
                            'sys-back-2',
                            'sys-cancel',
                            'sys-cancel-2',
                            'sys-enter',
                            'sys-enter-2',
                            'sys-find',
                            'sys-find-next',
                            'sys-first-page',
                            'sys-help',
                            'sys-help-2',
                            'sys-last-page',
                            'sys-minus',
                            'sys-monitor',
                            'sys-next-page',
                            'sys-prev-page',
                            'system-exit',
                            'system-exit-2',
                            'table-chart',
                            'table-view',
                            'tag',
                            'tag-cloud-chart',
                            'tags',
                            'target-group',
                            'task',
                            'taxi',
                            'technical-object',
                            'temperature',
                            'text-align-center',
                            'text-align-justified',
                            'text-align-left',
                            'text-align-right',
                            'text-formatting',
                            'theater',
                            'thing-type',
                            'thumb-down',
                            'thumb-up',
                            'time-account',
                            'time-entry-request',
                            'time-overtime',
                            'timesheet',
                            'to-be-reviewed',
                            'toaster-down',
                            'toaster-top',
                            'toaster-up',
                            'tools-opportunity',
                            'travel-expense',
                            'travel-expense-report',
                            'travel-itinerary',
                            'travel-request',
                            'tree',
                            'trend-down',
                            'trend-up',
                            'trip-report',
                            'ui-notifications',
                            'umbrella',
                            'underline-text',
                            'undo',
                            'unfavorite',
                            'unlocked',
                            'unpaid-leave',
                            'unwired',
                            'up',
                            'upload',
                            'upload-to-cloud',
                            'upstacked-chart',
                            'user-edit',
                            'user-settings',
                            'value-help',
                            'vds-file',
                            'vehicle-repair',
                            'vertical-bar-chart',
                            'vertical-bar-chart-2',
                            'vertical-bullet-chart',
                            'vertical-grip',
                            'vertical-stacked-chart',
                            'vertical-waterfall-chart',
                            'video',
                            'visits',
                            'waiver',
                            'wallet',
                            'warning',
                            'warning2',
                            'washing-machine',
                            'weather-proofing',
                            'web-cam',
                            'widgets',
                            'windows-doors',
                            'work-history',
                            'workflow-tasks',
                            'world',
                            'wounds-doc',
                            'wrench',
                            'write-new',
                            'write-new-document',
                            'x-ray',
                            'zoom-in',
                            'zoom-out'
                        ]
                    },
                    imageUrl: {
                        type: 'string'
                    },
                    isButton: {
                        type: 'boolean'
                    },
                    disabled: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            type: 'simple',
            hasActions: false,
            title: 'Tile Title',
            descending: '',
            size: 'm',
            circle: false,
            transparent: true,
            colorAccent: 'default',
            initials: '',
            glyphs: 'home',
            imageUrl: '',
            isButton: false,
            disabled: false
        }
    };

    simpleTileHtml =
        '<fd-tile>\n' +
        '  <fd-tile-content>\n' +
        '    <fd-tile-title>\n' +
        '      Tile Title\n' +
        '    </fd-tile-title>\n' +
        '    <p>Tile Description</p>\n' +
        '  </fd-tile-content>\n' +
        '</fd-tile>\n';

    mediaTileHtml =
        '<fd-tile>\n' +
        '  <fd-tile-media>\n' +
        '    <span fd-identifier [size]="\'m\'" [glyph]="\'home\'" [transparent]="true"></span> \n' +
        '  </fd-tile-media>\n' +
        '  <fd-tile-content>\n' +
        '  <fd-tile-title>\n' +
        '    Tile Title\n' +
        '  </fd-tile-title>\n' +
        '  </fd-tile-content>\n' +
        '</fd-tile>\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '<fd-tile>\n' +
        '  <fd-tile-media>\n' +
        "    <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='3'></span>\n" +
        '  </fd-tile-media>\n' +
        '  <fd-tile-content>\n' +
        '    <fd-tile-title>\n' +
        '      Tile Title\n' +
        '    </fd-tile-title>\n' +
        '    <p>Tile Description</p>\n' +
        '  </fd-tile-content>\n' +
        '</fd-tile>\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '<fd-tile>\n' +
        '  <fd-tile-media>\n' +
        '    <fd-image [size]="\'m\'" [photo]="\'http://api.adorable.io/avatars/50/rodney.artichoke@hybris.com.png\'"></fd-image>\n' +
        '  </fd-tile-media>\n' +
        '  <fd-tile-content>\n' +
        '    <fd-tile-title>\n' +
        '      Tile Title\n' +
        '    </fd-tile-title>\n' +
        '  </fd-tile-content>\n' +
        '</fd-tile>\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '<fd-tile>\n' +
        '  <fd-tile-media>\n' +
        '    <fd-image [size]="\'m\'" [circle]="true" [photo]="\'http://api.adorable.io/avatars/50/rodney.artichoke@hybris.com.png\'"></fd-image>\n' +
        '  </fd-tile-media>\n' +
        '  <fd-tile-content>\n' +
        '    <fd-tile-title>\n' +
        '      Tile Title\n' +
        '    </fd-tile-title>\n' +
        '    <p>Tile Description</p>\n' +
        '  </fd-tile-content>\n' +
        '</fd-tile>\n';

    actionsTileHtml =`<fd-tile>
    <fd-tile-content>
        <fd-tile-title>Tile Title</fd-tile-title>
    </fd-tile-content>
    <fd-tile-actions>
        <fd-popover>
            <fd-popover-control>
                <button fd-button [type]="'secondary'" [glyph]="'vertical-grip'"></button>
            </fd-popover-control>
            <fd-popover-body>
                <fd-menu>
                    <fd-menu-list>
                        <fd-menu-item [url]="'#'">Option 1</fd-menu-item>
                        <fd-menu-item [url]="'#'">Option 2</fd-menu-item>
                        <fd-menu-item [url]="'#'">Option 3</fd-menu-item>
                    </fd-menu-list>
                </fd-menu>
            </fd-popover-body>
        </fd-popover>
    </fd-tile-actions>
</fd-tile>`;

    buttonTileHtml =
        '<fd-tile [isButton]="true">\n' +
        '  <fd-tile-content>\n' +
        '    <fd-tile-title>\n' +
        '      Tile Title\n' +
        '    </fd-tile-title>\n' +
        '  </fd-tile-content>\n' +
        '</fd-tile>\n';

    productTileHtml =
        '<fd-product-tile>\n' +
        '  <fd-product-tile-media [photo]="\'https://techne.yaas.io/images/product-thumbnail-wide.png\'"></fd-product-tile-media>\n' +
        '  <fd-product-tile-content>\n' +
        '    <fd-product-tile-title>Default Product Tile</fd-product-tile-title>\n' +
        '  </fd-product-tile-content>\n' +
        '</fd-product-tile>\n' +
        '\n' +
        '<fd-product-tile [isButton]="true">\n' +
        '  <fd-product-tile-media [photo]="\'https://techne.yaas.io/images/product-thumbnail-wide.png\'"></fd-product-tile-media>\n' +
        '  <fd-product-tile-content>\n' +
        '    <fd-product-tile-title>Default Product Tile</fd-product-tile-title>\n' +
        '  </fd-product-tile-content>\n' +
        '</fd-product-tile>\n';

    disabledTilesHtml =
        '<fd-tile [disabled]="true">\n' +
        '  <fd-tile-content>\n' +
        '    <fd-tile-title>\n' +
        '      Tile Title\n' +
        '    </fd-tile-title>\n' +
        '  </fd-tile-content>\n' +
        '</fd-tile>\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '<fd-tile [disabled]="true">\n' +
        '  <fd-tile-media>\n' +
        '    <span fd-identifier [size]="\'m\'" [glyph]="\'home\'" [transparent]="true"></span>\n' +
        '  </fd-tile-media>\n' +
        '  <fd-tile-content>\n' +
        '    <fd-tile-title>\n' +
        '      Tile Title\n' +
        '    </fd-tile-title>\n' +
        '  </fd-tile-content>\n' +
        '</fd-tile>\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '<fd-product-tile [disabled]="true">\n' +
        '  <fd-product-tile-media [photo]="\'https://techne.yaas.io/images/product-thumbnail-wide.png\'"></fd-product-tile-media>\n' +
        '  <fd-product-tile-content>\n' +
        '    <fd-product-tile-title>Default Product Tile</fd-product-tile-title>\n' +
        '  </fd-product-tile-content>\n' +
        '</fd-product-tile>\n';

    defaultGridHtml =
        '<fd-tile-grid [col]="3">\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        "      <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='3'></span>\n" +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        "      <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='3'></span>\n" +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        "      <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='3'></span>\n" +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        "      <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='3'></span>\n" +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        "      <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='3'></span>\n" +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        "      <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='3'></span>\n" +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '</fd-tile-grid>\n';

    gridWithHelpersHtml =
        '<fd-tile-grid [col]="6">\n' +
        '  <fd-tile [rowSpan]="2" [colorAccent]="7">\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        "      <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='2'></span>\n" +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '   <fd-tile-media>\n' +
        '     <span fd-identifier [size]="\'m\'" [glyph]="\'home\'" [transparent]="true"></span>\n' +
        '   </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        "      <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='5'></span>\n" +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        "      <span fd-identifier [size]=\"'m'\" [glyph]=\"'home'\" [colorAccent]='5'></span>\n" +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-media>\n' +
        '      <fd-image [size]="\'m\'" [circle]="true" [photo]="\'http://api.adorable.io/avatars/50/rodney.artichoke@hybris.com.png\'"></fd-image>\n' +
        '    </fd-tile-media>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        "  <fd-tile [colorAccent]='8'>\n" +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile>\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '  <fd-tile [columnSpan]="2" [colorAccent]="5">\n' +
        '    <fd-tile-content>\n' +
        '      <fd-tile-title>\n' +
        '        Tile Title\n' +
        '      </fd-tile-title>\n' +
        '    </fd-tile-content>\n' +
        '  </fd-tile>\n' +
        '</fd-tile-grid>\n';

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tile');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    ngOnInit() {}
}
