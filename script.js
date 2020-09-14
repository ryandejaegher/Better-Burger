
(function(){
    var template = document.createElement('template');

    template.innerHTML = /*html*/`
    <style>
        :host {
            display: block;
            visibility: hidden;
            position: fixed;
            background: red;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index:10000;
            font-family: inherit;
        }    

        :host-context(.is-open) {
            visibility:visible;
        }

        ::slotted(*) {
            font-family: inherit;
        }
    
    
    .burgerOverlay {
        position: fixed;
        background: red;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index:10000;
    }


    </style>
    


    <slot></slot>
    <div class="burgerToggle">Close</div>



    
    `;

    class BetterBurger extends HTMLElement {
        constructor() {
            super()
            self=this;
            this.attachShadow({mode:'open'})
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.burger = document.querySelector('a[href="/burger"]');
            this.burgerToggle = this.shadowRoot.querySelector('.burgerToggle');

            this.burger.addEventListener('click', function() {
                console.log('the burger has been clicked')
                self.classList.add('is-open')
            });

            this.burgerToggle.addEventListener('click', function() {
                self.classList.remove('is-open')
            })
            
        }

        getBurgerLinks() {
            var burger = document.querySelector('a[href="/burger"]');
            var links = burger.nextElementSibling.querySelectorAll('a');
            console.log(links)
            return links;
        }



        connectedCallback() {
            this.getBurgerLinks();
            // console.log(overlay)
            this.getBurgerLinks().forEach(link => {
                this.appendChild(link)
            })

        }
    }
    window.customElements.define('better-burger', BetterBurger)
})();
