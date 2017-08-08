const images = document.querySelectorAll('.ItemImage');
const SelectedImage = document.querySelector('.SelectedImage');
const ImageLink = document.querySelector('.ItemImageLink');
const Name = document.querySelector('.SelectedImageName');

function hasSelected() {
  for (var i = 0; i < images.length; i++) {
    if (images[0].classList.contains('selected')) {
      return true;
    }
  }
  return false;
}

if (!hasSelected()) {
  images[0].classList.add('selected');
}

const SelectedThumbnail = document.querySelector('.selected');

function handleImageClick() {
  for (var i = 0; i < images.length; i++) {
    if (images[i].classList.contains('selected')) {
      images[i].classList.remove('selected');
    }
  }
  this.classList.add('selected');
  SelectedImage.src = this.src;
  ImageLink.href = this.src;
  SelectedImage.alt = this.name;
  Name.innerHTML = this.name;
}

images.forEach(function(ele) {
  ele.addEventListener('click', handleImageClick);
});

SelectedImage.src = SelectedThumbnail.src;
SelectedImage.alt = SelectedThumbnail.name;
ImageLink.href = SelectedThumbnail.src;
Name.innerHTML = SelectedThumbnail.name;
