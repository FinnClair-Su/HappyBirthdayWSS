// ==== 欢迎动画部分 ====

// 状态变量
let welcomePhase = 'opening';
let visibleLines = 0;
let currentSection = 'welcome'; // welcome, memories, wishes, wordcloud, cake

// 开场白文字
const openingLines = [
    "3/28,一年中的第87天",
    "星空中，智神星被发现 [1802]",
    "维也纳，第一缕交响乐奏响 [1842]",
    "而在2006年的今天",
    "莫扎特的音符回荡250年之际",
    "你，降临于世"
];

// 转场文字（分为两部分）
const transitionLines = [
    "从1802年的星辰发现",
    "到2009年的'地球一小时'",
    "历史在这一天写下的篇章",
    "因你的诞生而被我们特别铭记"
];

// 转场第二部分
const transitionLines2 = [
    "范仲淹千年前所写下的",
    "'微斯人，吾谁与归'",
    "和'铄懿渊积'一起",
    "寄托着父母的期望，也是我们对你真心的评价"
];

// 结语文字
const closingLines = [
    "如同莫扎特的旋律穿越时空",
    "你的生命也在谱写独特的乐章",
    "",
    "2006年，莫扎特年",
    "一个特别的灵魂，降临到了世界",
    "",
    "19年后的今天",
    "我们庆祝你",
    "",
    "祝你生日快乐"
];

// ASCII艺术文字
const asciiHappyBirthday = `
 _    _                           ____  _      _   _         _             _ 
| |  | |                         |  _ \\| |    (_) | |       | |           | |
| |__| | __ _ _ __  _ __  _   _  | |_) |_ _ __ _  | |_ _   _| |__   ____ _| |
|  __  |/ _\` | '_ \\| '_ \\| | | | |  _ <| | '__| | | __| | | | '_ \\ / _\` | |
| |  | | (_| | |_) | |_) | |_| | | |_) | | |  | | | |_| |_| | | | | (_| |_|
|_|  |_|\\__,_| .__/| .__/ \\__, | |____/|_|_|  |_|  \\__|\\__,_|_| |_|\\__,_(_)
              | |   | |     __/ |                                            
              |_|   |_|    |___/                                             
`;

// DOM元素
const welcomeContainer = document.getElementById('welcome-container');
const textContainer = document.getElementById('text-container');
const starContainer = document.getElementById('star-container');
const noteContainer = document.getElementById('note-container');
const continueButton = document.getElementById('continue-button');
const navigationControls = document.getElementById('navigation-controls');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// 导航容器
const memoriesContainer = document.getElementById('memories-container');
const wishesWall = document.getElementById('wishes-wall');
const wordCloud = document.getElementById('word-cloud');
const birthdayCake = document.getElementById('birthday-cake');

// 音乐控制
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');

// 初始化欢迎动画
function initializeWelcome() {
    // 创建星星
    createStars();
    
    // 淡入效果
    setTimeout(() => {
        welcomeContainer.classList.add('fade-in');
        
        // 开始显示文本
        setTimeout(() => {
            showNextLine();
        }, 1000);
    }, 100);
    
    // 监听按钮点击
    continueButton.addEventListener('click', function() {
        handleContinueButtonClick();
    });
    
    // 设置导航按钮事件
    prevButton.addEventListener('click', navigateToPrevSection);
    nextButton.addEventListener('click', navigateToNextSection);
    
    // 设置音乐控制
    musicToggle.addEventListener('click', toggleMusic);
    
    // 初始化各个部分
    initializeMemories();
    initializeWishesWall();
    generateWordCloud();
    initializeBirthdayCake();
}

// 创建星星
function createStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = 1 + Math.random() * 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = 0.2 + Math.random() * 0.8;
        const animDuration = 1 + Math.random() * 5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.opacity = opacity;
        star.style.animation = `twinkle ${animDuration}s ease-in-out infinite`;
        
        starContainer.appendChild(star);
    }
}

// 创建音符
function createNotes() {
    noteContainer.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = '♪';
        
        const size = 4 + Math.random() * 8;
        const left = Math.random() * 100;
        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * 10;
        
        note.style.fontSize = `${size}px`;
        note.style.left = `${left}%`;
        note.style.top = '-20px';
        note.style.animation = `floating ${duration}s linear ${delay}s infinite`;
        
        noteContainer.appendChild(note);
    }
}

// 获取当前阶段的文本
function getCurrentLines() {
    if (welcomePhase === 'opening') return openingLines;
    if (welcomePhase === 'transition') return transitionLines;
    if (welcomePhase === 'transition2') return transitionLines2;
    if (welcomePhase === 'closing') return closingLines;
    return [];
}

// 显示下一行文本
function showNextLine() {
    const currentLines = getCurrentLines();
    
    if (visibleLines < currentLines.length) {
        const lineElement = document.createElement('div');
        lineElement.className = 'text-line';
        
        if (currentLines[visibleLines] === "") {
            lineElement.classList.add('empty-line');
        }
        
        lineElement.textContent = currentLines[visibleLines];
        textContainer.appendChild(lineElement);
        
        // 触发动画
        setTimeout(() => {
            lineElement.classList.add('animate-fadeIn');
        }, 50);
        
        visibleLines++;
        
        // 计划显示下一行
        const delay = welcomePhase === 'closing' ? 1500 : 2000;
        
        // 检查是否需要显示继续按钮
        if (shouldShowContinueForTransition()) {
            showContinueButton('继续阅读');
        } else {
            setTimeout(showNextLine, delay);
        }
    } else {
        // 当前阶段结束，准备进入下一阶段
        showContinueButton(getNextButtonText());
    }
}

// 检查是否需要在特定位置显示继续按钮
function shouldShowContinueForTransition() {
    // 转场阶段"因你的诞生而被我们特别铭记"之后显示继续按钮
    if (welcomePhase === 'transition' && visibleLines === 4) {
        return true;
    }
    return false;
}

// 根据当前阶段获取按钮文字
function getNextButtonText() {
    if (welcomePhase === 'opening') {
        return '继续阅读';
    } else if (welcomePhase === 'transition') {
        return '继续阅读';
    } else if (welcomePhase === 'transition2') {
        return '继续阅读';
    } else if (welcomePhase === 'closing') {
        return '查看祝福';
    }
    return '继续';
}

// 转换到下一阶段
function transitionToWelcomePhase(newPhase) {
    // 淡出效果
    welcomeContainer.classList.remove('fade-in');
    
    setTimeout(() => {
        // 更新背景色
        if (newPhase === 'transition') {
            welcomeContainer.style.backgroundColor = '#121212'; // 深灰色
            createNotes();
        } else if (newPhase === 'transition2') {
            welcomeContainer.style.backgroundColor = '#121240'; // 深蓝灰色
            createNotes();
        } else if (newPhase === 'closing') {
            welcomeContainer.style.backgroundColor = '#1e1e2e'; // 深蓝灰色
            createNotes();
        }
        
        // 清空文本容器
        textContainer.innerHTML = '';
        
        // 更新状态
        welcomePhase = newPhase;
        visibleLines = 0;
        
        // 淡入效果
        setTimeout(() => {
            welcomeContainer.classList.add('fade-in');
            
            // 开始显示新阶段的文本
            setTimeout(showNextLine, 500);
        }, 100);
    }, 1000);
}

// 显示继续按钮，可自定义按钮文字
function showContinueButton(buttonText = '继续探索') {
    continueButton.textContent = buttonText;
    continueButton.style.display = 'block';
    setTimeout(() => {
        continueButton.style.opacity = '1';
    }, 100);
}

// 处理继续按钮点击
function handleContinueButtonClick() {
    // 隐藏按钮
    continueButton.style.opacity = '0';
    setTimeout(() => {
        continueButton.style.display = 'none';
    }, 300);
    
    // 根据当前阶段和显示行数决定下一步操作
    if (welcomePhase === 'opening' && visibleLines >= openingLines.length) {
        transitionToWelcomePhase('transition');
    } else if (welcomePhase === 'transition' && visibleLines === 4) {
        // 在"因你的诞生而被我们特别铭记"之后显示第二部分
        transitionToWelcomePhase('transition2');
    } else if (welcomePhase === 'transition2' && visibleLines >= transitionLines2.length) {
        // 第二部分结束后进入结语
        transitionToWelcomePhase('closing');
    } else if (welcomePhase === 'closing' && visibleLines >= closingLines.length) {
        // 显示ASCII艺术生日祝福
        showASCIIBirthdayArt();
    } else {
        setTimeout(showNextLine, 500);
    }
}

// 显示ASCII艺术生日祝福
function showASCIIBirthdayArt() {
    // 背景色变化
    welcomeContainer.style.backgroundColor = '#001a00';
    
    // 添加更多的音符和闪烁效果
    for (let i = 0; i < 30; i++) {
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = '♪';
        
        const size = 6 + Math.random() * 12;
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 10;
        const delay = Math.random() * 5;
        
        note.style.fontSize = `${size}px`;
        note.style.left = `${left}%`;
        note.style.top = '-20px';
        note.style.opacity = '0.6';
        note.style.animation = `floating ${duration}s linear ${delay}s infinite`;
        
        noteContainer.appendChild(note);
    }
    
    // 清空文本容器
    textContainer.innerHTML = '';
    
    // 创建ASCII艺术容器
    const asciiContainer = document.createElement('pre');
    asciiContainer.className = 'ascii-art';
    asciiContainer.textContent = asciiHappyBirthday;
    textContainer.appendChild(asciiContainer);
    
    // 触发显示动画
    setTimeout(() => {
        asciiContainer.classList.add('show');
        
        // 显示继续按钮
        setTimeout(() => {
            showContinueButton('开始时光之旅');
            continueButton.onclick = function() {
                startJourney();
            };
        }, 2000);
    }, 500);
}

// 开始旅程
function startJourney() {
    // 隐藏欢迎部分
    welcomeContainer.style.opacity = '0';
    welcomeContainer.style.pointerEvents = 'none';
    
    // 显示导航控制
    navigationControls.classList.add('visible');
    
    // 导航到第一个部分
    navigateToSection('memories');
}

// ---- 新添加的部分 ----

const memoryData = [
    { year: 2006, image: '/api/placeholder/300/200', description: '在2006年的春天，你降临到这个世界，给家人带来了无比的喜悦。' },
    { year: 2012, image: '/api/placeholder/300/200', description: '小学时期，Lv.7' },
    { year: 2018, image: '/api/placeholder/300/200', description: '初中生活开始，你开始展现出自己的才华和独特个性。' },
    { year: 2020, image: '/api/placeholder/300/200', description: '高中岁月，既有令你怀念的友情和爱情，也有记恨的人和事吧' },
    { year: 2023, image: '/api/placeholder/300/200', description: '进入清复北交之一。' },
    { year: 2024, image: '/api/placeholder/300/200', description: '18岁成人礼，或许是悲伤的回忆' },
    { year: 2025, image: '/api/placeholder/300/200', description: '19岁生日，愿你在将来的旅途中收获知识、友谊与成长。' }
];

// 祝福墙数据
const wishesData = [
    { name: '爸爸', avatar: '/api/placeholder/40/40', content: '这是一句令尊的祝福', date: '2025-03-28' },
    { name: '妈妈', avatar: '/api/placeholder/40/40', content: '这是一句令堂的祝福', date: '2025-03-28' },
    { name: '哥哥', avatar: '/api/placeholder/40/40', content: 'PS：祝福墙实在没法填，QAQ', date: '2025-03-28' },
    { name: '物理老师', avatar: '/api/placeholder/40/40', content: '老师的祝福', date: '2025-03-28' },
    { name: '鱼鱼', avatar: '/api/placeholder/40/40', content: '生日快乐，不🐟🐟！', date: '2025-03-28' },

];

// 词云数据
const wordCloudData = [
    { text: '勇敢', size: 48, x: 25, y: 30 },
    { text: '聪明', size: 56, x: 65, y: 40 },
    { text: '温柔', size: 40, x: 45, y: 20 },
    { text: '善良', size: 52, x: 80, y: 60 },
    { text: '乐观', size: 44, x: 35, y: 70 },
    { text: '才华', size: 50, x: 75, y: 50 },
    { text: '真诚', size: 38, x: 50, y: 85 },
    { text: '热情', size: 46, x: 20, y: 55 },
    { text: '坚持', size: 42, x: 60, y: 75 },
    { text: '梦想', size: 54, x: 30, y: 45 },
    { text: '创造力', size: 48, x: 70, y: 25 },
    { text: '独立', size: 40, x: 40, y: 65 },
    { text: '青春', size: 52, x: 85, y: 35 },
    { text: '专注', size: 44, x: 55, y: 90 },
    { text: '好奇心', size: 50, x: 15, y: 80 },
    { text: '十九岁', size: 60, x: 50, y: 50 },
    { text: '大学生活', size: 46, x: 25, y: 60 },
    { text: '生日快乐', size: 58, x: 75, y: 45 }
];

// 初始化特殊记忆展示
function initializeMemories() {
    const memoryItemsContainer = document.getElementById('memory-items');
    memoryItemsContainer.innerHTML = '';
    
    memoryData.forEach((memory, index) => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        memoryItem.dataset.index = index;
        
        memoryItem.innerHTML = `
            <div class="memory-image" style="background-image: url(${memory.image})"></div>
            <div class="memory-details">
                <div class="memory-year">${memory.year}</div>
                <div class="memory-description">${memory.description}</div>
            </div>
        `;
        
        memoryItemsContainer.appendChild(memoryItem);
    });
    
    // 显示第一个记忆
    showMemoryAtIndex(0);
}

// 显示指定索引的记忆
let currentMemoryIndex = 0;
function showMemoryAtIndex(index) {
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach((item, i) => {
        item.classList.remove('active', 'prev', 'next');
        if (i === index) {
            item.classList.add('active');
        } else if (i === index - 1 || (index === 0 && i === memoryItems.length - 1)) {
            item.classList.add('prev');
        } else if (i === index + 1 || (index === memoryItems.length - 1 && i === 0)) {
            item.classList.add('next');
        }
    });
    currentMemoryIndex = index;
    
    // 更新导航按钮文本
    updateNavigationButtons();
}

// 初始化祝福墙
function initializeWishesWall() {
    const wishesContainer = document.getElementById('wishes-container');
    wishesContainer.innerHTML = '';
    
    wishesData.forEach((wish, index) => {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.style.setProperty('--rotation', `${(Math.random() * 10 - 5)}deg`);
        wishCard.style.animationDelay = `${index * 0.1}s`;
        
        // 随机背景颜色
        const hue = Math.floor(Math.random() * 40) + 340; // 红粉色系
        const saturation = Math.floor(Math.random() * 30) + 70; // 比较饱和
        const lightness = Math.floor(Math.random() * 10) + 90; // 很亮
        wishCard.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        wishCard.innerHTML = `
            <div class="wish-header">
                <div class="wish-avatar" style="background-image: url(${wish.avatar})"></div>
                <div class="wish-name">${wish.name}</div>
            </div>
            <div class="wish-content">${wish.content}</div>
            <div class="wish-date">${wish.date}</div>
            <div class="wish-decoration">♥</div>
        `;
        
        wishesContainer.appendChild(wishCard);
    });
}

// 生成词云
function generateWordCloud() {
    wordCloud.innerHTML = '';
    
    wordCloudData.forEach(word => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.textContent = word.text;
        wordItem.style.fontSize = `${word.size}px`;
        wordItem.style.left = `${word.x}%`;
        wordItem.style.top = `${word.y}%`;
        
        // 随机颜色
        const hue = Math.floor(Math.random() * 360);
        wordItem.style.color = `hsl(${hue}, 80%, 70%)`;
        
        // 随机旋转
        const rotation = Math.random() * 20 - 10;
        wordItem.style.transform = `rotate(${rotation}deg)`;
        
        // 随机动画
        const animDuration = 2 + Math.random() * 5;
        wordItem.style.animation = `float ${animDuration}s ease-in-out infinite alternate`;
        
        wordCloud.appendChild(wordItem);
    });
}

// 初始化生日蛋糕
function initializeBirthdayCake() {
    const candlesContainer = document.getElementById('candles-container');
    candlesContainer.innerHTML = '';
    
    // 创建19根蜡烛
    for (let i = 0; i < 19; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.addEventListener('click', function() {
            blowOutCandle(this);
        });
        candlesContainer.appendChild(candle);
    }
}

// 吹灭蜡烛
let blownCandles = 0;
function blowOutCandle(candle) {
    if (!candle.classList.contains('blown')) {
        candle.classList.add('blown');
        blownCandles++;
        
        // 创建一些礼花
        createConfetti(50);
        
        // 检查是否所有蜡烛都被吹灭
        if (blownCandles === 19) {
            // 全部吹灭，显示特殊效果
            setTimeout(() => {
                createConfetti(200);
                document.querySelector('.cake-message').textContent = '生日愿望已送达，生日快乐！';
                
                // 如果有背景音乐，可以在这里播放生日歌
                if (!bgMusic.paused) {
                    // 切换到生日歌
                    // bgMusic.src = 'path/to/birthday-song.mp3';
                    // bgMusic.play();
                }
            }, 500);
        }
    }
}

// 创建礼花
function createConfetti(count) {
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // 随机大小
        const size = 5 + Math.random() * 10;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // 随机颜色
        const hue = Math.floor(Math.random() * 360);
        confetti.style.backgroundColor = `hsl(${hue}, 90%, 60%)`;
        
        // 随机位置
        const left = Math.random() * 100;
        confetti.style.left = `${left}%`;
        confetti.style.top = '50%';
        
        // 随机角度和延迟
        const angle = Math.random() * 360;
        const distance = Math.random() * 100 + 50;
        const delay = Math.random() * 0.5;
        confetti.style.transform = `rotate(${angle}deg)`;
        confetti.style.animationDelay = `${delay}s`;
        
        document.body.appendChild(confetti);
        
        // 动画结束后移除
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// 导航到指定部分
function navigateToSection(section) {
    // 隐藏当前部分
    hideCurrentSection();
    
    // 显示新部分
    currentSection = section;
    showCurrentSection();
    
    // 更新导航按钮
    updateNavigationButtons();
}

// 隐藏当前部分
function hideCurrentSection() {
    switch (currentSection) {
        case 'welcome':
            welcomeContainer.style.opacity = '0';
            welcomeContainer.style.pointerEvents = 'none';
            break;
        case 'memories':
            memoriesContainer.classList.remove('visible');
            break;
        case 'wishes':
            wishesWall.classList.remove('visible');
            break;
        case 'wordcloud':
            wordCloud.classList.remove('visible');
            break;
        case 'cake':
            birthdayCake.classList.remove('visible');
            break;
    }
}

// 显示当前部分
function showCurrentSection() {
    switch (currentSection) {
        case 'welcome':
            welcomeContainer.style.opacity = '1';
            welcomeContainer.style.pointerEvents = 'all';
            break;
        case 'memories':
            memoriesContainer.classList.add('visible');
            break;
        case 'wishes':
            wishesWall.classList.add('visible');
            break;
        case 'wordcloud':
            wordCloud.classList.add('visible');
            break;
        case 'cake':
            birthdayCake.classList.add('visible');
            break;
    }
}

// 更新导航按钮文本
function updateNavigationButtons() {
    switch (currentSection) {
        case 'memories':
            prevButton.textContent = '返回欢迎页';
            nextButton.textContent = '查看祝福墙';
            break;
        case 'wishes':
            prevButton.textContent = '珍贵记忆';
            nextButton.textContent = '词云';
            break;
        case 'wordcloud':
            prevButton.textContent = '祝福墙';
            nextButton.textContent = '生日蛋糕';
            break;
        case 'cake':
            prevButton.textContent = '词云';
            nextButton.textContent = '重新开始';
            break;
    }
    
    // 特殊情况：在记忆部分显示上一个/下一个记忆的按钮
    if (currentSection === 'memories') {
        if (memoryData.length > 1) {
            if (currentMemoryIndex > 0) {
                prevButton.textContent = '上一个记忆';
            }
            if (currentMemoryIndex < memoryData.length - 1) {
                nextButton.textContent = '下一个记忆';
            }
        }
    }
}

// 导航到前一部分
function navigateToPrevSection() {
    if (currentSection === 'memories') {
        if (currentMemoryIndex > 0) {
            // 导航到上一个记忆
            showMemoryAtIndex(currentMemoryIndex - 1);
            return;
        } else {
            // 返回欢迎页
            navigateToSection('welcome');
        }
    } else if (currentSection === 'wishes') {
        navigateToSection('memories');
    } else if (currentSection === 'wordcloud') {
        navigateToSection('wishes');
    } else if (currentSection === 'cake') {
        navigateToSection('wordcloud');
    }
}

// 导航到下一部分
function navigateToNextSection() {
    if (currentSection === 'memories') {
        if (currentMemoryIndex < memoryData.length - 1) {
            // 导航到下一个记忆
            showMemoryAtIndex(currentMemoryIndex + 1);
            return;
        } else {
            // 进入祝福墙
            navigateToSection('wishes');
        }
    } else if (currentSection === 'wishes') {
        navigateToSection('wordcloud');
    } else if (currentSection === 'wordcloud') {
        navigateToSection('cake');
    } else if (currentSection === 'cake') {
        // 重新开始整个旅程
        blownCandles = 0;
        currentMemoryIndex = 0;
        navigateToSection('welcome');
        initializeBirthdayCake();
    }
}

// 音乐控制
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play()
            .then(() => {
                musicToggle.classList.add('playing');
                musicToggle.classList.remove('muted');
            })
            .catch(error => {
                console.error('播放音乐失败:', error);
            });
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.classList.add('muted');
    }
}

// 初始化欢迎动画
document.addEventListener('DOMContentLoaded', initializeWelcome);