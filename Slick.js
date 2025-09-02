<script>
function loadSlickResources() {
    setTimeout(() => {
        const slickCss = document.createElement('link');
        slickCss.rel = 'stylesheet';
        slickCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css';
        document.head.appendChild(slickCss);

        const slickThemeCss = document.createElement('link');
        slickThemeCss.rel = 'stylesheet';
        slickThemeCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css';
        document.head.appendChild(slickThemeCss);

        const slickJs = document.createElement('script');
        slickJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js';
        slickJs.onload = function() {
            console.log('Slick Carousel JS loaded successfully');
            initializeSlick(); 
        };
        slickJs.onerror = function() {
            console.error('Failed to load Slick Carousel JS');
        };
        document.head.appendChild(slickJs);
    }, 2000);
}

// Initialize Slick Carousel
function initializeSlick() {
    var $j = jQuery.noConflict();

    (function() {
        if (typeof $j === 'undefined') {
            console.error('jQuery не загружен. Убедитесь, что Tilda подключила jQuery в настройках проекта.');
            return;
        }

        function checkSlick(attempts, maxAttempts, callback) {
            if (typeof $j.fn.slick !== 'undefined') {
                console.log('Slick Carousel успешно загружен');
                callback();
            } else if (attempts < maxAttempts) {
                console.warn('Slick Carousel ещё не загружен, попытка ' + (attempts + 1));
                setTimeout(function() {
                    checkSlick(attempts + 1, maxAttempts, callback);
                }, 1000);
            } else {
                console.error('Slick Carousel не загружен после ' + maxAttempts + ' попыток. Проверьте подключение CDN или загрузите локально.');
            }
        }

        t_onReady(function () {
            t_onFuncLoad('t396_init', function () {
                let zero1 = ['#rec1234291276', '#rec1234293116', '#rec1237239886', '#rec1237252341','#rec1239640836','#rec1239648686','#rec1239652636'];
                let sld1 = $j('.slider').eq(0);

                if (!sld1.length) {
                    console.error('Элемент .slider не найден на странице.');
                    return;
                }

                let missingIds = zero1.filter(id => !$j(id).length);
                if (missingIds.length) {
                    console.warn('Следующие ID не найдены в DOM:', missingIds);
                }

                for (let i = 0; i < zero1.length; i++) {
                    if ($j(zero1[i]).length) {
                        sld1.append(`<div number="${i}"></div>`);
                        $j(sld1.find(`div[number="${i}"]`)).append($j(zero1[i]));
                    }
                }

                checkSlick(0, 10, function() {
                    try {
                        sld1.slick({
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            centerMode: false,
                            centerPadding: '0px',
                            speed: 500,
                            arrows: Boolean(sld1.closest('.t396__artboard').find('.v-next').length || document.querySelector('.v-next1')),
                            fade: false,
                            infinite: true,
                            swipe: true,
                            vertical: false,
                            verticalSwiping: false,
                            autoplay: false,
                            swipeToSlide: true,
                            easing: 'easeInOut',
                            adaptiveHeight: false,
                            nextArrow: document.querySelector('.v-next1') || sld1.closest('.t396__artboard').find('.v-next'),
                            prevArrow: document.querySelector('.v-prev1') || sld1.closest('.t396__artboard').find('.v-prev'),
                            responsive: [
                                {
                                    breakpoint: 1200,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 720,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }
                                }
                            ]
                        });

                        sld1.slick('setPosition');
                        console.log('Slick успешно инициализирован');
                        resizeSlides();
                    } catch (e) {
                        console.error('Ошибка при инициализации Slick:', e);
                    }
                });

                function redeclare() {
                    for (let i = 0; i < zero1.length; i++) {
                        $j(sld1.find(`div[number="${i}"] > .t-rec`)).attr('id', $j(zero1[i]).attr('id'));
                    }
                }

                function resizeSlides() {
                    sld1[0].querySelectorAll('.slick-slide .t-rec').forEach(function(sl) {
                        let id = sl.id.replace('rec', '');
                        if (id && sl.getAttribute('data-record-type') === '396') {
                            try {
                                t396_doResize(id, true);
                            } catch (e) {
                                console.warn('Ошибка в t396_doResize для ID', id, e);
                            }
                        }
                    });
                    sld1[0].querySelectorAll('.slick-slide .tn-atom__img').forEach(function(im) {
                        let src = im.src;
                        let orig = im.getAttribute('data-original');
                        if (!src && orig) im.setAttribute('src', orig);
                    });
                    if (window.lazy === 'y') {
                        try {
                            t_lazyload_update();
                        } catch (e) {
                            console.warn('Ошибка в t_lazyload_update:', e);
                        }
                    }
                }

                window.addEventListener('orientationchange', function() {
                    redeclare();
                    sld1.slick('setPosition');
                });

                $j('a[data-slide]').click(function(e) {
                    e.preventDefault();
                    $j(this).data('slide');
                });

                sld1.on('afterChange', function(event, slick, currentSlide) {
                    resizeSlides();
                    sld1[0].querySelectorAll('.slick-slide .t-animate_started').forEach(el => el.classList.remove('t-animate_started'));
                    sld1[0].querySelectorAll('.slick-current .t-animate').forEach(el => el.classList.add('t-animate_started'));
                });

                setTimeout(() => {
                    const elements = sld1[0].querySelectorAll('.slick-slide:not(.slick-active) .t-animate_started');
                    if (elements.length) elements.forEach(el => el.classList.remove('t-animate_started'));
                }, 1500);

                redeclare();
                resizeSlides();
            });
        });
    })();
}

document.addEventListener('DOMContentLoaded', loadSlickResources);
</script>
