import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Card } from '@fundamental-ngx/ui5-webcomponents/card';
import { CardHeader } from '@fundamental-ngx/ui5-webcomponents/card-header';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

@Component({
    selector: 'ui5-scoping-basic-sample',
    standalone: true,
    imports: [CommonModule, Avatar, Button, Card, CardHeader, Title],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template: `
        <div class="scoping-demo">
            <h2>Angular Wrappers with Scoped UI5 Components (Suffix: "-demo")</h2>

            <p class="info">
                The Angular wrapper components automatically work with scoped UI5 Web Components. Notice all element
                names and attributes have the "-demo" suffix applied by scoping.
            </p>

            <div ui5-card-demo class="demo-card">
                <header ui5-card-header-demo slot="header">
                    <h2 ui5-title-demo>Scoped Components Demo</h2>
                </header>

                <div class="card-content">
                    <ui5-avatar-demo initials="AC" color-scheme="Accent1" size="L"> </ui5-avatar-demo>

                    <div class="text-content">
                        <h3>Angular Wrapper Components</h3>
                        <p>These Angular wrapper components work seamlessly with scoped UI5 Web Components.</p>
                        <p>The scoping suffix "-demo" is applied to all UI5 Web Component selectors automatically.</p>
                    </div>
                </div>

                <div class="button-group">
                    <button ui5-button-demo (click)="incrementCounter()">Click Me</button>
                    <span class="counter-display">Clicked: {{ clickCount() }} times</span>
                </div>
            </div>

            <div class="info-box">
                <h3>How Scoping Works with Wrappers</h3>
                <ul>
                    <li>
                        <strong>Attribute Selectors:</strong> Wrappers use both element and attribute selectors with
                        scoping suffix (e.g., <code>ui5-avatar-demo</code>)
                    </li>
                    <li>
                        <strong>Automatic Adaptation:</strong> When scoping is enabled, the suffix is applied to all UI5
                        Web Component selectors
                    </li>
                    <li>
                        <strong>No Breaking Changes:</strong> Your Angular code remains unchanged - only the underlying
                        web component tags change
                    </li>
                    <li><strong>Property Binding:</strong> All input/output bindings work exactly the same way</li>
                </ul>
            </div>
        </div>
    `,
    styles: [
        `
            .scoping-demo {
                padding: 1.5rem;
                background: var(--sapPageBackground);
            }

            .info {
                background-color: #e3f2fd;
                border-left: 4px solid #2196f3;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 4px;
                color: #1565c0;
            }

            .demo-card {
                max-width: 500px;
                margin: 1.5rem 0;
            }

            .card-content {
                padding: 1.5rem;
                display: flex;
                gap: 1rem;
                align-items: flex-start;
            }

            .text-content {
                flex: 1;
            }

            .text-content h3 {
                margin-top: 0;
                margin-bottom: 0.5rem;
            }

            .button-group {
                padding: 1rem 1.5rem;
                border-top: 1px solid #e0e0e0;
                display: flex;
                gap: 1rem;
                align-items: center;
            }

            .counter-display {
                font-weight: 500;
                color: #333;
            }

            .info-box {
                background: #f5f5f5;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 1.5rem;
                margin-top: 2rem;
            }

            .info-box h3 {
                margin-top: 0;
            }

            .info-box ul {
                margin: 0;
                padding-left: 1.5rem;
            }

            .info-box li {
                margin-bottom: 0.5rem;
            }

            .info-box code {
                background: #f0f0f0;
                padding: 2px 6px;
                border-radius: 3px;
                font-family: monospace;
            }
        `
    ]
})
export class BasicScopingSample {
    protected readonly clickCount = signal(0);

    protected incrementCounter(): void {
        this.clickCount.update((count) => count + 1);
    }
}
