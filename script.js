/**
 * PROEXPO - Main JavaScript File
 * شركة PROEXPO للحلول الاستثمارية والتمويلية
 * © 2026 جميع الحقوق محفوظة
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // ========== 1. حركات الظهور عند التمرير (Scroll Animations) ==========
    const animatedElements = document.querySelectorAll(
        '.card, .service-box, .study-item, .exhibition-item, .about-block, .feature-card, .stat-box, .service-card, .info-card, .quote-card, .process-step, .why-us-item, .testimonial-card, .branch-card, .quick-contact-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "opacity 0.7s ease, transform 0.7s ease";
                // إلغاء المراقبة بعد الظهور لتحسين الأداء
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    });

    animatedElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(35px)";
        observer.observe(el);
        
        // تأخير بسيط متدرج للعناصر المرئية فوراً
        setTimeout(() => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
            }
        }, 150);
    });

    // ========== 2. منع إرسال الفورم وإظهار رسالة نجاح احترافية ==========
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من صحة الحقول المطلوبة
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#E74C3C';
                    field.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.1)';
                    
                    // إزالة التأثير بعد 3 ثواني
                    setTimeout(() => {
                        field.style.borderColor = '#e8eaed';
                        field.style.boxShadow = 'none';
                    }, 3000);
                }
            });
            
            if (!isValid) {
                // تمرير إلى أول حقل فارغ
                const firstEmpty = form.querySelector('[required]:invalid');
                if (firstEmpty) {
                    firstEmpty.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstEmpty.focus();
                }
                return;
            }
            
            // إذا كان هناك checkbox للموافقة
            const consentCheck = form.querySelector('input[type="checkbox"][required]');
            if (consentCheck && !consentCheck.checked) {
                alert('يرجى الموافقة على سياسة الخصوصية للمتابعة.');
                consentCheck.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            
            // نجاح التحقق - إظهار رسالة مخصصة
            showSuccessMessage(form);
            form.reset();
        });
    });

    function showSuccessMessage(form) {
        // إنشاء عنصر الرسالة
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.innerHTML = `
            <div style="
                background: white;
                border-radius: 18px;
                padding: 35px 30px;
                text-align: center;
                box-shadow: 0 15px 50px rgba(0,0,0,0.2);
                border: 2px solid #27AE60;
                max-width: 450px;
                width: 90%;
            ">
                <div style="
                    width: 70px;
                    height: 70px;
                    background: #27AE60;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 18px;
                    font-size: 2rem;
                    color: white;
                ">
                    <i class="fas fa-check"></i>
                </div>
                <h3 style="color:#2C3E50; margin-bottom:10px; font-size:1.3rem;">تم إرسال طلبك بنجاح!</h3>
                <p style="color:#666; margin-bottom:20px; line-height:1.8;">
                    شكراً لتواصلك مع <strong>PROEXPO</strong>. سيتواصل معك أحد مستشارينا خلال 24 ساعة.
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #27AE60;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 50px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: 'Cairo';
                    font-size: 0.95rem;
                ">حسناً</button>
            </div>
        `;
        
        // خلفية شفافة
        messageDiv.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        // إغلاق بالضغط خارج البطاقة
        messageDiv.addEventListener('click', function(e) {
            if (e.target === messageDiv) {
                messageDiv.remove();
            }
        });
        
        // إغلاق تلقائي بعد 5 ثواني
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // ========== 3. تمرير سلس للروابط الداخلية ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== 4. تأثير الأيقونات العائمة ==========
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const consultBtn = document.querySelector('.consult-float');

    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', () => {
            whatsappBtn.style.animationPlayState = 'paused';
            whatsappBtn.style.transform = 'scale(1.15)';
        });
        whatsappBtn.addEventListener('mouseleave', () => {
            whatsappBtn.style.animationPlayState = 'running';
            whatsappBtn.style.transform = 'scale(1)';
        });
    }

    if (consultBtn) {
        consultBtn.addEventListener('mouseenter', () => {
            consultBtn.style.transform = 'scale(1.15)';
        });
        consultBtn.addEventListener('mouseleave', () => {
            consultBtn.style.transform = 'scale(1)';
        });
    }

    // ========== 5. إخفاء/إظهار الأيقونات عند التمرير ==========
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 600) {
            // تمرير للأسفل
            if (whatsappBtn) whatsappBtn.style.opacity = '0.5';
            if (consultBtn) consultBtn.style.opacity = '0.5';
        } else {
            // تمرير للأعلى
            if (whatsappBtn) whatsappBtn.style.opacity = '1';
            if (consultBtn) consultBtn.style.opacity = '1';
        }
        lastScrollTop = scrollTop;
        
        // إعادة الشفافية الكاملة بعد التوقف عن التمرير
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (whatsappBtn) whatsappBtn.style.opacity = '1';
            if (consultBtn) consultBtn.style.opacity = '1';
        }, 1500);
    });

    // ========== 6. إغلاق Lightbox بالضغط على Escape ==========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const lightbox = document.getElementById('lightbox');
            if (lightbox && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
            // إغلاق رسالة النجاح أيضاً
            const successMsg = document.querySelector('.success-message');
            if (successMsg) {
                successMsg.remove();
            }
        }
    });

    // ========== 7. تحسين أداء الصور (Lazy Loading) ==========
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ========== 8. إضافة كلاس active للرابط الحالي ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    console.log('🚀 PROEXPO | موقع شركة PROEXPO جاهز للعمل');
    console.log('📞 للتواصل: +963 933 438 019');
    console.log('© 2026 جميع الحقوق محفوظة');
});

// ========== دوال عامة للـ Lightbox ==========
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightbox && lightboxImg) {
        lightbox.classList.add('active');
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}