import { Injectable } from '@angular/core';

@Injectable()
export class RenderCacheService {
  private readonly htmlCache = new Map<string, string>();
  private readonly languageCache = new Map<string, string>();

  constructor() {}

  hasRendered(oid: string, languageId: string): boolean {
    return this.languageCache.get(oid) === languageId;
  }

  getRendered(oid: string, languageId: string): string | undefined {
    return this.htmlCache.get(`${oid}|${languageId}`);
  }

  setRendered(oid: string, languageId: string, html: string) {
    const prevLang = this.languageCache.get(oid);
    this.languageCache.set(oid, languageId);

    this.htmlCache.delete(`${oid}|${prevLang}`);
    this.htmlCache.set(`${oid}|${languageId}`, html);
  }

  clearCache() {
    this.htmlCache.clear();
    this.languageCache.clear();
  }
}
