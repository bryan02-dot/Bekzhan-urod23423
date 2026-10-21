import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Skull, FileText, Lock, Eye, Terminal, Radio } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  onOpenDossier: () => void;
  dossierOpened: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDossier, dossierOpened }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleOpenClick = () => {
    sound.playScan();
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sound.playSiren(1);
          setTimeout(() => {
            setIsScanning(false);
            onOpenDossier();
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 120);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-12 overflow-hidden border-b border-red-950/60">
      {/* Background Cyber Grid & Vignette */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/80 to-[#050507] pointer-events-none" />

      {/* Red scanner sweep line if scanning */}
      {isScanning && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-red-950/20 backdrop-blur-[1px]">
          <div 
            className="w-full h-1.5 bg-red-500 shadow-[0_0_35px_#ff0033] transition-all duration-100 ease-linear"
            style={{ marginTop: `${scanProgress}%` }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 border border-red-600 px-6 py-4 rounded text-red-400 font-mono text-sm tracking-widest shadow-[0_0_30px_rgba(239,68,68,0.7)] flex flex-col items-center gap-2">
            <ShieldAlert className="w-8 h-8 text-red-500 animate-spin" />
            <span className="font-bold">БИОМЕТРИЧЕСКОЕ СКАНИРОВАНИЕ СЕТЧАТКИ...</span>
            <div className="w-48 bg-zinc-900 h-2 border border-red-800 rounded overflow-hidden">
              <div 
                className="bg-red-500 h-full transition-all duration-100"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <span className="text-xs text-red-300/80">ДОПУСК УРОВНЯ 5: АБСУРД ПОДТВЕРЖДЁН</span>
          </div>
        </div>
      )}

      {/* Surveillance Tag Bar */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-700/60 rounded-full text-xs font-mono text-red-400 mb-6 tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse">
        <Radio className="w-3.5 h-3.5 text-red-500" />
        <span>ДЕЛО №666 // УРОВЕНЬ УГРОЗЫ: КРИТИЧЕСКИЙ</span>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
        <span className="text-red-300">СТАТУС: В БЕГАХ ОТ АВТОШКОЛЫ</span>
      </div>

      {/* Secret Agency Stamp */}
      <div className="absolute top-8 left-6 hidden lg:block opacity-70 hover:opacity-100 transition-opacity">
        <div className="stamp-classified px-4 py-2 font-heading text-xs tracking-widest uppercase">
          СОВЕРШЕННО СЕКРЕТНО<br />
          АРХИВ «ДРУЗЬЯ 2026»
        </div>
      </div>

      <div className="absolute top-8 right-24 hidden lg:block opacity-60">
        <div className="stamp-rejected px-3 py-1 font-mono text-[11px] font-bold tracking-widest uppercase">
          ОТКЛОНЕНО АВТОЦОНОМ<br />
          5 ЛЕТ ПОДРЯД
        </div>
      </div>

      {/* Main Punchy Dossier Heading */}
      <div className="max-w-4xl mx-auto space-y-4 z-10">
        <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs tracking-widest uppercase font-mono mb-1">
          ОБЪЕКТ НАБЛЮДЕНИЯ: БЕКЖАН
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading tracking-tight text-white uppercase leading-tight">
          BEKZHAN — <span className="text-red-500 neon-glow-red">5 ЛЕТ В ПОИСКАХ</span> ВОДИТЕЛЬСКИХ ПРАВ
        </h1>

        <p className="text-lg sm:text-2xl text-red-200/90 font-tech font-bold italic tracking-wide max-w-2xl mx-auto py-1 border-y border-red-900/50">
          «Он обещал сдать экзамен. Экзамен обещал держаться».
        </p>

        {/* Tactical Dossier Card / Mugshot Silhouette */}
        <div className="my-6 max-w-xl mx-auto bg-black/75 border border-red-900/80 rounded-lg p-5 text-left font-mono text-xs sm:text-sm text-zinc-300 backdrop-blur-md shadow-[0_0_25px_rgba(239,68,68,0.2)] relative">
          <div className="absolute -top-3 left-4 bg-red-950 border border-red-700 text-red-300 text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest flex items-center gap-1">
            <Lock className="w-3 h-3" /> ОПЕРАТИВНОЕ ПРЕДУПРЕЖДЕНИЕ
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-start gap-2.5 text-red-300">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>
                <strong>Внимание:</strong> объект может задать вопрос, после которого у вас появятся новые вопросы.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-amber-300">
              <Radio className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Возможны</strong> внезапные звуковые эффекты и несанкционированные биологические выбросы.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-zinc-300">
              <Skull className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                <strong>Обещания объекта</strong> не гарантируют наступления событий в нашей вселенной.
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: ОТКРЫТЬ ДОСЬЕ */}
        <div className="pt-2">
          <button
            onClick={handleOpenClick}
            disabled={isScanning}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white font-heading text-lg sm:text-xl tracking-wider uppercase rounded shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:shadow-[0_0_40px_rgba(239,68,68,0.9)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-red-400"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FileText className="w-6 h-6 animate-bounce" />
            <span>ОТКРЫТЬ ДОСЬЕ</span>
            <Eye className="w-5 h-5 text-red-200" />
          </button>
        </div>

        {/* Quick dossier stats row */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left font-mono">
          <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 rounded">
            <div className="text-[10px] text-zinc-500 uppercase">Срок расследования</div>
            <div className="text-red-400 font-bold text-sm">5 ЛЕТ (1826 ДНЕЙ)</div>
          </div>
          <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 rounded">
            <div className="text-[10px] text-zinc-500 uppercase">Водительские права</div>
            <div className="text-red-500 font-bold text-sm">0 ШТ (НЕ НАЙДЕНЫ)</div>
          </div>
          <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 rounded">
            <div className="text-[10px] text-zinc-500 uppercase">«Кымызные» заманухи</div>
            <div className="text-amber-400 font-bold text-sm">142 РАЗА ОТКАЗАНО</div>
          </div>
          <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 rounded">
            <div className="text-[10px] text-zinc-500 uppercase">Степень свободы</div>
            <div className="text-zinc-400 font-bold text-sm">ПО СОГЛАСОВАНИЮ</div>
          </div>
        </div>
      </div>
    </section>
  );
};
