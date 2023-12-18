document.getElementById('deleteBtn').addEventListener('click', function () {
  document.querySelector('.cartList').style.display = 'none';
});

document
  .getElementById('tableDeleteBtn')
  .addEventListener('click', function () {
    document.querySelector('#cartOne').style.display = 'none';
  });

document.querySelector('#getMenuBtn').addEventListener('click', function () {
  window.location.href = 'http://127.0.0.1:5500/front/webapp/menu.html';
});
