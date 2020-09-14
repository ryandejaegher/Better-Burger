
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

    .burgerToggle {
        position: absolute;
        top: 0;
        right: 0;
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
            //this.burger = document.querySelector('a[href="/burger"]');
            this.burger = document.querySelector('.burger');
            this.burgerToggle = this.shadowRoot.querySelector('.burgerToggle');

            this.burger.addEventListener('click', function() {
                console.log('the burger has been clicked')
                self.classList.add('is-open')
                self.preventBodyScrollWhenVisible();
                self.animateLinks();
            });

            this.burgerToggle.addEventListener('click', function() {
                self.classList.remove('is-open')
                self.resetBodyPositionWhenNotVisible();
            })
            
        }

        getBurgerLinks() {
            //var burger = document.querySelector('a[href="/burger"]');
            var burger = document.querySelector('.burger');
            var links = burger.nextElementSibling.querySelectorAll('a');
            console.log(links)
            return links;
        }

        preventBodyScrollWhenVisible() {
            // When the overlay is shown, we want a fixed body
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
        }

        resetBodyPositionWhenNotVisible() {
            // When the modal is hidden...
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        animateLinks() {
            var links = this.querySelectorAll('a');
            links.forEach((link, index) => {
                link.style.opacity = "0";
                link.animate(
                  {
                    opacity: ["0", "1"]
                  },
                  {
                    duration: parseInt(1000, 10),
                    delay: (index + 1) * 300,
                    fill: "both",
                    easing: "ease-in-out"
                  }
                );
              })
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
