// js/script.js - النسخة المحدثة بدعم نظام اللغات
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة نظام اللغات أولاً
    initLanguageSystem();
    
    // ثم تهيئة باقي التأثيرات
    initFloatingShapes();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initIconAnimations();
    initSkillBars();
    initSocialMediaEffects();
    initHeaderSocialIcons();
    initAcademicProjects();
});

// نظام إدارة اللغات
function initLanguageSystem() {
    // التحقق إذا كان هناك لغة محفوظة
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
        applyLanguage(savedLang);
    }
    
    // إعداد أحداث أزرار تغيير اللغة
    setupLanguageSwitcher();
}

function setupLanguageSwitcher() {
    const languageLinks = document.querySelectorAll('[data-lang]');
    
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            changeLanguage(selectedLang);
        });
    });
}

function changeLanguage(lang) {
    // حفظ اللغة المختارة
    localStorage.setItem('selectedLang', lang);
    
    // تطبيق اللغة
    applyLanguage(lang);
    
    // تحديث الواجهة
    updateLanguageUI(lang);
    
    // إعادة تحميل الصفحة لتطبيق التغييرات الكاملة
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

function applyLanguage(lang) {
    // تحديث سمة اللغة واتجاه الصفحة
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث عنوان الصفحة بناءً على اللغة
    updatePageTitle(lang);
}

function updateLanguageUI(lang) {
    // تحديث نص زر اللغة
    const languageButton = document.querySelector('#languageDropdown');
    if (languageButton) {
        const languageText = getLanguageText(lang);
        const icon = languageButton.querySelector('i') || document.createElement('i');
        icon.className = 'fas fa-globe';
        languageButton.innerHTML = `${icon.outerHTML} ${languageText}`;
    }
    
    // تحديث الحالة النشطة لأزرار اللغة
    document.querySelectorAll('[data-lang]').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-lang') === lang) {
            item.classList.add('active');
        }
    });
}

function updatePageTitle(lang) {
    const titles = {
        'ar': 'محمد الباقر | مطور برمجيات وهندسة ذكاء اصطناعي',
        'en': 'Muhammad Al-Bagher | Software & AI Engineering',
        'ru': 'Мухаммад Аль-Багер | Разработка ПО и ИИ'
    };
    
    if (titles[lang]) {
        document.title = titles[lang];
    }
}

function getLanguageText(lang) {
    const languages = {
        'ar': 'العربية',
        'en': 'English',
        'ru': 'Русский'
    };
    
    return languages[lang] || 'العربية';
}

// التأكد من تطبيق اللغة عند التحميل
window.addEventListener('load', function() {
    const currentLang = localStorage.getItem('selectedLang') || 'ar';
    applyLanguage(currentLang);
    
    // تهيئة تأثيرات إضافية
    initTypewriter();
    
    // إضافة تأثيرات دخول للعناصر الرئيسية
    const mainElements = document.querySelectorAll('.hero-content, .section-title');
    mainElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 300);
    });
});

// باقي الدوال الأصلية مع تحسينات للدعم متعدد اللغات
function initFloatingShapes() {
    const container = document.querySelector('.floating-shapes');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        shape.style.cssText = `
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
            opacity: ${Math.random() * 0.1 + 0.05};
        `;
        container.appendChild(shape);
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // تفعيل أشرطة المهارات عند الظهور
                if (entry.target.classList.contains('skill-bar-container')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // إضافة/إزالة الخلفية عند التمرير
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // إخفاء/إظهار شريط التنقل حسب اتجاه التمرير
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

function initIconAnimations() {
    const icons = document.querySelectorAll('.icon-item');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initSkillBars() {
    // إعداد أشرطة المهارات
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '100%';
        bar.style.width = '0%';
        bar.setAttribute('data-target-width', width);
    });
}

function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-target-width');
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// تأثير الكتابة للنص الرئيسي - معدل لدعم اللغات
function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const currentLang = localStorage.getItem('selectedLang') || 'ar';
    const names = {
        'ar': 'محمد الباقر',
        'en': 'Muhammad Al-Bagher',
        'ru': 'Мухаммад Аль-Багер'
    };
    
    const text = names[currentLang] || 'محمد الباقر';
    const nameSpan = heroTitle.querySelector('.text-primary') || heroTitle;
    
    nameSpan.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            nameSpan.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        } else {
            // بدء تأثير الوميض بعد الانتهاء من الكتابة
            setInterval(() => {
                nameSpan.style.opacity = nameSpan.style.opacity === '0.8' ? '1' : '0.8';
            }, 1000);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// تأثير تحريك الخلفية مع حركة الماوس
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX * speed * 20) - 10;
        const y = (mouseY * speed * 20) - 10;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// تأثيرات وسائل التواصل الاجتماعي
function initSocialMediaEffects() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach((card, index) => {
        // تأثير الدخول المتتالي
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // تأثير عند المرور
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.social-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.social-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// تفعيل النقر على أيقونات وسائل التواصل في الهيدر
function initHeaderSocialIcons() {
    const socialLinks = document.querySelectorAll('.hero-social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // تأثير النقر
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    window.open(href, '_blank');
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 100);
        });
    });
    
    // إضافة أيقونات وسائل التواصل إلى الهيدر إذا لم تكن موجودة
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons && !document.querySelector('.hero-social')) {
        const socialHTML = `
            <div class="hero-social">
                <a href="https://wa.me/79656073755" class="hero-social-link whatsapp" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <a href="https://t.me/mbsd12" class="hero-social-link telegram" target="_blank">
                    <i class="fab fa-telegram"></i>
                </a>
                <a href="https://www.instagram.com/bookcodepulse/" class="hero-social-link instagram" target="_blank">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://github.com/mbrmj875" class="hero-social-link github" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        `;
        heroButtons.insertAdjacentHTML('afterend', socialHTML);
    }
}

// إدارة المشاريع الأكاديمية
function initAcademicProjects() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // تأثير النقر
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                
                // الانتقال لصفحة المشروع إذا كانت موجودة
                if (href && href !== '#') {
                    window.location.href = href;
                } else {
                    // عرض رسالة إذا لم تكن الصفحة جاهزة
                    const projectName = this.querySelector('h4')?.textContent || 'المشروع';
                    showProjectMessage(projectName);
                }
            }, 150);
        });
    });
}

function showProjectMessage(projectName) {
    const currentLang = localStorage.getItem('selectedLang') || 'ar';
    const messages = {
        'ar': `سيتم فتح صفحة المشروع: ${projectName}\n\nهذه الميزة قيد التطوير وسيتم إضافة الصفحات التفصيلية قريباً.`,
        'en': `Project page will open: ${projectName}\n\nThis feature is under development and detailed pages will be added soon.`,
        'ru': `Страница проекта откроется: ${projectName}\n\nЭта функция находится в разработке, подробные страницы будут добавлены в ближайшее время.`
    };
    
    alert(messages[currentLang] || messages['ar']);
}

// دالة مساعدة للتحقق من وجود العناصر
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

console.log('Modern Portfolio Website with Multi-language Support Loaded! 🚀');





