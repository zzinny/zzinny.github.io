
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

        // 현재 주소에 따라 메뉴 아이템 하이라이트 효과 주기
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.menu-content .menu-item');

        menuItems.forEach(item => {
            const itemPath = item.getAttribute('href');
            if (currentPath.includes(itemPath)) {
                item.classList.add('active');
            }
        });
    })
    .catch(error => console.error(error));