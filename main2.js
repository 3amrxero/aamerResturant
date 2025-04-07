document.addEventListener('DOMContentLoaded', ()=>{

    document.querySelectorAll('.add-btn').forEach(button => {

        button.addEventListener('click', ()=>{
            const category = button.dataset.category
            const name = button.dataset.name
            const price = parseFloat(button.dataset.price)
            addItem (category, name, price)
        } )
        
    });




})

function orderTotal(){
    const cart = getItem()
    const totalPizza = cart
        .filter(item => item.category === 'Pizza')
        .reduce((now,next)=>{
                    now + next.price
                }, 0)
            
        
    const totalBurger = cart.filter(function(item){
        item.category === 'burger'.reduce(function(now,next){
            now+next.price
        })
    })
    const totalDrinks = cart.filter(function(item){
        item.category === 'Drinks'
        .reduce(function(now,next){
            now+next.price
        })
    })

    const grandTotal = totalBurger + totalDrinks + totalPizza


    document.getElementById('pizza-price').textContent = totalPizza + ' L.E'
    document.getElementById('burger-price').textContent = totalBurger + ' L.E'
    document.getElementById('drinks-price').textContent = totalDrinks + ' L.E'
    document.getElementById('total-price').textContent = grandTotal + ' L.E'


}

function addItem(category, name, price){
    const cart = getItem()
    cart.push({category: category, name: name, price: price })
    save(cart)
    orderTotal()
}
 
function save(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getItem() {
    const cart = localStorage.getItem('cart'); // Get the string
    return cart ? JSON.parse(cart) : []; // Parse and return it
}

// document.addEventListener('click', (e)=> {
//     console.log(e.category)

// })

