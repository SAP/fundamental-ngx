import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Card } from '@fundamental-ngx/ui5-webcomponents/card';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

/**
 * This example simulates a library that will be loaded as a micro-frontend
 * alongside other libraries using different versions of UI5 Web Components.
 *
 * By using unique Angular wrapper components with scoping enabled,
 * we ensure our components don't conflict with other libraries or the host application.
 */
@Component({
    selector: 'ui5-scoping-micro-frontend-sample',
    standalone: true,
    imports: [CommonModule, FormsModule, Button, Card, Input, Label],
    template: `
        <div class="micro-frontend-demo">
            <h2>Micro-Frontend Example with Scoping</h2>

            <div class="scenario">
                <h3>Scenario: Version Compatibility</h3>
                <p>This library uses Angular wrapper components with scoping to coexist with:</p>
                <ul>
                    <li>Host app using UI5 v1.0 (no suffix)</li>
                    <li>Library A using UI5 v1.2 (suffix: "-lib-a")</li>
                    <li>This library using UI5 v1.3 (suffix enabled)</li>
                </ul>
            </div>

            <div ui5-card-mfe class="demo-card">
                <div slot="header" class="card-header">
                    <h4>Micro-Frontend Form with Scoped Wrappers</h4>
                </div>

                <form class="form-container" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                        <label ui5-label-mfe [for]="'name-input'">Name:</label>
                        <input
                            ui5-input-mfe
                            id="name-input"
                            [(ngModel)]="formData().name"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div class="form-group">
                        <label ui5-label-mfe [for]="'email-input'">Email:</label>
                        <input
                            ui5-input-mfe
                            id="email-input"
                            type="Email"
                            [(ngModel)]="formData().email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div class="form-group">
                        <label ui5-label-mfe [for]="'message-input'">Message:</label>
                        <input
                            ui5-input-mfe
                            id="message-input"
                            [(ngModel)]="formData().message"
                            placeholder="Enter your message"
                        />
                    </div>

                    <div class="form-actions">
                        <button ui5-button-mfe type="submit">Submit Form</button>
                        <button ui5-button-mfe design="Transparent" (click)="onReset()">Reset</button>
                    </div>
                </form>
            </div>

            @if (submitted()) {
                <div class="submission-result">
                    <h3>Form Submitted Successfully!</h3>
                    <div class="result-item"><strong>Name:</strong> {{ formData().name }}</div>
                    <div class="result-item"><strong>Email:</strong> {{ formData().email }}</div>
                    <div class="result-item"><strong>Message:</strong> {{ formData().message }}</div>
                </div>
            }

            <div class="info-box">
                <h4>How This Works with Scoping</h4>
                <p>
                    The Angular wrapper components above automatically use the scoped UI5 Web Components when scoping is
                    enabled. The wrappers' selectors are flexible and work with any tag name variation created by the
                    scoping suffix.
                </p>
                <p>
                    In a real micro-frontend scenario, each library would have its own unique suffix configured in its
                    initialization code, preventing any naming collisions.
                </p>
            </div>
        </div>
    `,
    styles: [
        `
            .micro-frontend-demo {
                padding: 2rem;
                max-width: 600px;
                margin: 0 auto;
            }

            .scenario {
                background-color: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 4px;
            }

            .scenario ul {
                margin: 0.5rem 0;
                padding-left: 2rem;
            }

            .card-header {
                padding: 1rem;
            }

            .card-header h4 {
                margin: 0;
            }

            .form-container {
                padding: 1.5rem;
            }

            .form-group {
                margin-bottom: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .form-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid #e0e0e0;
            }

            .submission-result {
                background-color: #c8e6c9;
                border-left: 4px solid #4caf50;
                padding: 1.5rem;
                margin-top: 2rem;
                border-radius: 4px;
            }

            .submission-result h3 {
                margin-top: 0;
                color: #2e7d32;
            }

            .result-item {
                padding: 0.5rem 0;
                color: #1b5e20;
            }

            .info-box {
                background: #f5f5f5;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 1.5rem;
                margin-top: 2rem;
            }

            .info-box h4 {
                margin-top: 0;
            }

            .info-box p {
                margin: 0.5rem 0;
                color: #666;
            }
        `
    ]
})
export class MicroFrontendScopingSample {
    protected readonly formData = signal({
        name: '',
        email: '',
        message: ''
    });

    protected readonly submitted = signal(false);

    protected onSubmit(): void {
        if (this.formData().name && this.formData().email) {
            this.submitted.set(true);
            // Auto-hide message after 5 seconds
            setTimeout(() => this.submitted.set(false), 5000);
        }
    }

    protected onReset(): void {
        this.formData.set({ name: '', email: '', message: '' });
        this.submitted.set(false);
    }
}
