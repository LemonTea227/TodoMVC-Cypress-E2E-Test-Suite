import BasicElement, { type ElementSelector } from './basicElement';

class Button extends BasicElement {
    constructor(selector: ElementSelector) {
        super(selector);
    }

    showAndClick(): void {
        this.getElement().should('be.hidden').invoke('show').click();
    }
}

export default Button;