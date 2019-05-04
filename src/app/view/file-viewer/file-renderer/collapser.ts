import { OnDestroy, OnInit } from '@angular/core';
import {
  closeCurly,
  closeCurlyWrapper,
  closingBrace,
  collapseBtn,
  findLineNumber,
  guid,
  isCollapsed,
  lineCount,
  openCurly,
  openCurlyWrapper,
  openingBrace
} from './collapsing.util';

export class Collapser implements OnInit, OnDestroy {
  private readonly elementMap: { [id: string]: CurlyPair } = {};
  private initialized = false;

  constructor(private el: HTMLElement) {}

  ngOnInit(): void {
    if (!this.initialized && !!this.el && this.el.innerText.length > 0) {
      this.addCurlyWrappers();
      this.initCurlyWrappers();
      this.fixButtons();
      this.initialized = true;
    }
  }

  ngOnDestroy(): void {
    Object.keys(this.elementMap).forEach(prop => delete this.elementMap[prop]);
  }

  addCurlyWrappers() {
    let innerHtml = this.el.innerHTML;

    innerHtml = innerHtml.replace(
      new RegExp(openingBrace, 'g'),
      collapseBtn + openCurlyWrapper + openCurly + openingBrace
    );
    innerHtml = innerHtml.replace(
      new RegExp(closingBrace, 'g'),
      closingBrace + closeCurly + closeCurlyWrapper
    );

    this.el.innerHTML = innerHtml;
  }

  initCurlyWrappers() {
    const buttons = Array.from(this.el.querySelectorAll('button')) as HTMLElement[];
    buttons.forEach(button => {
      const id = guid();
      const curlyWrapper = button.nextElementSibling as HTMLElement;
      const dots = curlyWrapper.firstElementChild as HTMLElement;

      const lines = lineCount(curlyWrapper.innerHTML) - 1;
      const lineStart = findLineNumber(curlyWrapper.innerHTML);
      const lineNumberElements = this.getLineElements(id, lineStart, lineStart + lines);

      button.onclick = (ev: MouseEvent) => {
        ev.stopPropagation();
        isCollapsed(curlyWrapper) ? this.expand(id) : this.collapse(id);
      };
      button.title = `Toggle ${lines} lines`;

      dots.onclick = () => this.expand(id);
      dots.title = `Expand ${lines} lines`;

      this.elementMap[id] = { button, curlyWrapper, lineNumberElements };
    });
  }

  getLineElements(id: string, start: number, end: number): HTMLElement[] {
    return Array.from(document.querySelectorAll('span.line-numbers-rows > span')).filter(
      (node, index) => index > start && index <= end
    ) as HTMLElement[];
  }

  expand(id: string) {
    const { button, curlyWrapper, lineNumberElements } = this.elementMap[id];
    button.innerText = '-';
    curlyWrapper.classList.replace('closed', 'open');
    lineNumberElements.forEach(node => node.classList.remove(id)); // remove collapse lock
    // only if all IDs are removed, the line number will show again
    this.fixButtons();
  }

  collapse(id: string) {
    const { button, curlyWrapper, lineNumberElements } = this.elementMap[id];
    button.innerText = '+';
    curlyWrapper.classList.replace('open', 'closed');
    lineNumberElements.forEach(node => node.classList.add(id)); // lock collapse state by adding ID
    this.fixButtons();
  }

  fixButtons() {
    Object.values(this.elementMap).forEach(({ button, curlyWrapper }) => {
      button.style.top = `${curlyWrapper.offsetTop}px`;
    });
  }
}

interface CurlyPair {
  button: HTMLElement;
  curlyWrapper: HTMLElement;
  lineNumberElements: HTMLElement[];
}
