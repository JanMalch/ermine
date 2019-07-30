import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { FileLoaderService } from '@view/file-loader.service';
import { RenderCacheService } from '@view/file-viewer/file-renderer/render-cache.service';
import { RepositoryExistsGuard } from '@view/repository-exists.guard';
import { WellFormingGuard } from '@view/well-forming.guard';
import { ClipboardModule } from 'ngx-clipboard';
import { ShowdownModule } from 'ngx-showdown';
import { FileTabsComponent } from './file-tabs/file-tabs.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FileFooterComponent } from './file-viewer/file-footer/file-footer.component';
import { LanguageSelectionComponent } from './file-viewer/file-footer/language-selection/language-selection.component';
import { ScrollIntoViewDirective } from './file-viewer/file-footer/scroll-into-view.directive';
import { CodeRendererComponent } from './file-viewer/file-renderer/code-renderer.component';
import { CsvComponent } from './file-viewer/file-renderer/csv.component';
import { FileRendererComponent } from './file-viewer/file-renderer/file-renderer.component';
import { ImageRendererComponent } from './file-viewer/file-renderer/image-renderer.component';
import { PrismDirective } from './file-viewer/file-renderer/prism.directive';
import { ShowdownComponent } from './file-viewer/file-renderer/showdown.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view/view.component';

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
  providers: [WellFormingGuard, RepositoryExistsGuard, FileLoaderService, RenderCacheService],
  entryComponents: [LanguageSelectionComponent]
})
export class ViewModule {}
