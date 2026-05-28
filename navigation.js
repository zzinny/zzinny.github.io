
fetch('/sidebar.html') 
    .then(response => {
        if (!response.ok) throw new Error('메뉴를 불러오지 못했습니다.');
        return response.text();
    })
    .then(data => {
        document.getElementById('sidebar').innerHTML = data;

        // 화면에 메뉴 바가 그려진 후 버튼 기능 연결
        const toggleBtn = document.getElementById('menu-toggle');
        const menuContent = document.getElementById('menu-content');

        if (toggleBtn && menuContent) {
            toggleBtn.addEventListener('click', () => {
                menuContent.classList.toggle('active');
                if (menuContent.classList.contains('active')) {
                    toggleBtn.textContent = '✕';
                } else {
                    toggleBtn.textContent = '☰';
                }
            });
        }
    })
    .catch(error => console.error(error));