
(function(){
    var template = document.createElement('template');

    template.innerHTML = /*html*/`
    <style>
        :host {
            display: block;
            visibility: hidden;
            position: fixed;
            background: yellow;
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
            transform: translate(-100)
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
        top: 48px;
        right: 48px;
    }

    .burgerToggle svg {
        width: 48px;
        height: 48px;
    }


    </style>
    


    <slot></slot>
    <div class="burgerToggle"><svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.6939 30.1128L30.1133 25.6934L74.3075 69.8875L69.888 74.3069L25.6939 30.1128Z" fill="black"/>
    <path d="M30.1108 74.3071L25.6914 69.8877L69.8856 25.6935L74.305 30.1129L30.1108 74.3071Z" fill="black"/>
    </svg>
    </div>



    
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
