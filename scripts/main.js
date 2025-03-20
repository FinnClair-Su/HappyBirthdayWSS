// ==== 欢迎动画部分 ====

// 状态变量
let welcomePhase = 'opening';
let visibleLines = 0;

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
                startTimelineJourney();
            };
        }, 2000);
    }, 500);
}

// 开始时光之旅
function startTimelineJourney() {
    // 隐藏欢迎部分
    welcomeContainer.style.opacity = '0';
    welcomeContainer.style.pointerEvents = 'none';
    
    // 显示时间线控制
    document.getElementById('timeline-controls').style.display = 'block';
    
    // 初始化并显示时间线
    initializeTimeline();
}

// ==== 时间线部分 ====

// 状态变量
let timelinePhase = 'timeline'; // timeline, photos, wordcloud
let currentYear = 2006;
let timeoutId = null;
let isTransitioning = false;

// DOM元素
const timelineContainer = document.getElementById('timeline-container');
const yearDisplay = document.getElementById('year-display');
const yearDecoration = document.getElementById('year-decoration');
const photoWall = document.getElementById('photo-wall');
const wordCloud = document.getElementById('word-cloud');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const photoViewer = document.getElementById('photo-viewer');
const fullscreenImage = document.getElementById('fullscreen-image');

// 照片数据
const photoData = [
    { year: 2006, src: '/api/placeholder/200/150', caption: '2006 迎接新生命' },
    { year: 2011, src: '/api/placeholder/200/150', caption: '2011 童年记忆' },
    { year: 2014, src: '/api/placeholder/200/150', caption: '2014 青春起点' },
    { year: 2018, src: '/api/placeholder/200/150', caption: '2018 少年成长' },
    { year: 2020, src: '/api/placeholder/200/150', caption: '2020 疫情时期' },
    { year: 2023, src: '/api/placeholder/200/150', caption: '2023 大学录取' },
    { year: 2024, src: '/api/placeholder/200/150', caption: '2024 十八成人' },
    { year: 2025, src: '/api/placeholder/200/150', caption: '2025 未来已来' },
    { year: 2025, src: '/api/placeholder/200/150', caption: '2025 生日快乐' }
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

// 年份对应的设计风格
const yearStyles = {
    2006: 'style-2006',
    2007: 'style-2006',
    2008: 'style-2008',
    2009: 'style-2008',
    2010: 'style-2008',
    2011: 'style-2011',
    2012: 'style-2011',
    2013: 'style-2011',
    2014: 'style-2014',
    2015: 'style-2014',
    2016: 'style-2014',
    2017: 'style-2017',
    2018: 'style-2017',
    2019: 'style-2017',
    2020: 'style-2020',
    2021: 'style-2020',
    2022: 'style-2022',
    2023: 'style-2022',
    2024: 'style-2024',
    2025: 'style-2024'
};

// 年份特殊装饰/文字
const yearDecorations = {
    2006: '莫扎特250周年，你的生命开始了',
    2008: 'iPhone时代开始',
    2011: '你5岁了，童年记忆',
    2013: '你7岁了，小学正当时',
    2016: '你10岁了，懂事的年纪',
    2020: '14岁的你，经历了疫情',
    2022: '16岁，青春洋溢',
    2024: '18岁，成年啦！',
    2025: '19岁，愈发美丽'
};

// 初始化时间线
function initializeTimeline() {
    // 显示时间线容器
    timelineContainer.classList.add('visible');
    setTimeout(() => {
        yearDisplay.classList.add('visible');
        updateYearStyle();
        startYearSequence();
    }, 500);
    
    // 生成照片墙
    generatePhotoWall();
    
    // 生成词云
    generateWordCloud();
    
    // 添加按钮事件监听
    prevButton.addEventListener('click', handlePrevButton);
    nextButton.addEventListener('click', handleNextButton);
}

// 生成照片墙
function generatePhotoWall() {
    photoWall.innerHTML = '';
    photoData.forEach(photo => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        const image = document.createElement('div');
        image.className = 'photo-image';
        image.style.backgroundImage = `url(${photo.src})`;
        
        const caption = document.createElement('div');
        caption.className = 'photo-caption';
        caption.textContent = photo.caption;
        
        card.appendChild(image);
        card.appendChild(caption);
        
        // 添加点击事件
        card.addEventListener('click', () => {
            openPhotoViewer(photo.src);
        });
        
        photoWall.appendChild(card);
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

// 更新年份显示的样式
function updateYearStyle() {
    // 移除所有风格类
    Object.values(yearStyles).forEach(style => {
        timelineContainer.classList.remove(style);
    });
    
    // 添加当前年份的风格类
    timelineContainer.classList.add(yearStyles[currentYear]);
    
    // 更新年份显示
    yearDisplay.textContent = currentYear;
    
    // 更新装饰文字
    yearDecoration.textContent = yearDecorations[currentYear] || '';
}

// 开始年份序列
function startYearSequence() {
    const delay = getYearTransitionDelay();
    
    timeoutId = setTimeout(() => {
        if (currentYear < 2023) {
            transitionToNextYear();
        } else {
            // 2023及之后转到照片墙
            transitionToPhase('photos');
        }
    }, delay);
}

// 根据年份获取过渡延迟时间
function getYearTransitionDelay() {
    if (currentYear === 2006) return 3000; // 第一年停留久一点
    if (currentYear >= 2020) return 2000; // 近期年份停留久一点
    return 1000; // 中间年份快速切换
}

// 过渡到下一年
function transitionToNextYear() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // 淡出当前年份
    yearDisplay.classList.remove('visible');
    yearDisplay.classList.add('exit');
    
    setTimeout(() => {
        // 更新年份
        currentYear++;
        
        // 更新样式
        updateYearStyle();
        
        // 重置并淡入新年份
        yearDisplay.classList.remove('exit');
        void yearDisplay.offsetWidth; // 触发重排
        yearDisplay.classList.add('visible');
        
        isTransitioning = false;
        
        // 继续序列
        startYearSequence();
    }, 500);
}

// 过渡到前一年
function transitionToPrevYear() {
    if (isTransitioning || currentYear <= 2006) return;
    isTransitioning = true;
    
    clearTimeout(timeoutId);
    
    // 淡出当前年份
    yearDisplay.classList.remove('visible');
    yearDisplay.classList.add('exit');
    
    setTimeout(() => {
        // 更新年份
        currentYear--;
        
        // 更新样式
        updateYearStyle();
        
        // 重置并淡入新年份
        yearDisplay.classList.remove('exit');
        void yearDisplay.offsetWidth; // 触发重排
        yearDisplay.classList.add('visible');
        
        isTransitioning = false;
        
        // 继续序列
        startYearSequence();
    }, 500);
}

// 过渡到特定阶段
function transitionToPhase(phase) {
    if (phase === timelinePhase) return;
    
    clearTimeout(timeoutId);
    
    // 隐藏当前阶段
    if (timelinePhase === 'timeline') {
        timelineContainer.classList.remove('visible');
    } else if (timelinePhase === 'photos') {
        photoWall.classList.remove('visible');
    } else if (timelinePhase === 'wordcloud') {
        wordCloud.classList.remove('visible');
    }
    
    setTimeout(() => {
        // 显示新阶段
        if (phase === 'timeline') {
            timelineContainer.classList.add('visible');
            yearDisplay.classList.add('visible');
            updateYearStyle();
            startYearSequence();
        } else if (phase === 'photos') {
            photoWall.classList.add('visible');
        } else if (phase === 'wordcloud') {
            wordCloud.classList.add('visible');
        }
        
        // 更新当前阶段
        timelinePhase = phase;
        
        // 更新按钮文字
        updateButtonText();
    }, 1000);
}

// 更新按钮文字
function updateButtonText() {
    if (timelinePhase === 'timeline') {
        prevButton.textContent = '上一年';
        nextButton.textContent = '下一年';
    } else if (timelinePhase === 'photos') {
        prevButton.textContent = '返回时间线';
        nextButton.textContent = '查看祝福';
    } else if (timelinePhase === 'wordcloud') {
        prevButton.textContent = '查看照片';
        nextButton.textContent = '重新开始';
    }
}

// 处理上一个按钮点击
function handlePrevButton() {
    if (timelinePhase === 'timeline') {
        transitionToPrevYear();
    } else if (timelinePhase === 'photos') {
        currentYear = 2022; // 设置回时间线的年份
        transitionToPhase('timeline');
    } else if (timelinePhase === 'wordcloud') {
        transitionToPhase('photos');
    }
}

// 处理下一个按钮点击
function handleNextButton() {
    if (timelinePhase === 'timeline') {
        if (currentYear < 2022) {
            transitionToNextYear();
        } else {
            transitionToPhase('photos');
        }
    } else if (timelinePhase === 'photos') {
        transitionToPhase('wordcloud');
    } else if (timelinePhase === 'wordcloud') {
        // 重置并重新开始
        currentYear = 2006;
        transitionToPhase('timeline');
    }
}

// 打开照片查看器
function openPhotoViewer(src) {
    fullscreenImage.src = src;
    photoViewer.classList.add('visible');
}

// 关闭照片查看器
function closePhotoViewer() {
    photoViewer.classList.remove('visible');
    setTimeout(() => {
        fullscreenImage.src = '';
    }, 300);
}

// 初始化欢迎动画
document.addEventListener('DOMContentLoaded', initializeWelcome);