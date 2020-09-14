
(function(){
    var template = document.createElement('template');

    template.innerHTML = /*html*/`
    <style>
        :host {
            display: inline-block;
        }    
    
    
    .burgerOverlay {
        background: red;
        width: 100%;
        z-index:10000;
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
            console.log(links)
            return links;
        }

        connectedCallback() {
            this.getBurgerLinks();
            var overlay = this.shadowRoot.querySelector('.burgerOverlay');
            console.log(overlay)
            this.getBurgerLinks().forEach(link => {
                overlay.appendChild(link)
            })

        }
    }
    window.customElements.define('better-burger', BetterBurger)
})();
