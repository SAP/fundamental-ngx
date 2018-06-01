import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['actionbar.component.scss']
})
export class ActionbarComponent {
  titleHtml = '<fd-action-bar [actionBarTitle]="\'Page Title\'"></fd-action-bar>';

  mainActionsHtml =
    '<fd-action-bar [actionBarTitle]="\'Page Title\'">\n' +
    '  <button fd-button type="secondary">Cancel</button>\n' +
    '  <button fd-button type="main">Save</button>\n' +
    '</fd-action-bar>';

  actionsContextualMenuHtml =
    '<fd-action-bar [actionBarTitle]="\'Page Title\'">\n' +
    '  <fd-dropdown [isContextualMenu]="true">\n' +
    '   <fd-dropdown-item>Edit</fd-dropdown-item>\n' +
    '   <fd-dropdown-item>Delete</fd-dropdown-item>\n' +
    '   <fd-dropdown-item>Assign</fd-dropdown-item>\n' +
    '   <fd-dropdown-item>Expire</fd-dropdown-item>\n' +
    '   <fd-dropdown-item>Archive</fd-dropdown-item>\n' +
    '  </fd-dropdown>\n' +
    '</fd-action-bar>';
}
