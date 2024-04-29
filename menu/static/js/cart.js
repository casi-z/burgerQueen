class Product {
    constructor(id) {
        this.id = id
        this.element = document.querySelector(`[data-product-id="${this.id}"]`)
        this.price = parseInt(this.element.querySelector('.product-price').textContent)
    }
}

class Cart {
    constructor(rootElement) {
        this.rootElement = rootElement
        this.priceElement = rootElement.querySelector('.cart-price')
        this.products = []
        this.price = 0
    }

    getProductById(productId) {
        return this.products.filter(product => product.id === productId)[0]
    }

    addProduct(newProductId) {
        const productObject = new Product(newProductId)
        this.setPrice(this.price + productObject.price)

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
    }

    deleteProduct(productId) {
        const productToDelete = this.getProductById(productId)
        if (!productToDelete) {
            return
        }
        this.setPrice(this.price - productToDelete.price)
        if (productToDelete.count > 1) {

            this.products.forEach(product => {
                if (product.id === productId) {
                    product.count--
                }
            })

        } else {
            this.products = this.products.filter(product => product.id !== productId)[0] || []

        }
    }

    setPrice(newPrice) {
        this.price = newPrice
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