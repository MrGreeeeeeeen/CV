const originalTexts = {};

async function setLanguage(lang) {
  // Если язык английский, восстанавливаем оригинальные тексты
  if (lang === 'en') {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (originalTexts[key]) {
        el.textContent = originalTexts[key];
      }
    });
    localStorage.setItem('lang', lang);
    return;
  }

  // Иначе — загружаем перевод
  try {
    const res = await fetch(`lang/${lang}.json`);
    const translation = await res.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');

      // Сохраняем оригинальный текст один раз
      if (!originalTexts[key]) {
        originalTexts[key] = el.textContent;
      }

      if (translation[key]) {
        el.textContent = translation[key];
      }
    });

    localStorage.setItem('lang', lang);
  } catch (error) {
    console.error('Ошибка загрузки перевода:', error);
  }
}

// Установить язык при загрузке
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);
});
