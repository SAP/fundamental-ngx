import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
@Component({
    selector: 'app-toolbar',
    templateUrl: './action-bar-docs.component.html',
    styleUrls: ['action-bar-docs.component.scss']
})
export class ActionBarDocsComponent {
    backButtonHtml = `<fd-action-bar>
    <fd-action-bar-back>
        <button fd-button [fdType]="'secondary'" [size]="'compact'" [glyph]="'nav-back'"></button>
    </fd-action-bar-back>
    <fd-action-bar-header>
        <fd-action-bar-title>Page Title</fd-action-bar-title>
        <fd-action-bar-description>Action bar Description</fd-action-bar-description>
    </fd-action-bar-header>
    <fd-action-bar-actions>
        <button fd-button [fdType]="'primary'">Cancel</button>
        <button fd-button [fdType]="'main'">Save</button>
    </fd-action-bar-actions>
</fd-action-bar>`;

    noBackButtonHtml = `<fd-action-bar>
    <fd-action-bar-header>
        <fd-action-bar-title>Page Title</fd-action-bar-title>
        <fd-action-bar-description>Action bar Description</fd-action-bar-description>
    </fd-action-bar-header>
    <fd-action-bar-actions>
        <button fd-button [fdType]="'primary'">Cancel</button>
        <button fd-button [fdType]="'main'">Save</button>
    </fd-action-bar-actions>
</fd-action-bar>`;

    actionsContextualMenuHtml = `<fd-action-bar>
    <fd-action-bar-header>
        <fd-action-bar-title>Page Title</fd-action-bar-title>
    </fd-action-bar-header>
    <fd-action-bar-actions>
        <fd-popover>
            <fd-popover-control>
                <button fd-button [fdType]="'secondary'" [glyph]="'vertical-grip'"></button>
            </fd-popover-control>
            <fd-popover-body>
                <fd-menu>
                    <fd-menu-list>
                        <fd-menu-item [url]="'#'">Edit</fd-menu-item>
                        <fd-menu-item [url]="'#'">Delete</fd-menu-item>
                        <fd-menu-item [url]="'#'">Assign</fd-menu-item>
                        <fd-menu-item [url]="'#'">Expire</fd-menu-item>
                        <fd-menu-item [url]="'#'">Archive</fd-menu-item>
                    </fd-menu-list>
                </fd-menu>
            </fd-popover-body>
        </fd-popover>
    </fd-action-bar-actions>
</fd-action-bar>`;

    mobileViewHtml = `<fd-action-bar-mobile>
    <fd-action-bar>
        <fd-action-bar-back>
            <button fd-button [fdType]="'secondary'" [size]="'compact'" [glyph]="'nav-back'"></button>
        </fd-action-bar-back>
        <fd-action-bar-header>
            <fd-action-bar-title>Page Title</fd-action-bar-title>
            <fd-action-bar-description>Action bar Description</fd-action-bar-description>
        </fd-action-bar-header>
        <fd-action-bar-actions>
            <fd-popover>
                <fd-popover-control>
                    <button fd-button [fdType]="'secondary'" [glyph]="'vertical-grip'"></button>
                </fd-popover-control>
                <fd-popover-body>
                    <fd-menu>
                        <fd-menu-list>
                            <fd-menu-item [url]="'#'">Edit</fd-menu-item>
                            <fd-menu-item [url]="'#'">Delete</fd-menu-item>
                            <fd-menu-item [url]="'#'">Assign</fd-menu-item>
                            <fd-menu-item [url]="'#'">Expire</fd-menu-item>
                            <fd-menu-item [url]="'#'">Archive</fd-menu-item>
                        </fd-menu-list>
                    </fd-menu>
                </fd-popover-body>
            </fd-popover>
        </fd-action-bar-actions>
    </fd-action-bar>
</fd-action-bar-mobile>`;
}
