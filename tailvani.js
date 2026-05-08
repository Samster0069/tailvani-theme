/* ============================================================
   TAILVANI.JS  — Safe version for Shopify Assets
   Paste into: Assets → tailvani.js
   Link in theme.liquid before </body>:
   <script src="{{ 'tailvani.js' | asset_url }}" defer></script>
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── SCROLL REVEAL ────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.tv-reveal');
  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── NAV SCROLL SHADOW ────────────────────────────────── */
  var navEl = document.querySelector('.header-wrapper') ||
              document.querySelector('header') ||
              document.querySelector('.shopify-section-header-sticky');
  if (navEl) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navEl.classList.add('tv-scrolled');
      } else {
        navEl.classList.remove('tv-scrolled');
      }
    }, { passive: true });
  }

  /* ── PRODUCT CARD SWATCHES ────────────────────────────── */
  document.querySelectorAll('.tv-card__swatches').forEach(function (group) {
    group.querySelectorAll('.tv-swatch').forEach(function (swatch) {
      swatch.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        group.querySelectorAll('.tv-swatch').forEach(function (s) {
          s.classList.remove('is-active');
        });
        swatch.classList.add('is-active');
      });
    });
  });

  /* ── PDP GALLERY THUMBS ───────────────────────────────── */
  var mainImg = document.getElementById('tv-main-img');
  if (mainImg) {
    document.querySelectorAll('.tv-pdp__thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        document.querySelectorAll('.tv-pdp__thumb').forEach(function (t) {
          t.classList.remove('is-active');
        });
        thumb.classList.add('is-active');
        if (thumb.dataset.src) {
          mainImg.src = thumb.dataset.src;
        }
      });
    });
  }

  /* ── PDP COLOR SWATCHES ───────────────────────────────── */
  var colorSwatches = document.querySelectorAll('.tv-pdp__color-swatch');
  var selectedColorEl = document.getElementById('tv-selected-color');
  colorSwatches.forEach(function (swatch) {
    swatch.addEventListener('click', function () {
      colorSwatches.forEach(function (s) { s.classList.remove('is-active'); });
      swatch.classList.add('is-active');
      if (selectedColorEl) {
        selectedColorEl.textContent = swatch.title;
      }
    });
  });

  /* ── PDP SIZE BUTTONS ─────────────────────────────────── */
  var sizeBtns = document.querySelectorAll('.tv-pdp__size-btn:not(.is-soldout)');
  var selectedSizeEl = document.getElementById('tv-selected-size');
  var sizeGrid = document.querySelector('.tv-pdp__size-grid');
  var variantInput = document.getElementById('tv-variant-id');
  var atcBtn = document.getElementById('tv-atc-btn');
  var tvSelectedSize = null;

  sizeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      sizeBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      tvSelectedSize = btn.dataset.size;
      if (selectedSizeEl) selectedSizeEl.textContent = btn.dataset.size;
      if (variantInput && btn.dataset.variantId) {
        variantInput.value = btn.dataset.variantId;
      }
    });
  });

  if (atcBtn && sizeGrid && sizeBtns.length > 0) {
    atcBtn.addEventListener('click', function (e) {
      if (!tvSelectedSize) {
        e.preventDefault();
        e.stopImmediatePropagation();
        sizeGrid.style.outline = '2px solid var(--tv-accent)';
        sizeGrid.style.borderRadius = '2px';
        setTimeout(function () {
          sizeGrid.style.outline = '';
        }, 2200);
      }
    });
  }

  /* ── SIZE MODAL ───────────────────────────────────────── */
  var sizeOverlay = document.getElementById('tv-size-overlay');
  var sizeModal = document.getElementById('tv-size-modal');
  var sizeModalClose = document.querySelector('.tv-modal__close');

  function openSizeModal() {
    if (!sizeOverlay || !sizeModal) return;
    sizeOverlay.classList.add('is-open');
    sizeModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeSizeModal() {
    if (!sizeOverlay || !sizeModal) return;
    sizeOverlay.classList.remove('is-open');
    sizeModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.tv-pdp__size-guide-link').forEach(function (link) {
    link.addEventListener('click', openSizeModal);
  });
  if (sizeOverlay) sizeOverlay.addEventListener('click', closeSizeModal);
  if (sizeModalClose) sizeModalClose.addEventListener('click', closeSizeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSizeModal();
  });

  /* ── ACCORDION ────────────────────────────────────────── */
  var accordionBtns = document.querySelectorAll('.tv-accordion__btn');
  accordionBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var body = btn.nextElementSibling;
      var isOpen = btn.classList.contains('is-open');
      accordionBtns.forEach(function (b) {
        b.classList.remove('is-open');
        if (b.nextElementSibling) b.nextElementSibling.classList.remove('is-open');
      });
      if (!isOpen) {
        btn.classList.add('is-open');
        if (body) body.classList.add('is-open');
      }
    });
  });
  var firstAccordion = document.querySelector('.tv-accordion__btn');
  if (firstAccordion) {
    firstAccordion.classList.add('is-open');
    if (firstAccordion.nextElementSibling) {
      firstAccordion.nextElementSibling.classList.add('is-open');
    }
  }

  /* ── COLLECTION FILTER PILLS ──────────────────────────── */
  var filterPills = document.querySelectorAll('.tv-filter-pill');
  var productCards = document.querySelectorAll('.tv-products-grid [data-category]');
  var countLabel = document.getElementById('tv-product-count');

  filterPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      filterPills.forEach(function (p) { p.classList.remove('is-active'); });
      pill.classList.add('is-active');
      var cat = pill.dataset.filter;
      var count = 0;
      productCards.forEach(function (card) {
        var cats = card.dataset.category || '';
        var show = cat === 'all' || cats.indexOf(cat) !== -1;
        card.style.display = show ? '' : 'none';
        if (show) count++;
      });
      if (countLabel) {
        countLabel.textContent = count + ' product' + (count !== 1 ? 's' : '');
      }
    });
  });

  /* ── SMOOTH SCROLL ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
