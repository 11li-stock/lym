/**
 * 轮播图核心功能实现
 * 核心逻辑：通过控制索引切换.active类，实现幻灯片显隐 + 自动/手动切换
 */

// 全局变量 - 维护轮播图当前显示的索引（初始为0，对应第一张幻灯片）
let currentSlideIndex = 0;
// 获取所有轮播幻灯片元素（.carousel-slide是每张轮播图的容器类名）
const slides = document.querySelectorAll('.carousel-slide');
// 获取所有轮播指示器（小圆点）元素（.indicator是指示器类名）
const indicators = document.querySelectorAll('.indicator');
// 计算轮播图总数（用于后续索引边界判断）
const totalSlides = slides.length;

/**
 * 显示指定索引的幻灯片（核心函数）
 * @param {number} index - 要显示的幻灯片索引（从0开始）
 */
function showSlide(index) {
    // 1. 移除所有幻灯片的active类（先隐藏所有幻灯片）
    slides.forEach(slide => slide.classList.remove('active'));
    // 2. 移除所有指示器的active类（重置所有指示器高亮状态）
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // 3. 索引边界判断 - 实现循环轮播，避免索引越界报错
    // 若索引大于等于总数（如第6张后点下一张），重置为0（回到第一张）
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } 
    // 若索引小于0（如第一张点上一张），设为最后一张的索引
    else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } 
    // 索引有效时，更新当前索引为传入的index
    else {
        currentSlideIndex = index;
    }
    
    // 4. 为当前索引的幻灯片添加active类（显示该幻灯片）
    slides[currentSlideIndex].classList.add('active');
    // 5. 为当前索引的指示器添加active类（高亮对应小圆点）
    indicators[currentSlideIndex].classList.add('active');
}

/**
 * 切换上一张/下一张幻灯片（供切换按钮调用）
 * @param {number} direction - 切换方向：-1=上一张，1=下一张
 */
function changeSlide(direction) {
    // 调用核心函数，传入“当前索引 + 切换方向”实现相邻切换
    showSlide(currentSlideIndex + direction);
}

/**
 * 点击指示器跳转到指定幻灯片（供小圆点点击调用）
 * @param {number} index - 指示器的序号（从1开始，对应HTML中点击传参）
 */
function currentSlide(index) {
    // 转换为从0开始的索引（如点击第1个指示器，index=1 → 0，对应第一张幻灯片）
    showSlide(index - 1);
}

/**
 * 页面加载完成后初始化（确保DOM元素加载完毕再执行JS）
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1. 自动轮播功能 - 仅当存在轮播图时执行（避免无轮播图时报错）
    if (slides.length > 0) {
        // 设置定时器，每5000毫秒（5秒）调用一次changeSlide(1)，自动切换下一张
        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }
    
    // 2. 联系表单提交处理（非轮播功能，仅在联系页面生效）
    // 获取页面中的form表单元素
    const contactForm = document.querySelector('form');
    // 若存在表单元素，绑定提交事件
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止表单默认提交行为（避免页面刷新）
            alert('感谢您的留言！我们会尽快与您联系。'); // 提交成功提示
        });
    }
});