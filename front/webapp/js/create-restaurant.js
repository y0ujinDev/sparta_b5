document
  .querySelector('.submitBtn')
  .addEventListener('click', async function (e) {
    e.preventDefault();

    const cetegory = document.querySelector('#restaruantCategory').value;
    const name = document.querySelector('#restaruantName').value;
    const address = document.querySelector('#restaruantAddress').value;
    const content = document.querySelector('#restaruantContent').value;

    try {
      const response = await fetch('http://localhost:3000/api/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: cetegory,
          name: name,
          address: address,
          content: content,
        }),
      });

      const data = await response.json();

      console.log('Success:', data);

      alert('업장 생성이 완료되었습니다.');

      window.location.href =
        'http://127.0.0.1:5500/front/webapp/onwerPage.html';

      location.reload();
    } catch (err) {
      console.error('Err: ', err);
    }
  });

// 유저
document.querySelector('#user').addEventListener('click', function () {
  window.location.href = 'http://127.0.0.1:5500/front/webapp/mypage.html';
});

function toHome() {
  window.location.href = 'http://127.0.0.1:5500/front/webapp/index.html';
}
