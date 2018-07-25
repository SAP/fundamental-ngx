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
        <button fd-button type="secondary" size="compact" [glyph]="'nav-back'"></button>
    </fd-action-bar-back>
    <fd-action-bar-header>
        <fd-action-bar-title>Page Title</fd-action-bar-title>
        <fd-action-bar-description>Action bar Description</fd-action-bar-description>
    </fd-action-bar-header>
    <fd-action-bar-actions>
        <button fd-button type="primary">Cancel</button>
        <button fd-button type="main">Save</button>
    </fd-action-bar-actions>
</fd-action-bar>`;

    noBackButtonHtml = `<fd-action-bar>
    <fd-action-bar-header>
        <fd-action-bar-title>Page Title</fd-action-bar-title>
        <fd-action-bar-description>Action bar Description</fd-action-bar-description>
    </fd-action-bar-header>
    <fd-action-bar-actions>
        <button fd-button type="primary">Cancel</button>
        <button fd-button type="main">Save</button>
    </fd-action-bar-actions>
</fd-action-bar>`;

    actionsContextualMenuHtml = `<fd-action-bar>
    <fd-action-bar-header>
        <fd-action-bar-title>Page Title</fd-action-bar-title>
    </fd-action-bar-header>
    <fd-action-bar-actions>
        <fd-dropdown [isContextualMenu]="true">
            <fd-dropdown-item>Edit</fd-dropdown-item>
            <fd-dropdown-item>Delete</fd-dropdown-item>
            <fd-dropdown-item>Assign</fd-dropdown-item>
            <fd-dropdown-item>Expire</fd-dropdown-item>
            <fd-dropdown-item>Archive</fd-dropdown-item>
        </fd-dropdown>
    </fd-action-bar-actions>
</fd-action-bar>`;

    mobileViewHtml = `<fd-action-bar-mobile>
    <fd-action-bar>
        <fd-action-bar-back>
            <button fd-button type="secondary" size="compact" [glyph]="'nav-back'"></button>
        </fd-action-bar-back>
        <fd-action-bar-header>
            <fd-action-bar-title>Page Title</fd-action-bar-title>
            <fd-action-bar-description>Action bar Description</fd-action-bar-description>
        </fd-action-bar-header>
        <fd-action-bar-actions>
            <fd-dropdown [isContextualMenu]="true">
                <fd-dropdown-item>Edit</fd-dropdown-item>
                <fd-dropdown-item>Delete</fd-dropdown-item>
                <fd-dropdown-item>Assign</fd-dropdown-item>
                <fd-dropdown-item>Expire</fd-dropdown-item>
                <fd-dropdown-item>Archive</fd-dropdown-item>
            </fd-dropdown>
        </fd-action-bar-actions>
    </fd-action-bar>
</fd-action-bar-mobile>`;
}
