
(function(){
    var template = document.createElement('template');

    template.innerHTML = /*html*/`
    <style>
        :host {
            display: inline-block;
        }    
    
    
    </style>
    
    
    `;

    class BetterBurger extends HTMLElement {
        constructor() {
            super()
        }

        getBurgerLinks() {
            
        }
    }
    window.customElements.define('better-burger', BetterBurger)
})();
