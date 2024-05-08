class Product {
    constructor(id) {
        this.id = id
        this.element = document.querySelector(`[data-product-id="${this.id}"]`)
        this.name = this.element.querySelector('.product-name').textContent
        this.price = parseInt(this.element.querySelector('.product-price').textContent)
    }


}

class Cart {
    constructor(rootElement) {
        this.rootElement = rootElement
        this.priceElement = rootElement.querySelector('.cart-price')
        this.products = []
        this.productsCount = 0
        this.price = 0
        this.crowns = this.price / 6
        this.sidebar = document.querySelector('.cart-sidebar')
        rootElement.addEventListener('click', () => this.initSidebar())

    }

    disableRootElement() {
        this.rootElement.classList.add('_disabled')
        document.querySelectorAll('.added-product-image').forEach(img => {
            img.remove()
        })
    }

    enableRootElement() {
        this.rootElement.classList.remove('_disabled')
    }

    initSidebar() {

        const sidebarProductsCount = document.querySelector('.cart-sidebar__products-count')
        const sidebarPrice = document.querySelector('.cart-sidebar__price-content')
        const sidebarCrowns = document.querySelector('.cart-sidebar__crowns-content')
        sidebarProductsCount.textContent = this.productsCount
        sidebarPrice.textContent = this.price
        sidebarCrowns.textContent = this.crowns
        this.showProducts()

    }

    showProducts() {

        const cartSidebarProductList = document.querySelector('.cart-sidebar__products-list')

        let resultHtml = ``
        this.products.forEach(product => {
            resultHtml += `
            <li data-product-id="${product.id}" class="list-group-item cart-sidebar__product bg-transparent d-flex border-0">
                <img width="64" height="64" src="/static/img/product.webp" alt="">
                <div class="">
                    <h6 class="col-8">${product.name}</h6>

                    <div class="col-12 d-flex justify-content-between">
                        <div style="border: 2px solid #c1afa7;" class="cart-sidebar__quantity-buttons d-flex align-items-center justify-content-center rounded-5 ">

                            <button style="background-color: #502314;" class="rounded-5 border-0 cart-sidebar__quantity-button minus-button p-0 m-0 d-flex justify-content-center align-items-center minus-button btn btn-primary">
                                -
                            </button>

                            <span class="px-1 cart-sidebar__quantity-buttons-text">
                                ${product.count}
                            </span>
                            <button style="background-color: #502314;" class="rounded-5 border-0 cart-sidebar__quantity-button plus-button p-0 m-0 d-flex justify-content-center align-items-center plus-button btn btn-primary">
                                +
                            </button>

                        </div>
                        ${product.price}₽
                    </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                     class="position-absolute cart-product-close-button">
                    <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
                          d="M15.5314 0.46863C14.9065 -0.15621 13.8934 -0.15621 13.2686 0.46863L7.99999 4.93727L2.73137 0.46863C2.10653 -0.156209 1.09347 -0.156209 0.468629 0.46863C-0.108145 1.04541 -0.152512 1.95297 0.335527 2.58064L0.468629 2.73137L5.73725 8.00001L0.468629 13.2686L0.335527 13.4194C-0.152512 14.0471 -0.108145 14.9546 0.468629 15.5314C1.09347 16.1562 2.10653 16.1562 2.73137 15.5314L7.99999 10.2627L13.2686 15.5314C13.8934 16.1562 14.9065 16.1562 15.5314 15.5314C16.1081 14.9546 16.1525 14.0471 15.6644 13.4194L15.5314 13.2686L11.0627 8.00001L15.5314 2.73137L15.6644 2.58064C16.1525 1.95297 16.1081 1.04541 15.5314 0.46863Z"></path>
                </svg>
            </li>`
        })
        cartSidebarProductList.innerHTML = resultHtml
        this.addSidebarEvents()
    }

    addSidebarEvents() {

        const deleteAllButton = this.sidebar.querySelector('.cart-sidebar__delete-all-button')
        const productsArray = document.querySelectorAll('.cart-sidebar__product')
        deleteAllButton.addEventListener('click', () => this.deleteAllProducts())



        productsArray.forEach(product => {
            const plusButton = product.querySelector('.plus-button')
            const minusButton = product.querySelector('.minus-button')
            const quantityElement = product.querySelector('.cart-sidebar__quantity-buttons-text')
            let quantity = 1

            plusButton.addEventListener('click', () => {
                this.addProduct(Number(product.dataset.productId))
                if (quantity >= 100) {
                    plusButton.disabled = true
                    return
                }
                plusButton.disabled = false
                quantity++
                quantityElement.textContent = quantity
                this.initSidebar()


            })

            minusButton.addEventListener('click', () => {

                //this.deleteProduct(Number(product.dataset.productId))
                // if (quantity <= 1) {
                //     hideControlButtons(product)
                //     return
                // }
                plusButton.disabled = false
                quantity--
                quantityElement.textContent = quantity
                this.initSidebar()

            })
        })

    }

    getProductById(productId) {
        return this.products.filter(product => product.id === productId)[0]
    }

    addProduct(newProductId) {


        const productObject = new Product(newProductId)
        this.setPrice(this.price + productObject.price)
        console.log(this.price)
        if (this.products.some(product => product.id === newProductId)) {
            this.products.forEach(product => {
                if (product.id === newProductId) {
                    product.count++
                }
            })
        } else {

            this.products.push({count: 1, ...productObject})
            this.#animateAddProduct(productObject.element)

        }
        this.productsCount++
        this.enableRootElement()
    }

    deleteProduct(productId) {
        const productToDelete = this.getProductById(productId)
        if (!productToDelete) {
            return
        }

        this.setPrice(this.price - productToDelete.price)
        console.log(this.price)

        if (productToDelete.count > 1) {

            this.products.forEach(product => {
                if (product.id === productId) {
                    product.count--
                }
            })

        } else {
            this.products = this.products.filter(product => product.id !== productId) || []

        }
        if (this.products.length === 0) {

            this.disableRootElement()
        }
        this.productsCount--
    }

    deleteAllProducts() {
        this.products = []
        this.productsCount = 0
        if (document.querySelector('.cart-sidebar.show')) {
            this.initSidebar()
        }
        this.disableRootElement()
    }

    setPrice(newPrice) {
        this.price = newPrice
        this.crowns = (this.price / 6).toFixed()
        this.priceElement.textContent = `${this.price}₽`

    }

    #animateAddProduct(product) {
        const productImage = product.querySelector('img')
        const addedProductImage = document.createElement('img')
        addedProductImage.className = 'added-product-image'
        addedProductImage.src = productImage.src
        addedProductImage.width = 16
        addedProductImage.height = 16
        addedProductImage.style.top = `${getRandomInt(5, 25)}vh`
        addedProductImage.style.left = `${getRandomInt(-30, 30)}vw`
        this.rootElement.append(addedProductImage)

        setTimeout(() => {
            this.rootElement.classList.add('_active')
        }, 500)
        setTimeout(() => {
            this.rootElement.classList.remove('_active')
        }, 850)
    }


}

const cart = new Cart(document.querySelector('.header-cart'))

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const productArray = document.querySelectorAll('.product')

function setControlButtons(product) {
    product.classList.add('_control-buttons-active')

    const plusButton = product.querySelector('.plus-button')
    const minusButton = product.querySelector('.minus-button')
    const quantityElement = product.querySelector('.quantity')
    let quantity = 1

    plusButton.addEventListener('click', () => {
        cart.addProduct(Number(product.dataset.productId))
        if (quantity >= 100) {
            plusButton.disabled = true
            return
        }
        plusButton.disabled = false
        quantity++
        quantityElement.textContent = quantity


    })

    minusButton.addEventListener('click', () => {

        cart.deleteProduct(Number(product.dataset.productId))
        if (quantity <= 1) {
            hideControlButtons(product)
            return
        }
        plusButton.disabled = false
        quantity--
        quantityElement.textContent = quantity


    })
}

function hideControlButtons(product) {
    product.classList.remove('_control-buttons-active')
}

productArray.forEach(product => {

    const cartAddButton = product.querySelector('.cart-add-button')


    cartAddButton.addEventListener('click', () => {
        cart.addProduct(Number(product.dataset.productId))
        setControlButtons(product)
    })
})