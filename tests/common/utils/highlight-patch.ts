import { Page, Locator } from '@playwright/test';

export function enableHighlighting(page: Page) {

  const highlight = async (locator: Locator) => {
  const handle = await locator.elementHandle();
  if (handle) {
    await handle.evaluate((el: HTMLElement) => {
      el.style.outline = '2px solid red';
      el.style.transition = 'outline 0.2s ease-in-out';
    });
  }
};

  const wrapLocator = (locator: Locator): Locator => {
    const methodsToHighlight: (keyof Locator)[] = [
      'click',
      'fill',
      'hover',
      'check',
      'uncheck',
      'press',
      'type',
      'dblclick',
      'selectOption',
      'isVisible',
      'isHidden',
      'isEnabled',
      'isDisabled',
      'waitFor',
    ];

    for (const method of methodsToHighlight) {
      const original = locator[method] as Function;
      if (!original) continue;

      (locator as any)[method] = async function (...args: any[]) {
        await highlight(locator);
        return original.apply(locator, args);
      };
    }

    return locator;
  };

  // Patch page.locator
  const originalLocator = page.locator.bind(page);
  page.locator = (...args: Parameters<Page['locator']>): Locator => {
    const locator = originalLocator(...args);
    return wrapLocator(locator);
  };

  // Patch page.getBy* methods
  const methodsToPatch = [
    'getByRole',
    'getByText',
    'getByLabel',
    'getByPlaceholder',
    'getByAltText',
    'getByTitle',
    'getByTestId',
  ] as const;

  for (const methodName of methodsToPatch) {
    const originalMethod = (page as any)[methodName]?.bind(page);
    if (!originalMethod) continue;

    (page as any)[methodName] = (...args: any[]) => {
      const locator = originalMethod(...args);
      return wrapLocator(locator);
    };
  }
}
