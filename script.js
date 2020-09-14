
(function(){
    var template = document.createElement('template');

    template.innerHTML = /*html*/`
    <style>
        :host {
            display: block;
        }    
    
    
    .burgerOverlay {
        position: relative;
        background: red;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index:10000;
    }


    </style>
    


    <div class="burgerOverlay">
    <div class="burgerToggle">Close</div>


    </div>
    
    `;

    class BetterBurger extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({mode:'open'})
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.burger = document.querySelector('a[href="burger"]');
            this.burgerToggle = this.shadowRoot.querySelector('.burgerToggle');

            this.burger.addEventListener('click', function() {
                console.log('the burger has been clicked')
                this.style.display = 'block';
            });

            this.burgerToggle.addEventListener('click', function() {
                console.log('the burger close button has been clicked')
            })
            
            

        
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
