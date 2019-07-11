'use strict';

customElements.define(
  'compodoc-menu',
  class extends HTMLElement {
    constructor() {
      super();
      this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
      this.render(this.isNormalMode);
    }

    render(isNormalMode) {
      let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Documentation · Ermine</a>
                </li>

                <li class="divider"></li>
                ${
                  isNormalMode
                    ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>`
                    : ''
                }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${
                              isNormalMode
                                ? 'data-target="#modules-links"'
                                : 'data-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${
                          isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'
                        }>
                            <li class="link">
                                <a href="modules/AboutModule.html" data-type="entity-link">AboutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-AboutModule-65b7df7b36e53df4ca8f33bbbfa4b207"'
                                            : 'data-target="#xs-components-links-module-AboutModule-65b7df7b36e53df4ca8f33bbbfa4b207"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-AboutModule-65b7df7b36e53df4ca8f33bbbfa4b207"'
                                            : 'id="xs-components-links-module-AboutModule-65b7df7b36e53df4ca8f33bbbfa4b207"'
                                        }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutRoutingModule.html" data-type="entity-link">AboutRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-AppModule-50acdcc6203b2ec5b5679adaecf6b211"'
                                            : 'data-target="#xs-components-links-module-AppModule-50acdcc6203b2ec5b5679adaecf6b211"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-AppModule-50acdcc6203b2ec5b5679adaecf6b211"'
                                            : 'id="xs-components-links-module-AppModule-50acdcc6203b2ec5b5679adaecf6b211"'
                                        }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-CoreModule-209121ab7de71a15a8ae1771ef3d7074"'
                                            : 'data-target="#xs-components-links-module-CoreModule-209121ab7de71a15a8ae1771ef3d7074"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-CoreModule-209121ab7de71a15a8ae1771ef3d7074"'
                                            : 'id="xs-components-links-module-CoreModule-209121ab7de71a15a8ae1771ef3d7074"'
                                        }>
                                            <li class="link">
                                                <a href="components/DragSizerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DragSizerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreRoutingModule.html" data-type="entity-link">CoreRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GraphQLModule.html" data-type="entity-link">GraphQLModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-HomeModule-fde073298f83faa29c81a3660f2a41a5"'
                                            : 'data-target="#xs-components-links-module-HomeModule-fde073298f83faa29c81a3660f2a41a5"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-HomeModule-fde073298f83faa29c81a3660f2a41a5"'
                                            : 'id="xs-components-links-module-HomeModule-fde073298f83faa29c81a3660f2a41a5"'
                                        }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-LoginModule-f7166dba519fe23fa3cbdb0c4b97e527"'
                                            : 'data-target="#xs-components-links-module-LoginModule-f7166dba519fe23fa3cbdb0c4b97e527"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-LoginModule-f7166dba519fe23fa3cbdb0c4b97e527"'
                                            : 'id="xs-components-links-module-LoginModule-f7166dba519fe23fa3cbdb0c4b97e527"'
                                        }>
                                            <li class="link">
                                                <a href="components/LoginChoiceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginChoiceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link">LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SelectModule.html" data-type="entity-link">SelectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-SelectModule-389d80fbdc0e78fbcb2b369dc381f388"'
                                            : 'data-target="#xs-components-links-module-SelectModule-389d80fbdc0e78fbcb2b369dc381f388"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-SelectModule-389d80fbdc0e78fbcb2b369dc381f388"'
                                            : 'id="xs-components-links-module-SelectModule-389d80fbdc0e78fbcb2b369dc381f388"'
                                        }>
                                            <li class="link">
                                                <a href="components/BranchSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BranchSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SelectRoutingModule.html" data-type="entity-link">SelectRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ViewModule.html" data-type="entity-link">ViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                            : 'data-target="#xs-components-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                            : 'id="xs-components-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                        }>
                                            <li class="link">
                                                <a href="components/CodeRendererComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CodeRendererComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CsvComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CsvComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileFooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileRendererComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileRendererComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileTabsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileTabsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileTreeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileTreeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileViewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImageRendererComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageRendererComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LanguageSelectionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LanguageSelectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowdownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShowdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#directives-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                        : 'data-target="#xs-directives-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                    }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="directives-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                        : 'id="xs-directives-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                    }>
                                        <li class="link">
                                            <a href="directives/PrismDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrismDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ScrollIntoViewDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScrollIntoViewDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#injectables-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                        : 'data-target="#xs-injectables-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                        : 'id="xs-injectables-links-module-ViewModule-97920ba5370cc145f2c0445afac2737e"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/FileLoaderService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FileLoaderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RenderCacheService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RenderCacheService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewRoutingModule.html" data-type="entity-link">ViewRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#classes-links"'
                            : 'data-target="#xs-classes-links"'
                        }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'
                        }>
                            <li class="link">
                                <a href="classes/Collapser.html" data-type="entity-link">Collapser</a>
                            </li>
                            <li class="link">
                                <a href="classes/DynamicDatabase.html" data-type="entity-link">DynamicDatabase</a>
                            </li>
                            <li class="link">
                                <a href="classes/DynamicFlatNode.html" data-type="entity-link">DynamicFlatNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/NetlifyAuthenticator.html" data-type="entity-link">NetlifyAuthenticator</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${
                              isNormalMode
                                ? 'data-target="#injectables-links"'
                                : 'data-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${
                              isNormalMode
                                ? 'id="injectables-links"'
                                : 'id="xs-injectables-links"'
                            }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BranchQuery.html" data-type="entity-link">BranchQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CopyModeService.html" data-type="entity-link">CopyModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DynamicDataSource.html" data-type="entity-link">DynamicDataSource</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExistenceQuery.html" data-type="entity-link">ExistenceQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileLoaderService.html" data-type="entity-link">FileLoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileOidQuery.html" data-type="entity-link">FileOidQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileQuery.html" data-type="entity-link">FileQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingService.html" data-type="entity-link">LoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MappingQuery.html" data-type="entity-link">MappingQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OidResolverQuery.html" data-type="entity-link">OidResolverQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RenderCacheService.html" data-type="entity-link">RenderCacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StyleService.html" data-type="entity-link">StyleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreeOidQuery.html" data-type="entity-link">TreeOidQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreeQuery.html" data-type="entity-link">TreeQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsernameQuery.html" data-type="entity-link">UsernameQuery</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#interceptors-links"'
                            : 'data-target="#xs-interceptors-links"'
                        }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="interceptors-links"'
                            : 'id="xs-interceptors-links"'
                        }>
                            <li class="link">
                                <a href="interceptors/LoadingInterceptor.html" data-type="entity-link">LoadingInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#guards-links"'
                            : 'data-target="#xs-guards-links"'
                        }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"'
                        }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RepositoryExistsGuard.html" data-type="entity-link">RepositoryExistsGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RepositoryResolver.html" data-type="entity-link">RepositoryResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/WellFormingGuard.html" data-type="entity-link">WellFormingGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#interfaces-links"'
                            : 'data-target="#xs-interfaces-links"'
                        }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"'
                        }>
                            <li class="link">
                                <a href="interfaces/AuthOptions.html" data-type="entity-link">AuthOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthResponse.html" data-type="entity-link">AuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link">AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurlyPair.html" data-type="entity-link">CurlyPair</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Edge.html" data-type="entity-link">Edge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Entry.html" data-type="entity-link">Entry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Entry-1.html" data-type="entity-link">Entry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExistenceResult.html" data-type="entity-link">ExistenceResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/File.html" data-type="entity-link">File</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/File-1.html" data-type="entity-link">File</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LetterGroup.html" data-type="entity-link">LetterGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PreloadStep.html" data-type="entity-link">PreloadStep</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrismLanguage.html" data-type="entity-link">PrismLanguage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Repository.html" data-type="entity-link">Repository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResolvedOid.html" data-type="entity-link">ResolvedOid</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result.html" data-type="entity-link">Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-1.html" data-type="entity-link">Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-2.html" data-type="entity-link">Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-3.html" data-type="entity-link">Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-4.html" data-type="entity-link">Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-5.html" data-type="entity-link">Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-6.html" data-type="entity-link">Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-7.html" data-type="entity-link">Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Settings.html" data-type="entity-link">Settings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabInfo.html" data-type="entity-link">TabInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Variables.html" data-type="entity-link">Variables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Variables-1.html" data-type="entity-link">Variables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Variables-2.html" data-type="entity-link">Variables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Variables-3.html" data-type="entity-link">Variables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Variables-4.html" data-type="entity-link">Variables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Variables-5.html" data-type="entity-link">Variables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Variables-6.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="miscellaneous-links"'
                            : 'id="xs-miscellaneous-links"'
                        }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
      this.innerHTML = tp.strings;
    }
  }
);
