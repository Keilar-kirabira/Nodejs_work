document.getElementById('addItemBtn').addEventListener('click', function() {
 
  const tbody = document.getElementById('cart-items');

  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td><input type="text" class="form-control" name="productType"></td>
    <td><input type="text" class="form-control" name="productName"></td>
    <td><input type="number" class="form-control" name="quantity" min="1" value="1"></td>
    <td><input type="number" class="form-control" name="unitPrice" min="0" value="0"></td>
    <td><span class="total-price">0</span></td>
    <td><button type="button" class="btn btn-danger btn-sm removeBtn">Remove</button></td>
  `;

  tbody.appendChild(newRow);

  newRow.querySelector('.removeBtn').addEventListener('click', function() {
    tbody.removeChild(newRow);
    updateSubtotal();
  });

  newRow.querySelectorAll('input[name="quantity"], input[name="unitPrice"]').forEach(input => {
    input.addEventListener('input', function() {
      updateRowTotal(newRow);
      updateSubtotal();
    });
  });

 
  function updateRowTotal(row) {
    const qty = parseFloat(row.querySelector('input[name="quantity"]').value) || 0;
    const price = parseFloat(row.querySelector('input[name="unitPrice"]').value) || 0;
    const totalCell = row.querySelector('.total-price');
    totalCell.textContent = (qty * price).toFixed(2);
  }

 
  updateRowTotal(newRow);

  function updateSubtotal() {
    let subtotal = 0;
    document.querySelectorAll('.total-price').forEach(span => {
      subtotal += parseFloat(span.textContent) || 0;
    });
    document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
  }

  
  updateSubtotal();
});
