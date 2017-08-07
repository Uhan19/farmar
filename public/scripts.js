const images = document.querySelectorAll('.ItemImage');

function hasSelected() {
  for (var i = 0; i < images.length; i++) {
    if (images.classList.contains('selected')) {
      return true;
    }
  }
  return false;
}

if (!hasSelected) {
  images[0].classList.add('selected');
}

function handleImageClick() {
  for (var i = 0; i < images.length; i++) {
    if (images[i].classList.contains('selected')) {
      images[i].classList.remove('selected');
    }
  }
  this.classList.add('selected');
}

image.forEach(function(ele) {
  ele.addEventListener('click', handleImageClick);
});
