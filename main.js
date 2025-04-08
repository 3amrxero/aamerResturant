const pay = document.getElementById('pay')
const x = document.getElementById('x')
const form = document.getElementById('form')
const order = document.getElementById('order')

form.addEventListener('submit', e => {
    e.preventDefault()

    if (!form.checkValidity()) {
        alert('Please fill out all required fields correctly.');
        return
    }
    const data = new FormData(form)
    const name = data.get('cardname')
    
    form.querySelectorAll(':not(#x)').forEach(element => {
        element.remove()
    })
    
    const p = document.createElement('p');
    p.textContent = `Thank you, ${name}, for your order!`
    p.style.fontSize = '20px'
    p.style.color = 'Green'
    p.style.fontWeight = 'Bold'
    form.appendChild(p)

    localStorage.removeItem('cart')
    orderSum()
    
    setTimeout(() => {
        form.style.display = 'none'
        location.reload()
    }, 2000);
})


x.addEventListener('click', () => {
    form.style.display = 'none'
});

order.addEventListener('click', () => {
    form.style.display = 'flex'
});




function orderSum(){

    const pizzaPrice = document.getElementById('pizza-price')
    const burgerPrice = document.getElementById('burger-price')
    const drinksPrice = document.getElementById('drinks-price')
    const totalPrice = document.getElementById('total-price')
    const cart = getItem()
    
    const totalPizza = cart.filter(item => item.category === 'Pizza')
    .reduce((Key,item)=> Key + item.price
    , 0);

    const totalBurger = cart.filter(item => item.category === 'burger')
    .reduce((key, item)=> key+item.price
    , 0)

    const totalDrinks = cart.filter(item => item.category === 'Drinks')
    .reduce((key, item)=> key+item.price
    , 0)
    
    const TotalOrder = totalBurger + totalDrinks + totalPizza

    drinksPrice.textContent = `${totalDrinks} L.E`
    burgerPrice.textContent = `${totalBurger} L.E`
    pizzaPrice.textContent = `${totalPizza} L.E`
    totalPrice.innerText = `${TotalOrder} L.E`
}



function save(cart){
    localStorage.setItem('cart', JSON.stringify(cart))
}

function getItem(){
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data): []
}

function addItem(category, price, name){
    const cart = getItem();
    cart.push({ category: category, price: price, name: name });
    save(cart);
    orderSum()
}

document.addEventListener('DOMContentLoaded', ()=>{

    const addBtn = document.querySelectorAll('.add-btn')
    orderSum()

    addBtn.forEach(button=>{
        button.addEventListener('click', function(){
                
            const category = button.dataset.category
            const price =   parseFloat(button.dataset.price)
            const name =  button.dataset.name
            addItem(category, price, name)
        })
    })

})

document.getElementById('pizza-remove-btn').addEventListener('click', () => {
    let cart = getItem();
    cart = cart.filter(item => item.category !== 'Pizza');
    save(cart);
    orderSum();
});

document.getElementById('burgers-remove-btn').addEventListener('click', () => {
    let cart = getItem();
    cart = cart.filter(item => item.category !== 'burger');
    save(cart);
    orderSum();
});

document.getElementById('drinks-remove-btn').addEventListener('click', () => {
    let cart = getItem();
    cart = cart.filter(item => item.category !== 'Drinks');
    save(cart);
    orderSum();
});