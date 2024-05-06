// Order functions
function openOrder(itemName, price) {
    console.log("Button clicked");
    document.getElementById("itemName").innerHTML = itemName;
    document.getElementById("cartForm").style.display = "block";

    document.getElementById("submitButton").addEventListener("click", function(event) {
        event.preventDefault();
        var quantity = parseInt(document.getElementById('quantity').value); 
        submitOrder(itemName, price, quantity);
    });
}

function closeCart() {
    document.getElementById("cartForm").style.display = "none";
}

document.getElementById("closeCart").addEventListener("click", closeCart);

function submitOrder(itemName, price, quantity) {
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            itemName,
            price,
            quantity
        })
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = `/order_confirmation?itemName=${encodeURIComponent(data.itemName)}&quantity=${encodeURIComponent(data.quantity)}&totalAmount=${encodeURIComponent(data.totalAmount)}`;
    })
    .catch(error => {
        console.error('Error submitting order:', error);
        alert('Error submitting order. Please try again later.');
    });
}
