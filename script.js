
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
            var burger = document.querySelector('a[href="burger"]');
            var links = burger.nextElementSibling.querySelectorAll('a');
            
        }
    }
    window.customElements.define('better-burger', BetterBurger)
})();
