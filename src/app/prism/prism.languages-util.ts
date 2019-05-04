import { PrismLanguage, prismLanguages } from './prism.languages';

declare var Prism: {
  highlightAllUnder: (el: HTMLElement) => void;
  highlightAll: () => void;
};

export interface LetterGroup {
  letter: string;
  languages: PrismLanguage[];
}

function groupByFirstLetter(languages: PrismLanguage[]): LetterGroup[] {
  return Object.values(
    languages.reduce((acc, curr) => {
      const firstLetter = curr.name.charAt(0).toUpperCase();

      if (!(firstLetter in acc)) {
        acc[firstLetter] = { letter: firstLetter, languages: [] };
      }

      acc[firstLetter].languages.push(curr);

      return acc;
    }, {})
  );
}

export const totalLanguageCount = prismLanguages.length;

export const languageLetterGroups: LetterGroup[] = groupByFirstLetter(prismLanguages)
  .sort((a: LetterGroup, b: LetterGroup) => (a.letter > b.letter ? 1 : -1))
  .map(group => {
    group.languages = group.languages.sort((a: PrismLanguage, b: PrismLanguage) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    return group;
  });

export const plainText: PrismLanguage = {
  name: 'Plain Text',
  id: undefined,
  fileEndings: undefined
};

export function getLanguageForFile(fileName: string): PrismLanguage {
  const fileEnding = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();

  return prismLanguages.find(x => x.fileEndings.includes(fileEnding)) || plainText;
}

export function highlightAllUnder(el: HTMLElement) {
  Prism.highlightAllUnder(el);
}
