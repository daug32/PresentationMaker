import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationToolbarComponent } from './presentation-toolbar/presentation-toolbar.component';
import { PresentationSlidePreview } from './presentation-slide-preview/presentation-slides-list.component';
import { PresentationWorkspaceComponent } from './presentation-workspace/presentation-workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationToolbarComponent,
    PresentationSlidePreview,
    PresentationWorkspaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
