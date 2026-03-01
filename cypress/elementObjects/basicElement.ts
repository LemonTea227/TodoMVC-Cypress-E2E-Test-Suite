export type ElementSelector =
  | string
  | Cypress.Chainable<JQuery<HTMLElement>>;

class BasicElement {
  protected element?: Cypress.Chainable<JQuery<HTMLElement>>;
  private readonly usesStringSelector: boolean;

  constructor(private readonly selector: ElementSelector) {
    this.usesStringSelector = typeof selector === 'string';
    this.element = this.usesStringSelector
      ? undefined
      : (selector as Cypress.Chainable<JQuery<HTMLElement>>);
  }

  getElement(): Cypress.Chainable<JQuery<HTMLElement>> {
    if (this.usesStringSelector) {
      this.element = cy.get(this.selector as string);
      return this.element;
    }

    if (!this.element) {
      this.element = this.selector as Cypress.Chainable<JQuery<HTMLElement>>;
    }

    return this.element;
  }

  getInnerText(): Cypress.Chainable<string> {
    return this.getElement()
      .invoke('text')
      .then((text) => text.trim());
  }

  click(options: Partial<Cypress.ClickOptions> = {}): void {
    this.getElement().click(options);
  }

  rightClick(options: Partial<Cypress.ClickOptions> = {}): void {
    this.getElement().rightclick(options);
  }

  doubleClick(options: Partial<Cypress.ClickOptions> = {}): void {
    this.getElement().dblclick(options);
  }
}

export default BasicElement;
