import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view/view.component';
import { WellFormingGuard } from '@view/well-forming-guard.service';
import { RepositoryExistsGuard } from '@view/repository-exists.guard';
import { FileLoaderService } from '@view/file-loader.service';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { FileTabsComponent } from './file-tabs/file-tabs.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { FileFooterComponent } from './file-viewer/file-footer/file-footer.component';
import { FileRendererComponent } from './file-viewer/file-renderer/file-renderer.component';
import { ShowdownComponent } from './file-viewer/file-renderer/showdown.component';
import { ShowdownModule } from 'ngx-showdown';
import { CodeRendererComponent } from './file-viewer/file-renderer/code-renderer.component';
import { PrismDirective } from './file-viewer/file-renderer/prism.directive';
import { CsvComponent } from './file-viewer/file-renderer/csv.component';
import { ImageRendererComponent } from './file-viewer/file-renderer/image-renderer.component';
import { LoadingService } from '@view/loading.service';
import { ClipboardModule } from 'ngx-clipboard';
import { RenderCacheService } from '@view/file-viewer/file-renderer/render-cache.service';
import { LanguageSelectionComponent } from './file-viewer/file-footer/language-selection/language-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollIntoViewDirective } from './file-viewer/file-footer/scroll-into-view.directive';

@NgModule({
  declarations: [
    ViewComponent,
    FileTabsComponent,
    FileTreeComponent,
    FileViewerComponent,
    FileFooterComponent,
    FileRendererComponent,
    ShowdownComponent,
    CodeRendererComponent,
    PrismDirective,
    CsvComponent,
    ImageRendererComponent,
    LanguageSelectionComponent,
    ScrollIntoViewDirective
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    MaterialModule,
    SharedModule,
    ShowdownModule.forRoot({
      tables: true,
      emoji: true,
      openLinksInNewWindow: true,
      underline: true,
      tasklists: true,
      strikethrough: true,
      simplifiedAutoLink: true
    }),
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    WellFormingGuard,
    RepositoryExistsGuard,
    /*RepositoryResolver,*/
    FileLoaderService,
    LoadingService,
    RenderCacheService
  ],
  entryComponents: [LanguageSelectionComponent]
})
export class ViewModule {}
