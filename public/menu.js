// Order functions

function openOrder(itemName, price) {
    console.log("Button clicked");
    document.getElementById("itemName").innerHTML = itemName;
    document.getElementById("cartForm").style.display = "block";

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById("submitButton").addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default button click behavior
        
            console.log("Submit button clicked");
        
            var itemName = document.getElementById('itemName').textContent;
            var price = parseFloat(document.querySelector('.price').textContent.replace('$', ''));
            var quantity = parseInt(document.getElementById('quantity').value);
        
            submitOrder(itemName, price, quantity);
        });
    });
    
        
}

function closeCart() {
    document.getElementById("cartForm").style.display = "none";
}

document.getElementById("closeCart").addEventListener("click", closeCart);

function submitOrder(itemName, price) {
    console.log('Submitting order')
    var quantity = parseInt(document.getElementById('quantity').value);

    if (quantity > 0 && quantity <= 10) {
        fetch('http://localhost:3000/calculate', {
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


      .then(response => response.json())
      .then(data => {
        alert(`Order submitted successfully!\nItem: ${data.itemName}\nQuantity: ${data.quantity}\nTotal Price: $${data.totalAmount.toFixed(2)}`)
        closeCart();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error occurred. Please try again later.')
    });
} else {
    alert("Please enter a valid quanitity (1-10). Thank you!")
    }
}
