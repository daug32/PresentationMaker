import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PresentationToolbarComponent } from './presentation-toolbar/presentation-toolbar.component';
import { PresentationSlidePreview } from './presentation-slide-preview/presentation-slides-list.component';
import { AttachmentComponent } from './attachment/attachment.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from "@angular/cdk/drag-drop"; 
import { MatMenuModule } from '@angular/material/menu';
import { NgxMatColorPickerModule, MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    PresentationToolbarComponent,
    PresentationSlidePreview,
    AttachmentComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    MatMenuModule,
    NgxMatColorPickerModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
