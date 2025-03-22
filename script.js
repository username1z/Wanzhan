// 植物激素详细信息数据
const hormoneData = {
    auxin: {
        name: '生长素',
        details: `
            <h3>主要功能：</h3>
            <ul>
                <li>促进细胞伸长生长</li>
                <li>诱导根系发育</li>
                <li>控制顶端优势</li>
                <li>促进果实发育</li>
            </ul>
            <h3>应用场景：</h3>
            <ul>
                <li>扦插繁殖</li>
                <li>无籽果实栽培</li>
                <li>除草剂研制</li>
            </ul>
        `
    },
    cytokinin: {
        name: '细胞分裂素',
        details: `
            <h3>主要功能：</h3>
            <ul>
                <li>促进细胞分裂</li>
                <li>促进叶绿体发育</li>
                <li>延缓衰老</li>
                <li>打破休眠</li>
            </ul>
            <h3>应用场景：</h3>
            <ul>
                <li>组织培养</li>
                <li>保鲜储藏</li>
                <li>促进开花</li>
            </ul>
        `
    },
    gibberellin: {
        name: '赤霉素',
        details: `
            <h3>主要功能：</h3>
            <ul>
                <li>促进茎秆伸长</li>
                <li>打破种子休眠</li>
                <li>促进果实发育</li>
                <li>诱导开花</li>
            </ul>
            <h3>应用场景：</h3>
            <ul>
                <li>无籽葡萄栽培</li>
                <li>促进种子萌发</li>
                <li>调节开花时间</li>
            </ul>
        `
    },
    abscisic: {
        name: '脱落酸',
        details: `
            <h3>主要功能：</h3>
            <ul>
                <li>诱导种子休眠</li>
                <li>提高抗逆性</li>
                <li>促进器官脱落</li>
                <li>调节气孔开闭</li>
            </ul>
            <h3>应用场景：</h3>
            <ul>
                <li>提高作物抗旱性</li>
                <li>调控果实采收期</li>
                <li>延长种子储藏期</li>
            </ul>
        `
    }
};

// 获取所有模态框元素
const modal = document.getElementById('details-modal');
const quizModal = document.getElementById('quiz-modal');
const modalContent = document.getElementById('hormone-details');

// 获取所有关闭按钮
const closeButtons = document.getElementsByClassName('close');

// 为每个关闭按钮添加点击事件
Array.from(closeButtons).forEach(btn => {
    btn.onclick = function() {
        // 获取当前按钮所在的模态框
        const currentModal = this.closest('.modal');
        if (currentModal.id === 'quiz-modal') {
            closeQuiz();
        } else {
            currentModal.style.display = 'none';
        }
    }
});

// 点击模态框外部关闭
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        if (event.target.id === 'quiz-modal') {
            closeQuiz();
        } else {
            event.target.style.display = 'none';
        }
    }
}

// 显示详细信息
function showDetails(hormone) {
    const data = hormoneData[hormone];
    modalContent.innerHTML = `
        <h2>${data.name}</h2>
        ${data.details}
    `;
    modal.style.display = 'block';
}

// 知识测试题库
const quizQuestions = [
    {
        question: "生长素的主要作用是什么？",
        options: [
            "促进细胞伸长生长和根系发育",
            "促进种子萌发",
            "抑制叶片生长",
            "促进果实脱落"
        ],
        correct: 0,
        explanation: "生长素主要促进细胞伸长生长，并且在根系发育中起重要作用。"
    },
    {
        question: "脱落酸在植物抗逆境中的作用是什么？",
        options: [
            "促进生长",
            "提高抗逆性",
            "促进开花",
            "促进果实成熟"
        ],
        correct: 1,
        explanation: "脱落酸能够提高植物的抗旱、耐寒等抗逆性能力。"
    },
    {
        question: "细胞分裂素的主要功能不包括：",
        options: [
            "促进细胞分裂",
            "延缓衰老",
            "诱导休眠",
            "促进叶绿体发育"
        ],
        correct: 2,
        explanation: "诱导休眠是脱落酸的功能，而不是细胞分裂素的作用。"
    },
    {
        question: "植物向光性主要与哪种激素有关？",
        options: [
            "脱落酸",
            "生长素",
            "细胞分裂素",
            "乙烯"
        ],
        correct: 1,
        explanation: "生长素在植物向光性反应中起关键作用，它会在背光面积累，促进细胞伸长。"
    },
    {
        question: "以下哪项是脱落酸的主要功能？",
        options: [
            "促进茎秆伸长",
            "促进细胞分裂",
            "诱导种子休眠",
            "促进果实膨大"
        ],
        correct: 2,
        explanation: "脱落酸可以诱导种子进入休眠状态，这是其重要的生理功能之一。"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let answeredQuestions = new Set();

// 加载题目
function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('question-text').textContent = `第 ${currentQuestion + 1} 题：${question.question}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });

    // 更新进度
    document.getElementById('progress').textContent = `${currentQuestion + 1}/${quizQuestions.length}`;
    
    // 如果这题已经回答过，恢复之前的选择
    if (answeredQuestions.has(currentQuestion)) {
        const options = document.querySelectorAll('.option');
        options[selectedOption].classList.add('selected');
    } else {
        selectedOption = null;
    }
}

// 选择答案
function selectOption(index) {
    // 如果这题已经回答过，不允许重新选择
    if (answeredQuestions.has(currentQuestion)) {
        return;
    }

    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelectorAll('.option')[index].classList.add('selected');
    selectedOption = index;
}

// 检查答案
function checkAnswer() {
    if (selectedOption === null) {
        alert('请选择一个答案！');
        return;
    }

    // 如果这题已经回答过，不要重复计分
    if (answeredQuestions.has(currentQuestion)) {
        alert('这道题您已经回答过了，请点击"下一题"继续。');
        return;
    }

    const question = quizQuestions[currentQuestion];
    const correct = question.correct === selectedOption;
    
    // 标记这题已经回答
    answeredQuestions.add(currentQuestion);

    if (correct) {
        score += 20; // 每题20分
        document.getElementById('score').textContent = score;
        showFeedback(true, question.explanation);
    } else {
        showFeedback(false, question.explanation);
    }

    // 显示正确答案
    const options = document.querySelectorAll('.option');
    options[selectedOption].classList.add(correct ? 'correct' : 'wrong');
    options[question.correct].classList.add('correct');
}

// 显示答题反馈
function showFeedback(isCorrect, explanation) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
    feedback.innerHTML = `
        <h3>${isCorrect ? '回答正确！' : '回答错误！'}</h3>
        <p>${explanation}</p>
    `;
    
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    document.querySelector('.quiz-question').appendChild(feedback);
}

// 下一题
function nextQuestion() {
    // 移除反馈信息
    const feedback = document.querySelector('.feedback');
    if (feedback) {
        feedback.remove();
    }

    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        // 所有题目都答完了
        showFinalScore();
    }
}

// 显示最终得分
function showFinalScore() {
    const totalQuestions = quizQuestions.length;
    const maxScore = totalQuestions * 20;
    const percentage = (score / maxScore) * 100;
    const correctCount = score / 20; // 计算答对题目数
    
    let evaluation = '';
    let tips = '';
    
    if (percentage >= 90) {
        evaluation = '太棒了！你对植物激素知识掌握得非常好！';
        tips = '继续保持，你已经是植物激素专家了！';
    } else if (percentage >= 70) {
        evaluation = '不错！你对植物激素有很好的理解！';
        tips = '再接再厉，争取下次达到更好的成绩！';
    } else if (percentage >= 60) {
        evaluation = '及格了！但还需要多多学习哦！';
        tips = '建议重点复习错题，巩固相关知识点。';
    } else {
        evaluation = '需要继续努力！';
        tips = '建议重新学习相关知识，特别是植物激素的主要功能和应用场景。';
    }

    const resultMessage = `
测试完成！

得分统计：
总分：${score}分（满分：${maxScore}分）
正确率：${percentage.toFixed(1)}%
答对题数：${correctCount}题（共${totalQuestions}题）

${evaluation}
${tips}

是否要查看错题解析？`;

    if (confirm(resultMessage)) {
        showWrongAnswers();
    } else if (confirm('是否要重新开始测试？')) {
        resetQuiz();
    }
}

// 显示错题解析
function showWrongAnswers() {
    let wrongAnswers = '';
    quizQuestions.forEach((question, index) => {
        if (answeredQuestions.has(index) && !isCorrectAnswer(index)) {
            wrongAnswers += `
第 ${index + 1} 题：${question.question}
正确答案：${question.options[question.correct]}
解析：${question.explanation}

`;
        }
    });
    
    if (wrongAnswers) {
        alert(`错题解析：\n${wrongAnswers}`);
    } else {
        alert('恭喜你全部回答正确！');
    }
}

// 检查某题是否回答正确
function isCorrectAnswer(questionIndex) {
    const question = quizQuestions[questionIndex];
    const options = document.querySelectorAll('.option');
    return options[questionIndex].classList.contains('correct');
}

// 重置测试
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    answeredQuestions.clear();
    document.getElementById('score').textContent = '0';
    loadQuestion();
}

// 页面加载完成后初始化测试
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});

// 测试相关功能
function startQuiz() {
    // 重置测试状态
    resetQuiz();
    // 显示测试弹窗
    quizModal.style.display = 'block';
}

function closeQuiz() {
    quizModal.style.display = 'none';
    // 询问是否保存进度
    if (score > 0 && !confirm('确定要退出测试吗？当前进度将不会保存。')) {
        quizModal.style.display = 'block';
    } else {
        resetQuiz();
    }
}

function startSimulation() {
    const auxinLevel = document.getElementById('auxin-level').value;
    const gibberellinLevel = document.getElementById('gibberellin-level').value;
    const environment = document.getElementById('environment').value;

    // 模拟实验逻辑
    const plantHeight = calculatePlantHeight(auxinLevel, gibberellinLevel, environment);
    const rootLength = calculateRootLength(auxinLevel, gibberellinLevel, environment);
    const growthDays = 30; // 假设模拟30天

    // 更新显示结果
    document.getElementById('plant-height').textContent = plantHeight;
    document.getElementById('root-length').textContent = rootLength;
    document.getElementById('growth-days').textContent = growthDays;

    alert('模拟实验完成！');
}

// 计算植物高度的函数
function calculatePlantHeight(auxin, gibberellin, environment) {
    let height = parseInt(auxin) * 0.1 + parseInt(gibberellin) * 0.2;
    if (environment === 'dark') {
        height *= 0.8; // 黑暗环境下生长较慢
    }
    return height.toFixed(2);
}

// 计算根系长度的函数
function calculateRootLength(auxin, gibberellin, environment) {
    let length = parseInt(auxin) * 0.15 + parseInt(gibberellin) * 0.1;
    if (environment === 'water') {
        length *= 1.2; // 水培环境下根系生长较快
    }
    return length.toFixed(2);
}

// AI助手相关功能
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// 扩展知识库
const knowledgeBase = {
    '生长素': {
        '功能': [
            '促进细胞伸长生长',
            '诱导根系发育',
            '控制顶端优势',
            '促进果实发育'
        ],
        '应用': [
            '扦插繁殖',
            '无籽果实栽培',
            '除草剂研制'
        ],
        '特点': [
            '在植物体内从上到下运输',
            '具有极性运输特征',
            '低浓度促进生长，高浓度抑制生长'
        ],
        '实验现象': [
            '向光性实验中背光面生长素含量高',
            '生长素处理的插条生根率提高',
            '喷施生长素后果实膨大速度加快'
        ],
        '相关问题': [
            '为什么植物会向光生长？',
            '如何提高扦插成活率？',
            '生长素浓度过高会有什么影响？'
        ],
        '原理解释': {
            '向光性': '当光照射到植物时，生长素会在背光面积累，导致背光面细胞伸长速度快于向光面，使茎弯向光源。',
            '扦插': '生长素能促进插条基部形成不定根，提高生根率。使用方法是将插条基部浸泡在生长素溶液中。',
            '果实发育': '生长素可以刺激果实细胞分裂和膨大，促进果实发育。无籽果实栽培就是利用这一原理。'
        }
    },
    '细胞分裂素': {
        '功能': [
            '促进细胞分裂',
            '促进叶绿体发育',
            '延缓衰老',
            '打破休眠'
        ],
        '应用': [
            '组织培养',
            '保鲜储藏',
            '促进开花'
        ],
        '特点': [
            '主要在根尖合成',
            '可以促进细胞分裂和分化',
            '与生长素配比影响器官发生'
        ],
        '实验现象': [
            '组织培养中添加细胞分裂素可诱导不定芽形成',
            '处理后的叶片保持绿色时间延长',
            '与生长素配合使用可诱导愈伤组织形成'
        ],
        '相关问题': [
            '如何延长蔬菜保鲜时间？',
            '为什么要在培养基中添加细胞分裂素？',
            '细胞分裂素和生长素的比例如何影响植物生长？'
        ],
        '原理解释': {
            '组织培养': '细胞分裂素通过促进细胞分裂和分化，诱导不定芽形成。不同的激素比例可以诱导不同的分化方向。',
            '保鲜': '细胞分裂素可以延缓叶绿素的分解，维持叶片的绿色，从而延长保鲜时间。',
            '开花': '细胞分裂素可以打破休眠，促进花芽分化，加速开花。'
        }
    },
    '赤霉素': {
        '功能': [
            '促进茎秆伸长',
            '打破种子休眠',
            '促进果实发育',
            '诱导开花'
        ],
        '应用': [
            '无籽葡萄栽培',
            '促进种子萌发',
            '调节开花时间'
        ],
        '特点': [
            '能促进细胞伸长和分裂',
            '可以代替低温春化作用',
            '对某些矮秆作物茎秆伸长有显著促进作用'
        ],
        '实验现象': [
            '处理矮牵牛后茎秆迅速伸长',
            '打破马铃薯块茎休眠',
            '促进葡萄果实膨大'
        ],
        '相关问题': [
            '为什么赤霉素能促进茎秆伸长？',
            '如何使用赤霉素打破种子休眠？',
            '赤霉素在果实发育中的作用是什么？'
        ],
        '原理解释': {
            '茎秆伸长': '赤霉素通过促进细胞伸长和分裂，特别是茎节间的伸长，导致植物茎秆迅速增高。',
            '休眠打破': '赤霉素可以代替低温春化作用，激活种子中的水解酶，促进种子萌发。',
            '果实发育': '赤霉素促进细胞分裂和伸长，增加果实大小，在无籽果实栽培中应用广泛。'
        }
    },
    '脱落酸': {
        '功能': [
            '诱导种子休眠',
            '提高抗逆性',
            '促进器官脱落',
            '调节气孔开闭'
        ],
        '应用': [
            '提高作物抗旱性',
            '调控果实采收期',
            '延长种子储藏期'
        ],
        '特点': [
            '是一种抑制性激素',
            '在逆境胁迫下含量升高',
            '与其他激素互为拮抗'
        ],
        '实验现象': [
            '干旱胁迫下植物体内脱落酸含量升高',
            '处理后气孔关闭，蒸腾作用减弱',
            '促进衰老器官脱落'
        ],
        '相关问题': [
            '脱落酸如何提高植物抗逆性？',
            '为什么逆境条件下脱落酸含量升高？',
            '脱落酸在气孔运动中的作用机制是什么？'
        ],
        '原理解释': {
            '抗逆性': '脱落酸通过诱导气孔关闭、促进渗透调节物质合成等方式提高植物抗逆性。',
            '休眠': '脱落酸抑制种子中水解酶的活性，维持休眠状态，有利于种子储藏。',
            '脱落': '脱落酸促进离层形成，加速衰老器官的脱落过程。'
        }
    }
};

// 对话上下文管理
let conversationContext = {
    lastTopic: null,
    questionCount: 0,
    userInterests: new Set(),
    learningProgress: {},
    lastQuestion: null
};

// 发送消息
function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // 添加用户消息
    addMessage(message, 'user');
    userInput.value = '';
    
    // 生成并添加回复
    const response = generateResponse(message);
    addMessage(response, 'bot');
    
    // 自动滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 添加消息到聊天界面
function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    // 添加头像
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = sender === 'user' ? '👤' : '🤖';
    messageDiv.appendChild(avatar);
    
    // 添加消息内容
    const content = document.createElement('div');
    content.className = 'content';
    content.innerHTML = message;
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
}

// 生成回复
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // 更新上下文
    conversationContext.questionCount++;
    conversationContext.lastQuestion = message;
    
    // 处理问候语
    if (isGreeting(lowerMessage)) {
        return generateGreeting();
    }
    
    // 处理感谢语
    if (isThankYou(lowerMessage)) {
        return generateThankYouResponse();
    }
    
    // 识别问题类型和提到的激素
    const questionType = identifyQuestionType(lowerMessage);
    const mentionedHormones = findMentionedHormones(lowerMessage);
    
    // 根据上下文和问题类型生成回答
    let response = '';
    
    if (mentionedHormones.length > 0) {
        response = generateHormoneResponse(mentionedHormones[0], questionType, message);
        conversationContext.lastTopic = mentionedHormones[0];
    } else if (questionType === 'general') {
        response = generateGeneralResponse(message);
    } else if (conversationContext.lastTopic) {
        response = generateFollowUpResponse(conversationContext.lastTopic, questionType, message);
    } else {
        response = generateDefaultResponse();
    }
    
    // 添加学习建议
    if (conversationContext.questionCount % 3 === 0) {
        response += generateLearningTip();
    }
    
    return response;
}

// 识别提到的激素
function findMentionedHormones(message) {
    const hormones = [];
    for (const hormone in knowledgeBase) {
        if (message.includes(hormone)) {
            hormones.push(hormone);
        }
    }
    return hormones;
}

// 生成一般性回答
function generateGeneralResponse(message) {
    if (message.includes('植物激素')) {
        return `植物激素是调节植物生长发育的重要物质，主要包括：
        <ul>
            <li>生长素：促进生长和发育</li>
            <li>细胞分裂素：促进细胞分裂</li>
            <li>赤霉素：促进茎秆伸长</li>
            <li>脱落酸：调节逆境响应</li>
        </ul>
        你想了解哪种激素的具体作用呢？`;
    }
    
    return '你可以问我关于生长素、细胞分裂素、赤霉素、脱落酸等植物激素的问题。比如它们的功能、应用、特点等。';
}

// 生成默认回答
function generateDefaultResponse() {
    return `我是植物激素AI助手，可以回答你关于以下方面的问题：
    <ul>
        <li>各种植物激素的功能和作用</li>
        <li>植物激素的应用场景</li>
        <li>实验现象和原理解释</li>
        <li>相关问题解答</li>
    </ul>
    请问你想了解哪方面的内容呢？`;
}

// 生成后续回答
function generateFollowUpResponse(hormone, questionType, message) {
    const hormoneData = knowledgeBase[hormone];
    
    if (message.includes('原理') || message.includes('为什么')) {
        const principles = hormoneData.原理解释;
        let response = `关于${hormone}的原理解释：\n<ul>`;
        for (const [key, value] of Object.entries(principles)) {
            response += `<li><b>${key}：</b>${value}</li>`;
        }
        response += '</ul>';
        return response;
    }
    
    return generateHormoneResponse(hormone, questionType, message);
}

// 添加回车发送功能
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 初始化欢迎消息
window.addEventListener('DOMContentLoaded', () => {
    addMessage(generateGreeting(), 'bot');
});

// 绘制细胞分裂素效果（根尖分生和细胞生长）
function drawCytokininEffect(time, params, level) {
    // 绘制主根
    const rootLength = 150;
    animationCtx.beginPath();
    animationCtx.strokeStyle = '#8B4513';
    animationCtx.lineWidth = 3;
    animationCtx.moveTo(0, 0);
    animationCtx.lineTo(0, rootLength);
    animationCtx.stroke();
    
    // 绘制根尖分生区域（放大视图）
    const magnifierRadius = 40;
    const magnifierX = 80;
    const magnifierY = rootLength - 20;
    
    // 绘制连接线
    animationCtx.beginPath();
    animationCtx.strokeStyle = '#666';
    animationCtx.setLineDash([2, 2]);
    animationCtx.moveTo(0, rootLength - 10);
    animationCtx.lineTo(magnifierX - magnifierRadius, magnifierY);
    animationCtx.stroke();
    animationCtx.setLineDash([]);
    
    // 绘制放大镜边框
    animationCtx.beginPath();
    animationCtx.strokeStyle = '#333';
    animationCtx.lineWidth = 2;
    animationCtx.arc(magnifierX, magnifierY, magnifierRadius, 0, Math.PI * 2);
    animationCtx.stroke();
    
    // 绘制细胞分裂和生长动画
    const cellCount = 6;
    const cellSize = 10;
    const cellSpacing = 12;
    const divisionProgress = (Math.sin(time * 2) + 1) / 2; // 0-1循环
    
    for (let i = 0; i < cellCount; i++) {
        for (let j = 0; j < cellCount; j++) {
            const x = magnifierX + (i - cellCount/2) * cellSpacing;
            const y = magnifierY + (j - cellCount/2) * cellSpacing;
            
            // 计算每个细胞的分裂阶段
            const cellPhase = (time + i * 0.2 + j * 0.3) % (Math.PI * 2);
            const cellProgress = (Math.sin(cellPhase) + 1) / 2;
            
            // 细胞分裂动画
            if (cellProgress < 0.5 && level > 0.5) {
                // 分裂前的细胞
                drawCell(x, y, cellSize * (1 + cellProgress * 0.3), '#90CAF9', time);
                
                // 染色体分离效果
                const chromosomeOffset = cellProgress * 4;
                drawChromosome(x - chromosomeOffset, y, '#1565C0');
                drawChromosome(x + chromosomeOffset, y, '#1565C0');
            } else {
                // 分裂后的两个子细胞
                const splitOffset = Math.min(cellSpacing/2, cellProgress * cellSpacing);
                drawCell(x - splitOffset/2, y, cellSize, '#90CAF9', time);
                drawCell(x + splitOffset/2, y, cellSize, '#90CAF9', time);
            }
        }
    }
    
    // 绘制生长区域细胞（主根上）
    const growthCells = 5;
    for (let i = 0; i < growthCells; i++) {
        const y = rootLength - 40 - i * 15;
        const growthPhase = (time + i * 0.5) % (Math.PI * 2);
        const cellGrowth = (Math.sin(growthPhase) + 1) / 2 * level;
        
        // 左侧细胞
        drawCell(-10, y, 8 + cellGrowth * 4, '#A5D6A7', time);
        // 右侧细胞
        drawCell(10, y, 8 + cellGrowth * 4, '#A5D6A7', time);
    }
}

// 辅助函数：绘制单个细胞
function drawCell(x, y, size, color, time) {
    // 细胞膜
    animationCtx.beginPath();
    animationCtx.fillStyle = color;
    animationCtx.strokeStyle = '#666';
    animationCtx.lineWidth = 1;
    
    // 添加细微的形状变化
    const deform = Math.sin(time * 3) * 0.2;
    animationCtx.ellipse(x, y, size * (1 + deform), size * (1 - deform), 0, 0, Math.PI * 2);
    animationCtx.fill();
    animationCtx.stroke();
    
    // 细胞核
    animationCtx.beginPath();
    animationCtx.fillStyle = '#1A237E';
    animationCtx.arc(x, y, size * 0.3, 0, Math.PI * 2);
    animationCtx.fill();
}

// 辅助函数：绘制染色体
function drawChromosome(x, y, color) {
    animationCtx.beginPath();
    animationCtx.strokeStyle = color;
    animationCtx.lineWidth = 2;
    
    // X形染色体
    const size = 4;
    animationCtx.moveTo(x - size, y - size);
    animationCtx.lineTo(x + size, y + size);
    animationCtx.moveTo(x - size, y + size);
    animationCtx.lineTo(x + size, y - size);
    animationCtx.stroke();
}

// 修改前：直接在HTML中写onclick
// 修改后：统一在JS中添加事件监听
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.dataset.section;
        switchSection(section);
    });
});

// 新增config.js
const HORMONES = {
    auxin: {
        video: 'videos/auxin.mp4',
        animationParams: { /* 动画参数 */ },
        details: '生长素的主要功能是...'
    },
    // 其他激素配置
};

// 修改切换section的函数
function switchSection(sectionId) {
    // 隐藏所有section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标section
    const targetSection = document.getElementById(sectionId);
    if(targetSection) {
        targetSection.classList.add('active');
    }
    
    // 更新按钮激活状态
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });
    
    // 如果切换到其他页面，隐藏视频
    if (sectionId !== 'info') {
        closeVideo();
    }
}

// 初始化时默认显示基础知识部分
document.addEventListener('DOMContentLoaded', () => {
    switchSection('info');
});

// 播放指定激素的视频片段
function playVideo(hormone, index) {
    // 显示视频容器
    const videoContainer = document.querySelector('.video-container');
    videoContainer.classList.remove('hidden');
    
    // 滚动到视频区域
    videoContainer.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });

    // 设置视频时间点
    const timestamp = videoTimestamps[hormone][index];
    video.currentTime = timestamp.time;
    
    // 添加或更新时间点指示器
    let timestampIndicator = document.querySelector('.video-timestamp');
    if (!timestampIndicator) {
        timestampIndicator = document.createElement('div');
        timestampIndicator.className = 'video-timestamp';
        document.querySelector('.video-wrapper').appendChild(timestampIndicator);
    }
    timestampIndicator.textContent = timestamp.title;
    
    // 播放视频
    video.play();
    
    // 3秒后隐藏时间点指示器
    setTimeout(() => {
        timestampIndicator.style.opacity = '0';
        setTimeout(() => timestampIndicator.remove(), 500);
    }, 3000);
}

// 视频结束时的处理
video.addEventListener('ended', () => {
    const timestampIndicator = document.querySelector('.video-timestamp');
    if (timestampIndicator) {
        timestampIndicator.remove();
    }
});

// 添加关闭视频的功能
function closeVideo() {
    const videoContainer = document.querySelector('.video-container');
    video.pause(); // 暂停视频播放
    videoContainer.classList.add('hidden'); // 隐藏视频容器
}

// 更新生长素浓度显示
function updateAuxinValue(value) {
    document.getElementById('auxin-value').textContent = value + '%';
}

// 更新赤霉素浓度显示
function updateGibberellinValue(value) {
    document.getElementById('gibberellin-value').textContent = value + '%';
}