(function () {
  // Scroll
  try { if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } } catch {}
  // Modal
  const modal = document.getElementById('trailerModal');
  const iframe = document.getElementById('trailerFrame');
  if (modal && iframe) {
    modal.addEventListener('hidden.bs.modal', function () {
      const src = iframe.getAttribute('src');
      iframe.setAttribute('src', src);
    });
  }
  // i18n
  const dict = {
    en: {
      title: 'Interstellar - Landing Page',
      'meta.description': 'Simple landing page for Interstellar using Bootstrap',
      nav: { about: 'About', highlights: 'Highlights', gallery: 'Gallery', trailer: 'Trailer' },
      hero: { subtitle: 'A human journey across the stars about hope, family, and time.', learnmore: 'Learn more', watch: 'Watch trailer' },
      about: {
        title: 'About Interstellar',
        text: "A science-fiction film by Christopher Nolan. A team of astronauts embarks on a daring mission through a wormhole to find a new home for humanity.",
  synopsis: 'Set in a near-future Earth facing ecological collapse, pilot-turned-farmer Cooper joins a covert NASA mission to travel through a wormhole in search of habitable worlds, balancing cosmic stakes with personal sacrifice.',
  list: { release: 'Release:', director: 'Director:', runtime: 'Runtime:' }
      },
      highlights: {
        title: 'Highlights',
        story: { title: 'Story', text: "A quest for humanity’s survival blending science with emotion." },
        music: { title: 'Score', text: "Hans Zimmer’s score adds unforgettable emotional depth." },
        cinematography: { title: 'Cinematography', text: 'Stunning space visuals and a powerful cinematic experience.' }
      },
  gallery: { title: 'Gallery' },
  rating: { votes: '2.4M' },
  trailer: { title: 'Trailer', subtitle: 'Watch the trailer below.', button: 'Watch now' },
      footer: { line1: 'Landing demo — Bootstrap only with a tiny touch.', line2: 'On mobile it’s intentionally simple to reflect a learning stage.' },
      modal: { title: 'Interstellar Trailer' }
    },
    ar: {
      title: 'Interstellar - صفحة هبوط',
      'meta.description': 'لاندينج بيدج بسيطة لفيلم Interstellar باستخدام Bootstrap',
      nav: { about: 'عن الفيلم', highlights: 'لمحات', gallery: 'صور', trailer: 'تريلر' },
      hero: { subtitle: 'رحلة إنسانية بين النجوم عن الأمل والعائلة والزمان.', learnmore: 'اعرف أكتر', watch: 'شاهد التريلر' },
      about: {
        title: 'عن Interstellar',
  text: 'فيلم خيال علمي من إخراج كريستوفر نولان. يدور حول فريق من رواد الفضاء ينطلقون في مهمة جريئة للعثور على موطن جديد للبشرية عبر ثقب دودي.',
  synopsis: 'في مستقبل قريب تواجه الأرض انهيارًا بيئيًا، ينضم كوبر الطيار السابق إلى مهمة سرية لناسا عبر ثقب دودي بحثًا عن عوالم صالحة للحياة، متوازنًا بين رهانات كونية وتضحيات شخصية.',
  list: { release: 'الإصدار:', director: 'الإخراج:', runtime: 'المدة:' }
      },
      highlights: {
        title: 'لمحات سريعة',
        story: { title: 'القصة', text: 'بحث عن النجاة للبشرية يجمع العلم بالمشاعر في رحلة مليئة بالمفاجآت.' },
        music: { title: 'الموسيقى', text: 'ألحان هانز زيمر تضيف عمقًا عاطفيًا لا يُنسى.' },
        cinematography: { title: 'التصوير', text: 'مشاهد فضائية مبهرة وتجربة بصرية قوية.' }
      },
  gallery: { title: 'صور' },
  rating: { votes: '2.4M' },
  trailer: { title: 'تريلر', subtitle: 'شاهد التريلر بالأسفل.', button: 'شاهد الآن' },
      footer: { line1: 'Landing demo — Bootstrap فقط مع لمسة بسيطة.', line2: 'الهاتف: تصميم بسيط ليعكس مرحلة تعلم الريسبونسيف.' },
      modal: { title: 'Interstellar Trailer' }
    }
  };

  // Lang swap
  const html = document.documentElement;
  const bsLink = document.getElementById('bootstrap-css');

  function get(obj, path) {
    return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
  }

  function applyLang(lang) {
    const data = dict[lang] || dict.en;

  // Replace
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = get(data, key);
      if (typeof val === 'string') el.textContent = val;
    });

  // Meta
    document.querySelectorAll('[data-i18n-meta]').forEach((el) => {
      const key = el.getAttribute('data-i18n-meta');
      const val = get(data, key);
      if (el.tagName === 'META') {
        el.setAttribute('content', val || '');
      } else if (el.tagName === 'TITLE') {
        el.textContent = val || '';
      }
    });

  // Title
    const titleEl = document.querySelector('title[data-i18n="title"]');
    if (titleEl) titleEl.textContent = data.title;

    const isAR = lang === 'ar';
    html.setAttribute('lang', isAR ? 'ar' : 'en');
    html.setAttribute('dir', isAR ? 'rtl' : 'ltr');
    if (bsLink) {
      const href = isAR ? bsLink.getAttribute('data-href-rtl') : bsLink.getAttribute('data-href-ltr');
      if (href && bsLink.getAttribute('href') !== href) bsLink.setAttribute('href', href);
    }

    // Persist
    try { localStorage.setItem('lang', lang); } catch {}
  }

  // Buttons
  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-set-lang');
  try { localStorage.setItem('lang', lang); } catch {}
  try { sessionStorage.setItem('forceTop', '1'); } catch {}
  // Navigate to the page root to drop any hash and load from top
  const url = window.location.pathname + window.location.search;
  window.location.replace(url);
    });
  });

  // Init
  const saved = (function(){ try { return localStorage.getItem('lang'); } catch { return null; } })();
  applyLang(saved || 'en');
  // Top
  try {
    if (sessionStorage.getItem('forceTop') === '1') {
      sessionStorage.removeItem('forceTop');
      window.scrollTo(0, 0);
    }
  } catch {}
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
