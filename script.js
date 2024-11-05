const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active')
    })
}


function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = { name: productName, price: productPrice, quantity: 1 };    
    const index = cart.findIndex(item => item.name === productName);
    if (index > -1) {
        cart[index].quantity += 1; 
    } else {
        cart.push(product); 
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}

function removeRow(element) {    
    const row = element.closest("tr");    
    row.remove();    
    updateCartTotal();
}
function updateCartTotal() {
    const rows = document.querySelectorAll("tbody tr");
    let subtotal = 0;
    rows.forEach(row => {
        const priceCell = row.querySelector("td:nth-child(4)"); 
        const quantityInput = row.querySelector("td:nth-child(5) input"); 
        const price = parseFloat(priceCell.textContent.replace("₹", "").replace(",", ""));
        const quantity = parseInt(quantityInput.value);
        subtotal += price * quantity;
    });
    document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)").textContent = `₹${subtotal.toLocaleString()}`;
    document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)").textContent = `₹${subtotal.toLocaleString()}`;
}
