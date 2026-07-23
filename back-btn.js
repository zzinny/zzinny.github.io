function goBackOrHome(event) {
  event.preventDefault(); // 기본 앵커 이동 방지
  
  // 이전 페이지 기록이 있으면 뒤로 가고, 없으면 메인 페이지로 이동
  if (document.referrer && document.referrer !== location.href) {
    history.back();
  } else {
    location.href = '/'; // 대체할 메인 페이지 경로
  }
}