import BasicElement, { type ElementSelector } from './basicElement';

class Toggle extends BasicElement {
  constructor(selector: ElementSelector) {
    super(selector);
  }

  check(): void {
    this.getElement().check();
  }

  uncheck(): void {
    this.getElement().uncheck();
  }
}

export default Toggle;
