import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PresentationToolbarComponent } from './presentation-toolbar/presentation-toolbar.component';
import { PresentationSlidePreview } from './presentation-slide-preview/presentation-slides-list.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { SettingsComponent } from './attachment/settings/settings.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from "@angular/cdk/drag-drop"; 
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    PresentationToolbarComponent,
    PresentationSlidePreview,
    AttachmentComponent,
    SettingsComponent,
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
