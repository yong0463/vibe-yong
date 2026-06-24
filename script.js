// 기술가정 퀴즈 데이터 (수업 내용에 맞게 자유롭게 수정하세요)
const quizData = [
    {
        question: "1. 사물에 센서와 통신 기능을 내장하여 인터넷으로 연결하는 기술을 무엇이라고 할까요?",
        options: ["인공지능(AI)", "사물인터넷(IoT)", "가상현실(VR)", "빅데이터"],
        answer: 1 // 1번 인덱스(사물인터넷)가 정답
    },
    {
        question: "2. 다음 중 자율주행 자동차의 핵심 기술이 아닌 것은?",
        options: ["라이다(LiDAR) 센서", "위성 항법 장치(GPS)", "수동 변속기", "인공지능 컴퓨터"],
        answer: 2 // 2번 인덱스(수동 변속기)가 정답
    },
    {
        question: "3. 버려지는 물건에 디자인이나 활용성을 더해 가치가 높은 제품으로 재탄생시키는 활동은?",
        options: ["리사이클링(재활용)", "업사이클링(새활용)", "소각 처리", "친환경 매립"],
        answer: 1 // 1번 인덱스(업사이클링)가 정답
    }
];

const quizContent = document.getElementById('quiz-content');
const submitBtn = document.getElementById('submit-btn');
const resultArea = document.getElementById('result-area');

// 화면에 퀴즈 문항 그려주기
function renderQuiz() {
    let htmlString = '';
    
    quizData.forEach((item, index) => {
        htmlString += `<div class="question-item">`;
        htmlString += `<div class="question-title">${item.question}</div>`;
        
        item.options.forEach((opt, optIndex) => {
            htmlString += `
                <label class="option-label">
                    <input type="radio" name="q${index}" value="${optIndex}">
                    ${opt}
                </label>
            `;
        });
        
        htmlString += `</div>`;
    });
    
    quizContent.innerHTML = htmlString;
}

// 정답 확인 및 채점하기
function calculateScore() {
    let score = 0;
    let answeredCount = 0;

    quizData.forEach((item, index) => {
        const checkedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (checkedOption) {
            answeredCount++;
            if (parseInt(checkedOption.value) === item.answer) {
                score++;
            }
        }
    });

    // 누락된 문제가 있는지 확인
    if (answeredCount < quizData.length) {
        alert("아직 선택하지 않은 문제가 있습니다!");
        return;
    }

    // 결과 출력
    resultArea.style.display = 'block';
    if (score === quizData.length) {
        resultArea.className = 'result-success';
        resultArea.innerHTML = `🎉 완벽합니다! (${score}/${quizData.length}점)<br>오늘 수업 준비 완료!`;
    } else {
        resultArea.className = 'result-retry';
        resultArea.innerHTML = `💡 아쉽네요! (${score}/${quizData.length}점)<br>틀린 문제는 오늘 수업에서 알아봅시다!`;
    }
}

// 초기 함수 실행 및 이벤트 리스너 연결
renderQuiz();
submitBtn.addEventListener('click', calculateScore);
