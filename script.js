
(function(){
    var template = document.createElement('template');

    template.innerHTML = /*html*/`
    <style>
        :host {
            display: inline-block;
        }    
    
    
    </style>
    


    <div class="burgerOverlay">
Burger
    </div>
    
    `;

    class BetterBurger extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({mode:'open'})
            this.shadowRoot.appendChild(template.content.cloneNode(true))
        }

        getBurgerLinks() {
            var burger = document.querySelector('a[href="burger"]');
            var links = burger.nextElementSibling.querySelectorAll('a');
            console.log(links);
        }

        connectedCallback() {
            this.getBurgerLinks();
            console.log(this.shadowRoot.querySelector('.burgerOveray');)

        }
    }
    window.customElements.define('better-burger', BetterBurger)
})();
