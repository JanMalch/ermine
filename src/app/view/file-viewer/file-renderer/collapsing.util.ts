export function findLineNumber(substring: string): number {
  return lineOf(document.querySelector('app-code-renderer > pre').innerHTML, substring);
}

function lineOf(text: string, substring: string): number {
  const index = text.indexOf(substring);
  return text.substring(0, index).split('\n').length - 1;
}

export function lineCount(target: string): number {
  return (target.match(/\r?\n/g) || '').length + 1;
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    'ermine-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  );
}

export function isCollapsed(curlyWrapper: HTMLElement): boolean {
  return curlyWrapper.className.includes('closed');
}

export const openingBrace = '<span class="token punctuation">{</span>';
export const closingBrace = '<span class="token punctuation">}</span>';
export const openCurly = '<curly>';
export const closeCurly = '</curly>';
export const openCurlyWrapper =
  "<curly-wrapper class='open'><span class='collapsed-dots'>{...}</span>";
export const closeCurlyWrapper = '</curly-wrapper>';
export const collapseBtn = '<button>-</button>';
