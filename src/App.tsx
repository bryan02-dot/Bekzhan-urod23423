import React, { useState } from 'react';
import { AudioToggle } from './components/AudioToggle';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { Case001Driving } from './components/Case001Driving';
import { Case002GasThreat } from './components/Case002GasThreat';
import { Case003Henpecked } from './components/Case003Henpecked';
import { Case004Kymyz } from './components/Case004Kymyz';
import { Case005StupidQuestions } from './components/Case005StupidQuestions';
import { Case006PromiseMaster } from './components/Case006PromiseMaster';
import { Case007AlcoholArchive } from './components/Case007AlcoholArchive';
import { BossFight } from './components/BossFight';
import { SecretEndingModal } from './components/SecretEndingModal';
import { Shield, Radio, Terminal, Heart } from 'lucide-react';

export default function App() {
  const [dossierOpened, setDossierOpened] = useState(false);

  const handleOpenDossier = () => {
    setDossierOpened(true);
    const firstCase = document.getElementById('case-001');
    if (firstCase) {
      firstCase.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#e2e8f0] relative flex flex-col font-mono selection:bg-red-600 selection:text-white">
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 crt-overlay z-30 pointer-events-none opacity-40" />

      {/* Persistent Audio & Synth Music Controls */}
      <AudioToggle />

      {/* Sticky Surveillance Navigation */}
      <HeaderNav />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-6xl mx-auto">
        {/* Section 1: Hero - Объект: Бекжан */}
        <HeroSection onOpenDossier={handleOpenDossier} dossierOpened={dossierOpened} />

        {/* Section 2: Дело №001 — Пять лет без водительских прав */}
        <Case001Driving />

        {/* Section 3: Дело №002 — Газовая угроза */}
        <Case002GasThreat />

        {/* Section 4: Дело №003 — Подкаблучник года */}
        <Case003Henpecked />

        {/* Section 5: Дело №004 — «Брат, кымыз выпьем» */}
        <Case004Kymyz />

        {/* Section 6: Дело №005 — Глупые вопросы века */}
        <Case005StupidQuestions />

        {/* Section 7: Дело №006 — Наёмный мастер обещаний */}
        <Case006PromiseMaster />

        {/* Section 8: Алкогольный архив №007 */}
        <Case007AlcoholArchive />

        {/* Section 9: Финальный босс — Бекжан */}
        <BossFight />

        {/* Section 10: Секретная концовка */}
        <SecretEndingModal />
      </main>

      {/* Footer with Legendary Dedicated Note */}
      <footer className="border-t border-red-950/80 bg-black/90 py-10 px-4 text-center font-mono text-xs text-zinc-500 relative z-10">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-red-500 font-bold uppercase tracking-widest text-[11px]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>СЕКРЕТНОЕ ДОСЬЕ №666 // ЗАКРЫТЫЙ КАНАЛ СВЯЗИ</span>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm font-tech leading-relaxed border-y border-zinc-900 py-3">
            «Главная цель проекта: чтобы Бекжан открыл сайт и осознал, что друзья вложили в его создание больше усилий, внимания и душевной энергии, чем он вложил в получение водительских прав за пять долгих лет».
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-600">
            <span>© 2021–2026 АРХИВ ДРУЖБЫ</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-zinc-400">
              Сделано с любовью и беспощадным троллингом <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </span>
            <span>•</span>
            <span>НИ ОДНО ВОДИТЕЛЬСКОЕ УДОСТОВЕРЕНИЕ НЕ ПОСТРАДАЛО</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
