import { menuArray } from '/data.js'

const order = []

document.addEventListener('click', (e)=>{
    if(e.target.dataset.addBtn){
        handleAddBtnClick(e.target.dataset.addBtn)
    } else if (e.target.dataset.remove){
        handleRemoveBtnClick(e.target.dataset.remove)
    } else if (e.target.className === 'complete-btn'){
        handleCompleteBtnClick()
    } else if (e.target.classList.contains('overlay')){
        handleOverlayClick()
    } else if (e.target.classList.contains('pay-btn')){
        handlePayClick(e)
    }

})


function handleAddBtnClick(btnId){
    const targetObject = menuArray.filter(item => item.id == btnId)[0]
    order.push( {
        name: targetObject.name,
        price: targetObject.price,
        id: order.length 
    })
    render()
}

function handleRemoveBtnClick(btnId){
    order.splice(order.findIndex(item => item.id === btnId), 1)
    render()
}

function handleCompleteBtnClick(){
    document.querySelector('.modal').classList.remove('hide')
    document.querySelector('.overlay').classList.remove('hide')
}

function handleOverlayClick(){
    document.querySelector('.modal').classList.add('hide')
    document.querySelector('.overlay').classList.add('hide')
}


function handlePayClick(e){
    e.preventDefault()
    handleOverlayClick()
    const name = document.querySelector('.card-form-name')
    document.querySelector('.card-form-number').value = ''
    document.querySelector('.card-form-cvv').value = ''

    document.querySelector('.order-container').innerHTML = `
    <div class="thanks">Thanks, ${name.value}! Your order is on its way!</div>
    `
    name.value = ''
    order.length = 0
}

function getMenu(){
    let menuHtml = ``
    menuArray.forEach(item => {
        let ingredients = ``
        item.ingredients.forEach(ingredient => {
            ingredients +=  ingredient + ', ' 
        })
        
        menuHtml += `
        <div class="menu">
            <img src="${item.img}">
            <div class="item">
                <span class="item-name">${item.name}</span>
                <span class="ingredients">${ingredients.substring(0,ingredients.length-1)}</span>
                <span class="price">$${item.price}</span>
            </div>
            <button class="add-btn" data-add-btn="${item.id}">+</button>
        </div>
        `
    });
    return menuHtml
}

function getTotalPrice(){
    return order.reduce((totalPrice, itemPrice) => {
       return totalPrice + itemPrice.price
    }, 0)
}

function getOrder(){
let orderItems = ``

order.forEach(item => {
    orderItems += `
    <div class="order-item">
        <p class="order-item-name">${item.name}</p>
        <button data-remove="${item.id}" class="remove-btn">remove</button>
        <span class="order-price">$${item.price}</span>
    </div>
    `
})


let fullOrder = `
<div class="order">
    <p class="order-title">Your order</p>
    ${orderItems}
    <div class="total-price">
        <p>Total price:</p>
        <span class="order-price">$${getTotalPrice()}</span>
    </div>
    <button class="complete-btn">Complete order</button>
</div>
`
return fullOrder
}





function render(){
    const orderContainer = document.querySelector('.order-container')

    document.querySelector('.menu-container').innerHTML = getMenu()

    if(order.length){
        orderContainer.innerHTML = getOrder()
    } else orderContainer.innerHTML = ``
}



render()