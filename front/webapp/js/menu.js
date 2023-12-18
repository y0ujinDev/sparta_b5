window.onload = function () {
  // 홈
  document.querySelector('#home').addEventListener('click', function () {
    toHome();
  });

  // 리뷰
  document.querySelector('#review').addEventListener('click', function () {
    window.location.href = 'http://127.0.0.1:5500/front/webapp/review.html';
  });

  // 장바구니
  document
    .querySelector('#shopping-cart')
    .addEventListener('click', function () {
      window.location.href = 'http://127.0.0.1:5500/front/webapp/getcart.html';
    });
};

function toHome() {
  window.location.href = 'http://127.0.0.1:5500/front/webapp/index.html';
}
