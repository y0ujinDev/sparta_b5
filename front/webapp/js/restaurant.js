window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('category');
  const S3_BASE_URL =
    'https://sssclass-menu-image.s3.ap-northeast-2.amazonaws.com';

  try {
    const response = await fetch(
      `http://localhost:3000/api/restaurants/category?category=${categoryId}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (response.ok) {
      const { data } = await response.json();
      const restaurantListContainer = document.querySelector(
        '.restaurantListContainer',
      );
      restaurantListContainer.innerHTML = '';

      data.forEach((restaurant) => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'restaurantCard';

        const imageBox = document.createElement('div');
        imageBox.className = 'imageBox';
        const img = document.createElement('img');
        img.className = 'restaurantImg';
        img.src = `${S3_BASE_URL}/${restaurant.image}`;
        imageBox.appendChild(img);

        const contentBox = document.createElement('div');
        contentBox.className = 'contentBox';
        const h3 = document.createElement('h3');
        h3.className = 'restaurantName';
        h3.innerText = restaurant.name;
        contentBox.appendChild(h3);

        restaurantCard.appendChild(imageBox);
        restaurantCard.appendChild(contentBox);
        restaurantListContainer.appendChild(restaurantCard);
      });
    } else {
      alert('서버에서 응답이 올바르지 않습니다.');
    }
  } catch (err) {
    console.error(`err: ${err}`);
  }

  // 메뉴
  document
    .querySelector('.restaurantCard')
    .addEventListener('click', function () {
      window.location.href = 'http://127.0.0.1:5500/front/webapp/menu.html';
    });
};

function toHome() {
  window.location.href = 'http://127.0.0.1:5500/front/webapp/index.html';
}
