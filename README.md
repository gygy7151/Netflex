# 📍 영화 검색 사이트 Netflex

- [데모사이트](https://bluevulpe.netlify.app)
    - 따로 구매한 도메인을 연결하려고 했는데, 가비안 도메인 네임서버에 호스팅 ip주소를 연결했는데도 잘 되지 않았습니다.
    - 혹시 해당 부분 해결 방법 아시는 분 계신다면 조언 부탁드립니다.
    - 배포 도메인은 netlify 서브 도메인 주소로 배포완료 작업했습니다.

- 작업기간 및 기여도
    -  2023년 1월 4일 ~ 1월 15일(종료예정)
    - 기여도 100%

- 기술스택 
    - 프론트엔드 : Vanila JS, SCSS
    - 배포: Netlify

- 구현목표 
    - [x] imdb api 사이트의 오픈 API 소스를 활용하여 영화를 연도별로 검색 가능하도록 구현 했습니다.
    - [ ] 영화 제목만 검색해도 검색 가능한 기능은 주말에 작업 완료 할 얘정입니다.
    - [x] 영화 검색시 엔터키와 검색버튼 둘 중 어느것을 클릭하든 검색 가능하며, 영어제목만 검색 가능합니다.
    - [x] imdb api 사이트의 오픈 API 소스를 활용하여 영화를 검색하고 세부정보를 확인 할 수 있는 사이트를 제작하였습니다.
    - [x] 영화 검색 완료시점에 영화 포스터 로딩 아이콘이 사라지도록 이벤트를 구현 했습니다. 
    - [x] 무한스크롤을 적용하여 최초 20개의 영화가 업로드된  후 아래로 스크롤하면 추가목록 확인이 가능합니다.
    - [x] 일정 스크롤 이벤트가 발생하고 모든 영화목록이 렌더링 되고 나면 검색완료 모달창이 페이지 하단에 한번만 노출되고 사라집니다. 
    - [x] 검색 된 영화의 상세정보 보기 버튼을 클릭하면 영화의 세부정보를 확인 할 수 있는 모달창을 작업했습니다.
    - [x] 상세정보 모달창 닫기 버튼 및 상세정보보기 버튼에 마우스가 호버링 되면 cursor가 포인터로 바뀌도록 작업했습니다.
    - [ ] 상세정보 보기 버튼에 마우스가 오버링되면 화살표로 '상세정보' 안내문구가 보여지는 작업도 주말에 작업할 예정입니다.
    - [x] 검색 인풋값 길이에 따른 동적인 배너 애니메이션을 작업 했습니다.
    - [x] 세부페이지 모달창에 로딩아이콘 대신 이용자 이탈율을 더욱 낮춰줄 수 있는 스켈레톤 로딩을 구현 했습니다.
    - [ ] 세부페이지 모달창의 데이터를 아직 붙이지 못했습니다. 해당 작업은 이번 주말에 완료 할 예정입니다.
    - [x] 상세정보 모달창이 띄워지면 'x'버튼을 클릭해 종료하고 다른 영화정보를 검색하도록 구현했습니다.
    - [x] SCSS를 사용하여 스타일 적용하였습니다.
 
