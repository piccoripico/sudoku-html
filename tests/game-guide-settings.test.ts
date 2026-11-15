import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const buttons: Record<string, [string, string, string]> = {
  'en': ['Load', 'Settings', 'Help'],
  'ja': ['読込', '設定', 'ヘルプ'],
  'zh-CN': ['读取', '设置', '帮助'],
  'hi': ['खोलें', 'सेटिंग', 'सहायता'],
  'es': ['Cargar', 'Ajustes', 'Ayuda'],
  'ar': ['تحميل', 'الإعدادات', 'مساعدة'],
  'fr': ['Charger', 'Réglages', 'Aide'],
  'pt-BR': ['Carregar', 'Configurações', 'Ajuda'],
  'pt-PT': ['Carregar', 'Definições', 'Ajuda'],
  'ru': ['Загрузить', 'Настройки', 'Справка'],
  'de': ['Laden', 'Einstellungen', 'Hilfe'],
  'id': ['Muat', 'Pengaturan', 'Bantuan'],
  'bn': ['লোড', 'সেটিংস', 'সহায়তা'],
  'tr': ['Yükle', 'Ayarlar', 'Yardım'],
  'ko': ['불러오기', '설정', '도움말'],
  'vi': ['Tải', 'Cài đặt', 'Trợ giúp'],
  'it': ['Carica', 'Impostazioni', 'Aiuto'],
  'nl': ['Laden', 'Instellingen', 'Help'],
  'pl': ['Wczytaj', 'Ustawienia', 'Pomoc'],
  'th': ['โหลด', 'ตั้งค่า', 'ช่วยเหลือ'],
  'ur': ['لوڈ کریں', 'ترتیبات', 'مدد'],
  'fa': ['بارگذاری', 'تنظیمات', 'راهنما'],
  'sw': ['Pakia', 'Mipangilio', 'Msaada'],
  'zh-TW': ['載入', '設定', '說明'],
  'uk': ['Завантажити', 'Налаштування', 'Довідка'],
};

for (const [locale, [load, settings, help]] of Object.entries(buttons)) {
  test(`Game Guide ${locale} documents Settings once, between Load and Help`, () => {
    const suffix = locale === 'en' ? '' : `.${locale}`;
    const source = readFileSync(path.join(process.cwd(), 'docs', 'game-guides', `GAME_GUIDE${suffix}.md`), 'utf8');
    const sections = source.split(/^## /m).slice(1);
    assert.equal(sections.length, 5);
    const bullets = sections.map((section) => section.split('\n').filter((line) => line.startsWith('- ')));
    assert.deepEqual(bullets.map((lines) => lines.length), [4, 13, 4, 7, 7]);
    const above = bullets[1];
    assert.ok(above, 'Above-board controls section is missing.');
    assert.equal(above.at(-3)?.startsWith(`- \`${load}\``), true);
    assert.equal(above.at(-2)?.startsWith(`- \`${settings}\``), true);
    assert.equal(above.at(-1)?.startsWith(`- \`${help}\``), true);
    assert.equal(source.split('\n').filter((line) => line.startsWith(`- \`${settings}\``)).length, 1);
  });
}
