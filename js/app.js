let product = document.querySelector(".features_items");
let productBtn = document.querySelector(".add-to-cart");
let cartBtn = document.querySelectorAll(".cart-amount");
let qntyBtn = document.querySelectorAll(".cart-quantity");
let cart = document.querySelectorAll("#cart");
let abc = document.querySelector(".abc");
let productDetails = []
let tbody = document.querySelector('#tbody');
let cartItems = document.querySelector('#cart_items')
let homeLink = document.querySelectorAll('#homeLink')
let home = document.querySelector('#home')
let logo = document.querySelector('.logo')

let totalProduct = []

product.addEventListener('click', (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        console.log(e.target.parentElement.firstElementChild)

        setTimeout(() => {
            e.target.classList.add('addedProduct')
        },100)
        
        let price = e.target.previousElementSibling.previousElementSibling.innerHTML
        let  keepDetail = e.target.previousElementSibling.innerHTML

        let ans =  price 
        price = [...ans]
        price.shift(price[0]);
        
      

        priceProduct = price.join('');
        console.log(price.join(''));

        function feedbackError() {
            let errNote
            if (e.target.previousElementSibling.innerHTML !== 'Product already selected') {
                errNote = document.createTextNode('Product already selected')
                e.target.previousElementSibling.innerHTML = ''
                e.target.previousElementSibling.classList.add('errorProduct')
                e.target.previousElementSibling.appendChild(errNote);
                console.log(e.target.previousElementSibling)
            }           
            
            setTimeout(() => {
                if (e.target.previousElementSibling.classList.contains('errorProduct')) {
                    e.target.previousElementSibling.removeChild(errNote)
                    e.target.previousElementSibling.classList.remove('errorProduct')
                    e.target.previousElementSibling.innerHTML = keepDetail
                }
            }, 2000)

           return keepDetail;

        }

        let checkProduct = e.target.classList.contains('addedProduct') /**/
					? feedbackError()
					: productDetails.push({
							id: Date.now(),
							product: keepDetail,
							price: priceProduct,
							quantity: 1,
							product_id: e.target.dataset.product,
							product_thumbnail: e.target.parentElement.firstElementChild.src
					  });

        console.log(checkProduct)
        console.log(productDetails)
        // console.log(Object.keys(productDetails))
        
        controlCart(productDetails)
    }
})

function controlCart(productDetails) {
    let priceItem = productDetails.map(item => {
        return ( parseInt(item.price) * item.quantity)
    })


    priceTotal = priceItem.reduce((a, b) => { return a + b }, 0);
        console.log(priceTotal)

        cartBtn.forEach(item => {
            item.innerHTML = priceTotal
        })
        qntyBtn.forEach(item => {
            item.innerHTML = priceItem.length
        })
}

homeLink.forEach(item => {
    item.addEventListener('click', (e) => { 
        cartItems.classList.add('hide')
        controlCart(productDetails)
        if (home.classList.contains('hide')) {
            home.classList.remove('hide')
        }
    })
})

cart.forEach(item => {
    item.addEventListener('click', (e) => {
        home.classList.add('hide') 
        if (cartItems.classList.contains('hide')) {
            cartItems.classList.remove('hide')
        }
        console.log(productDetails)
        let res = productDetails.map(item => {
            return `
            <tr data-id='${item.id}'>
            <td class="cart_product">
                <a href="#"><img src=${
									item.product_thumbnail
								} width='50px' alt=""></a>
            </td>
            <td class="cart_description">
                <h4><a href="">${item.product}</a></h4>
            </td>
            <td class="cart_price">
                <p>₦${item.price}</p>
            </td>
            <td class="cart_quantity">
                <div class="cart_quantity_button">
                    <a class="cart_quantity_up"> + </a>
                    <input class="cart_quantity_input" type="text" name="quantity" value="${
											item.quantity
										}" autocomplete="off" size="2">
                    <a class="cart_quantity_down"> - </a>
                </div>
            </td>
            <td class="cart_total">
                <p class="cart_total_price">₦${parseInt(item.price) *
									item.quantity}</p>
            </td>
            <td class="cart_delete">
                <a class="cart_quantity_delete" data-product='${
									item.product_id
								}'><i class="fa fa-times"></i></a>
            </td>
            </tr>
        `;
        })

            if(!res.length){
                res = `<h2 style="margin-top:40px">No Product Selected</h2>`
            }

            tbody.innerHTML = res

        let ans = productDetails.map(item => {
            return parseInt(item.price) * item.quantity
        }).reduce((a, b) => { return (a + b) },0)

        console.log(ans)

        let total = ` <tr id="totalCart">
                        <td colspan="4">&nbsp;</td>
                        <td colspan="2">
                            <table class="table table-condensed total-result">
                                <tbody>
                                    <tr class="shipping-cost">
                                        <td>Shipping Cost</td>
                                        <td>Free</td>
                                    </tr>
                                    <tr>
                                        <td>Product</td>
                                        <td><span id='productList'>${productDetails.length}</span></td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td><span id='sumTotal'>₦${ans}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>`;
        // setTimeout(() => {
            let totalCart = document.querySelector('#totalCart')
            if (!totalCart) {
               tbody.insertAdjacentHTML("beforeend", total)
            } 
        // },200)

    })
})

cartItems.addEventListener('click', (e) => {
    let sumTotal = document.querySelector('#sumTotal')
    let list = document.querySelector('#productList')
    let updatedDetails = null
    if (e.target.parentElement.classList.contains('cart_quantity_delete')) {
            let product = document.querySelectorAll('.addedProduct')
            product.forEach(item => {
                if (item.dataset.product == e.target.parentElement.dataset.product) {
                    item.classList.remove('addedProduct')
                }
        })
        console.log(e.target)
        let id = e.target.parentElement.parentElement.parentElement.dataset.id;
        let parent = e.target.parentElement.parentElement.parentElement.parentElement;
        let item = e.target.parentElement.parentElement.parentElement;
        console.log(item)
        updatedDetails = productDetails.filter(item => {           
            return item.id !== parseInt(id)
        })
        
        productDetails = updatedDetails
        setTimeout(() => {
            console.log(updatedDetails)
            controlCart(productDetails)
            let cart = document.querySelector('.cart-amount');
            console.log(cart)
            sumTotal.innerHTML = `$${cart.innerText}`
        }, 500);

        
        list.innerHTML = productDetails.length
        console.log(sumTotal);
        item.classList.add('opacity')

        setTimeout(() => {
            parent.removeChild(item)
        }, 2000)
    }


    if (e.target.classList.contains('cart_quantity_up')) {
        let priceTot = e.target.parentElement.parentElement.nextElementSibling.firstElementChild;

        priceNum = parseInt(priceTot.innerHTML.slice(1, priceTot.length) )
        
        let id = e.target.parentElement.parentElement.parentElement.dataset.id;

        e.target.nextElementSibling.value = parseInt(e.target.nextElementSibling.value) + 1
        console.log(priceNum)
        updatedDetails = productDetails.map(item => {   
            if (item.id === parseInt(id)) {
                item.quantity = item.quantity + 1
                setTimeout(() => {
                    priceTot.parentElement.firstElementChild.innerHTML = `₦${parseInt(item.price) * item.quantity}`;
                },500)
            }
            return item
        })
        productDetails = updatedDetails
        setTimeout(() => {
            console.log(updatedDetails)
            controlCart(productDetails)
            // sumTotal.innerText = cartBtn.inneText
            let cart = document.querySelector('.cart-amount');
            console.log(cart)
            sumTotal.innerHTML = `₦${cart.innerText}`;
        }, 500);
    }

    if (e.target.classList.contains('cart_quantity_down')) {
        let priceTot = e.target.parentElement.parentElement.nextElementSibling.firstElementChild;

        priceNum = parseInt(priceTot.innerHTML.slice(1, priceTot.length) )
        
        
        let id = e.target.parentElement.parentElement.parentElement.dataset.id;
        // let inputQuantity = document.querySelector('.cart_quantity_input')
        if (e.target.previousElementSibling.value == 1 || e.target.previousElementSibling.value > 1 ) {
            
            e.target.previousElementSibling.value  = e.target.previousElementSibling.value < 2 ? parseInt(e.target.previousElementSibling.value) : parseInt(e.target.previousElementSibling.value) - 1

            updatedDetails = productDetails.map(item => {   
                if (item.id === parseInt(id)) {
                    item.quantity = e.target.previousElementSibling.value < 2 ? parseInt(e.target.previousElementSibling.value ) : item.quantity - 1
                    priceTot.parentElement.firstElementChild.innerHTML = `₦${parseInt(item.price) * parseInt(e.target.previousElementSibling.value)}`;
                }
            return item
            })

        }
        console.log(priceNum)
        
        productDetails = updatedDetails
        setTimeout(() => {
            console.log(updatedDetails)
            controlCart(productDetails)

            let cart = document.querySelector('.cart-amount');
            console.log(cart)
            sumTotal.innerHTML = `₦${cart.innerText}`;
        }, 500);
    }
})
 


