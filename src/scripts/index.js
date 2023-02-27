function renderProducts(itens){
    const list = document.querySelector(".list__container")

    itens.forEach(item => {

        const card = createCard(item)

        list.append(card)
    })
}

function createCard(item){

   const container = document.createElement("li")
   const image = document.createElement("img")
   const category = document.createElement("span")
   const name = document.createElement("h2")
   const description = document.createElement("p")
   const price = document.createElement("span")
   const button = document.createElement("button")

   container.classList.add("list__item")

   image.src = item.img
   image.alt = item.nameItem

   category.classList.add("list__item--category")
   category.innerText = item.tag

   name.innerText = item.nameItem

   description.innerText = item.description

   price.classList.add("list__item--price")
   price.innerText = `R$ ${item.value},00`

   button.classList.add("list__item--button")




   button.innerText = item.addCart
   button.dataset.id = item.id

   container.append(image, category, name, description, price, button)

   return container
}

function renderFilterItem(array){

    const buttons = document.querySelectorAll(".filter__container > li")
    const list = document.querySelector(".list__container")

    buttons.forEach(button => {

        button.addEventListener("click", (e) => {
            list.innerHTML = ""

            if(e.target.innerText === "Todos"){
                renderProducts(array)
            }
            const filteredItem = filterItem(array, e.target.innerText)

            renderProducts(filteredItem)
        })
    })
}

function filterItem(array, filterProduct){

    // const newArray = array.filter(item => {
    //     if(item.tag === filterProduct){
    //         return item
    //     }
    // })
    return array.filter(item => item.tag === filterProduct)

}

function renderSearchItem(){

const input = document.querySelector(".search__container > input")
const searchButton = document.querySelector(".search__button")
const list = document.querySelector(".list__container")

searchButton.addEventListener("click", () => {
    list.innerHTML = "" //limpando a lista

    const foundItem = foundedItem(input.value)

    renderProducts([foundItem])
})

input.addEventListener("change", () => {
    list.innerHTML = ""

    const searchArray = searchItemFilter(input.value)

    renderProducts(searchArray)
})

input.addEventListener("keyup", () => {
    list.innerHTML = ""

    const searchArray = searchItemFilter(input.value)

    renderProducts(searchArray)
})

}

function foundedItem(filterWord){ //objetivo dessa função é fazer uma procura no input pelo nome do item, ou pela descrição, e devolver esse item

    const foundItem = data.find(item => {
        if(item.nameItem.toLocaleLowerCase().includes(filterWord.toLocaleLowerCase()) || 
        item.description.toLocaleLowerCase().includes(filterWord.toLocaleLowerCase())) {

            return item
        }
    })

    return foundItem
}

function searchItemFilter(filterWord){

    const foundItens = data.filter(item => {
        if(item.nameItem.toLocaleLowerCase().includes(filterWord.toLocaleLowerCase()) || 
        item.description.toLocaleLowerCase().includes(filterWord.toLocaleLowerCase())) {

            return item
        }
    })

    return foundItens
}

//Carrinho de Compras:

function renderCart(array){
    const cartContainer = document.querySelector(".cart__container")
    const cartList = document.querySelector(".cart__list")

    const cartFooterContainer = document.querySelector(".cart__footer")

    cartList.innerHTML = ""

    if(cart.length <= 0){

        const emptyCart =  createEmptyCart()

        cartList.appendChild(emptyCart)

        if(cartFooterContainer){
            cartFooterContainer.remove()
        }
    } else {

        array.forEach(item => {
            const itemCard = createCartItem(item)
    
            cartList.appendChild(itemCard)
        })

        if(cartFooterContainer){
            cartFooterContainer.remove()
        }

        const cartFooter = createCartInFooter(array)

        cartContainer.appendChild(cartFooter)

        removeFromCart(array)
    }
}

function createEmptyCart(){

    const container = document.createElement("li")
    const title = document.createElement("h2")
    const message = document.createElement("p")

    container.classList.add(".cart__item--empty")

    title.innerText = "Carrinho Vazio"
    message.innerText = "Adicione itens"

    container.append(title, message)

    return container

}

function createCartItem(item){

    const container = document.createElement("li")
    const image = document.createElement("img")
    const cartItem = document.createElement("div")
    const title = document.createElement("h2")
    const price = document.createElement("span")
    const itemBtn = document.createElement("button")

    container.classList.add("cart__item")

    image.src = item.img
    image.alt = item.nameItem

    cartItem.classList.add("cart__item--product")

    title.innerText = item.nameItem

    price.innerText = item.value

    itemBtn.classList.add("cart__button--remove")
    itemBtn.dataset.cartId = item.cartId

    itemBtn.innerText = "Remover produto"

    cartItem.append(title, price, itemBtn)
    container.append(image, cartItem)
    
    return container
}

function createCartInFooter(array){

    const totalOfItens = array.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.value
    }, 0)

    const footerContainer = document.createElement("footer")
    const footerQtd = document.createElement("div")
    const footerQtdDesc= document.createElement("p")
    const footerQtdSpan = document.createElement("span")
    const footerTotal = document.createElement("div")
    const footerTotalDesc = document.createElement("p")
    const footerTotalSpan = document.createElement("span")

    footerContainer.classList.add("cart__footer")

    footerQtd.classList.add("footer__quantity--container")

    footerQtdDesc.innerText = "Quantidade de itens"

    footerQtdSpan.innerText = array.length

    footerTotal.classList.add("footer__quantity--container")

    footerTotalDesc.innerText = "Total:"

    footerTotalSpan.innerText = `R$ ${totalOfItens},00`

    footerQtd.append(footerQtdDesc, footerQtdSpan)
    footerTotal.append(footerTotalDesc, footerTotalSpan)
    footerContainer.append(footerQtd, footerTotal)

    return footerContainer

}

function addToCart(){

    const allButtons = document.querySelectorAll(".list__item--button")

    allButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const itemSelected = data.find(item => {
                return item.id === Number(e.target.dataset.id)
            })

            //encontra a cópia do objeto usando o find, e faz uma cópia === espalha(...) - não altera o objeto 'data' original

            const arrayCart = {
                ...itemSelected,
                cartId: cart.length + 1
            }

            cart.push(arrayCart)

            renderCart(cart)
        })
    })
}

function removeFromCart(array){

    const removeButtons = document.querySelectorAll(".cart__button--remove")

    removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {

            //uso metodo find pra encontrar o cartId que seja igual ao evento (e) clicado no adicionar ao carrinho
            const findItemInCart = array.find(item => {
                return item.cartId === Number(e.target.dataset.cartId)
            })

            const itemIndexed = array.indexOf(findItemInCart)

            //dentro do array cart, a partir do itemIndexed e remove 1 (metodo splice adiciona e remove elementos)
            array.splice(itemIndexed, 1)

            renderCart(array)
        })
    })

}


renderProducts(data)

renderFilterItem(data)

renderSearchItem()

renderCart(cart)

addToCart()