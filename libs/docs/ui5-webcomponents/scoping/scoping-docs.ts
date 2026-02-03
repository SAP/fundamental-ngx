import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { BasicScopingSample } from './examples/basic-scoping-sample';
import { MicroFrontendScopingSample } from './examples/micro-frontend-sample';

@Component({
    selector: 'ui5-scoping-docs',
    templateUrl: './scoping-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        BasicScopingSample,
        MicroFrontendScopingSample
    ]
})
export class ScopingDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            component: 'BasicScopingSample',
            code: `import { Component, signal } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

@Component({
    selector: 'app-basic-scoping',
    template: \`
        <div class="container">
            <ui5-avatar
                initials="AC"
                [colorScheme]="'Accent1'"
                [size]="'M'">
            </ui5-avatar>
            <ui5-button (click)="increment()">
                Click me {{ count() }} times
            </ui5-button>
        </div>
    \`,
    standalone: true,
    imports: [Avatar, Button]
})
export class BasicScopingSample {
    protected count = signal(0);
    
    protected increment(): void {
        this.count.update(c => c + 1);
    }
}`,
            originalFileName: 'basic-scoping-sample'
        }
    ]);

    protected readonly basicExample = computed(() => this.basicExampleFiles());

    private readonly microFrontendExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            component: 'MicroFrontendScopingSample',
            code: `import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

@Component({
    selector: 'app-micro-frontend',
    template: \`
        <form (ngSubmit)="submit()">
            <ui5-label for="name">Name:</ui5-label>
            <ui5-input
                id="name"
                [(value)]="name"
                placeholder="Enter name">
            </ui5-input>
            
            <ui5-button type="submit">
                Submit
            </ui5-button>
        </form>
    \`,
    standalone: true,
    imports: [Button, Input, Label]
})
export class MicroFrontendScopingSample {
    protected name = signal('');
    
    protected submit(): void {
        console.log('Submitted:', this.name());
        this.name.set('');
    }
}`,
            originalFileName: 'micro-frontend-sample'
        }
    ]);

    protected readonly microFrontendExample = computed(() => this.microFrontendExampleFiles());

    private readonly setupExampleFiles = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: `// In your main.ts or app initialization
import { setCustomElementsScopingSuffix } from '@fundamental-ngx/ui5-webcomponents';

// Set the custom element suffix BEFORE initializing your app
setCustomElementsScopingSuffix('-demo');

bootstrapApplication(AppComponent)
    .catch(err => console.error(err));`,
            originalFileName: 'scoping-config'
        }
    ]);

    protected readonly setupExample = computed(() => this.setupExampleFiles());
}
