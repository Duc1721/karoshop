let selectedCard = null;
const learnedVocabulary = []; // Mảng lưu trữ từ vựng đã học
let currentQuestionIndex = 0; // Biến để theo dõi câu hỏi hiện tại

const questions = [
    {
        question: 'Đâu là "Cà phê"?',
        options: [
            { text: 'Tea', image: '../IMG/vocabulary/v2.png', correct: false },
            { text: 'Milk Tea', image: '../IMG/vocabulary/v3.png', correct: false },
            { text: 'Coffee', image: '../IMG/vocabulary/v1.png', correct: true }
        ]
    },
    {
        question: 'Đâu là "Con mèo"?',
        options: [
            { text: 'Dog', image: '../IMG/vocabulary/v4.png', correct: false },
            { text: 'Cat', image: '../IMG/vocabulary/v5.png', correct: true },
            { text: 'Sheep', image: '../IMG/vocabulary/v6.png', correct: false }
        ]
    },
    {
        question: 'Đâu là "Xe đạp"?',
        options: [
            { text: 'Car', image: '../IMG/vocabulary/v10.png', correct: false },
            { text: 'Bike', image: '../IMG/vocabulary/v11.png', correct: true },
            { text: 'Plane', image: '../IMG/vocabulary/v12.png', correct: false }
        ]
    },
    {
        question: 'Đâu là "Quả chanh"?',
        options: [
            { text: 'Mango', image: '../IMG/vocabulary/v7.png', correct: false },
            { text: 'Orange', image: '../IMG/vocabulary/v8.png', correct: false },
            { text: 'Lemon', image: '../IMG/vocabulary/v9.png', correct: true }
        ]
    },
    {
        question: 'Đâu là "Ghế văn phòng"?',
        options: [
            { text: 'Office chair', image: '../IMG/vocabulary/v15.png', correct: true },
            { text: 'Sofa', image: '../IMG/vocabulary/v14.png', correct: false },
            { text: 'Wooden chair', image: '../IMG/vocabulary/v13.png', correct: false }
        ]
    }
];

document.querySelectorAll('.vocabulary-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.vocabulary-card').forEach(c => c.classList.remove('shadow'));
        this.classList.add('shadow');
        selectedCard = this;
        document.getElementById('buttonContainer').classList.add('visible');
    });
});

document.getElementById('confirmButton').addEventListener('click', function() {
    if (selectedCard) {
        const selectedText = selectedCard.querySelector('h2').innerText;
        const progress = document.getElementById('file');
        const currentQuestion = questions[currentQuestionIndex];

        const selectedOption = currentQuestion.options.find(option => option.text === selectedText);
        if (selectedOption && selectedOption.correct) {
            learnedVocabulary.push(selectedText); // Thêm từ vựng đã học vào mảng
            progress.value = Math.min(100, progress.value + 20);
        }

        if (progress.value === 100) {
            showLearnedVocabulary(); // Hiện giao diện từ vựng đã học
        } else {
            changeQuestion();
        }

        document.getElementById('buttonContainer').classList.remove('visible');
    }
});

function changeQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    const currentQuestion = questions[currentQuestionIndex];
    const shuffledOptions = currentQuestion.options.sort(() => Math.random() - 0.5);
    document.querySelector('.vocabulary-content label').innerText = currentQuestion.question;

    const cards = document.querySelectorAll('.vocabulary-card');
    shuffledOptions.forEach((option, index) => {
        cards[index].querySelector('h2').innerText = option.text;
        cards[index].querySelector('.vocabulary-background').src = option.image;
    });
}

function showLearnedVocabulary() {
    document.querySelector('.Welecome-to-learn').classList.add('hidden'); // Ẩn giao diện cũ
    const learnedVocabularyContainer = document.getElementById('learnedVocabulary');
    learnedVocabularyContainer.classList.remove('hidden'); // Hiện giao diện từ vựng đã học
    const vocabularyList = document.getElementById('vocabularyList');
    vocabularyList.innerHTML = ''; // Xóa nội dung cũ
    learnedVocabulary.forEach(word => {
        const listItem = document.createElement('li');
        listItem.innerText = word;
        vocabularyList.appendChild(listItem);
    });
}

// Restart button event listener
document.getElementById('restartButton').addEventListener('click', function() {
    document.getElementById('file').value = 0; // Reset progress
    learnedVocabulary.length = 0; // Reset learned vocabulary
    document.getElementById('learnedVocabulary').classList.add('hidden'); // Ẩn giao diện từ vựng đã học
    document.querySelector('.Welecome-to-learn').classList.remove('hidden'); // Hiện giao diện cũ
    currentQuestionIndex = 0; // Reset câu hỏi
    changeQuestion(); // Đặt câu hỏi đầu tiên
});
// 
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
}
const contactSticky = document.getElementById('contactSticky');
const notificationButton = document.getElementById('notificationButton');
const contactOptions = document.getElementById('contactOptions');

// Hiển thị các tùy chọn khi di chuột vào
contactSticky.addEventListener('mouseenter', () => {
    contactOptions.style.display = 'flex'; // Hiện nút gọi và messenger
    notificationButton.style.display = 'none'; // Ẩn nút thông báo
});

// Ẩn các tùy chọn khi di chuột ra
contactSticky.addEventListener('mouseleave', () => {
    contactOptions.style.display = 'none'; // Ẩn nút gọi và messenger
    notificationButton.style.display = 'inline-block'; // Hiển thị lại nút thông báo
});