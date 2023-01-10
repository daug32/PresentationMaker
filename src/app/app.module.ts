import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PresentationToolbarComponent } from './presentation-toolbar/presentation-toolbar.component';
import { SlidePreviewComponent } from './previews/slide-preview/slide-preview.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { SettingsComponent } from './settings/attachment-settings/attachment-settings.component';
import { SlideSettingsComponent } from './settings/slide-settings/slide-settings.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from "@angular/cdk/drag-drop"; 
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatButtonModule } from '@angular/material/button';
import { AttachmentPreviewComponent } from './previews/attachment-preview/attachment-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationToolbarComponent,
    SlidePreviewComponent,
    AttachmentComponent,
    SettingsComponent,
    SlideSettingsComponent,
    AttachmentPreviewComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    MatMenuModule,
    ColorPickerModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
