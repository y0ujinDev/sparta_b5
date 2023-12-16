window.onload = function () {
  // 카테고리 버튼 관련 이벤트
  const categories = document.querySelectorAll('#categoryBox > div');

  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener('click', function (e) {
      const categoryLabel = e.currentTarget.querySelector('label');
      const categoryName = categoryLabel ? categoryLabel.innerText : '';
      const finalCategoryName =
        categoryName === '일식/회' ? '일식' : categoryName;
      console.log(finalCategoryName);
      window.location.href = `http://127.0.0.1:5500/front/webapp/restuarantread.html?category=${encodeURIComponent(
        finalCategoryName,
      )}`;
    });
  }

  // 업장 등록
  document.querySelector('#restaurant').addEventListener('click', function () {
    window.location.href =
      'http://127.0.0.1:5500/front/webapp/restuarantcreate.html';
  });

  // 유저
  document.querySelector('#user').addEventListener('click', function () {
    window.location.href = 'http://127.0.0.1:5500/front/webapp/mypage.html';
  });
};
