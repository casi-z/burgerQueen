function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function cartAdd(){
    const cart = document.querySelector('.header-cart')
    const productArray = document.querySelectorAll('.product')
    productArray.forEach(product => {

        const cartAddButton = product.querySelector('.cart-add-button')
        const productImage = product.querySelector('img')

        cartAddButton.addEventListener('click', () => {
            const addedProductImage = document.createElement('img')
            addedProductImage.className = 'added-product-image'
            addedProductImage.src = productImage.src
            addedProductImage.width = 16
            addedProductImage.height = 16
            addedProductImage.style.top = `${getRandomInt(5, 25)}vh`
            addedProductImage.style.left = `${getRandomInt(-30, 30)}vw`
            cart.append(addedProductImage)
        })
    })
}
cartAdd()