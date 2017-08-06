function itemHandler(e, productName) {
  e.preventDefault();
  var item = e.path[0].className;
  window.localStorage.setItem(item + '-quantity', document.getElementById('InvoiceInputQuantity').value);
  window.localStorage.setItem(item + '-notes', document.getElementById('InvoiceInputNotes').value);
}

module.exports = itemHandler;

// script document.getElementById('InvoiceSave').onclick = function (e) {e.preventDefault(); var item = e.path[0].className; window.localStorage.setItem(item + '-quantity', document.getElementById('InvoiceInputQuantity').value); window.localStorage.setItem(item + '-notes', document.getElementById('InvoiceInputNotes').value); }
