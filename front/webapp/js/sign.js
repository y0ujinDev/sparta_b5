const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

function toHome() {
  location.href = 'http://127.0.0.1:5500/front/webapp/index.html';
}

document
  .querySelector('#signupform')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    const nickname = document.querySelector('#signupNickname').value;
    const email = document.querySelector('#signupEmail').value;
    const password = document.querySelector('#signupPassword').value;
    const confirmPassword = document.querySelector(
      '#signupConfirmPassword',
    ).value;
    const isOwner = document.querySelector('#isOwner').checked;
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          nickname: nickname,
          password: password,
          confirmPassword: confirmPassword,
          isOwner: isOwner,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert(data.message);
        window.location.href = 'http://127.0.0.1:5500/front/webapp/sign.html';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('알 수 없는 오류가 발생하였습니다.', error);
      alert('알 수 없는 오류가 발생하였습니다. 관리자에게 문의하세요.');
    }
  });

document
  .querySelector('#signinform')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.querySelector('#signinEmail').value;
    const password = document.querySelector('#signinPassword').value;
    try {
      const response = await fetch('http://localhost:3000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert(data.message);
        window.location.href = 'http://127.0.0.1:5500/front/webapp/index.html';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('알 수 없는 오류가 발생하였습니다.', error);
      alert('알 수 없는 오류가 발생하였습니다. 관리자에게 문의하세요.');
    }
  });
