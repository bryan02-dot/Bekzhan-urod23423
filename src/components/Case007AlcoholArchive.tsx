import React, { useState } from 'react';
import { GlassWater, AlertTriangle, Sparkles, RefreshCw, Stamp } from 'lucide-react';
import { sound } from '../utils/audio';

export const Case007AlcoholArchive: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const phrases = [
    '«Сегодня чисто по чуть-чуть».',
    '«Брат, последний раз и домой».',
    '«Я всё контролирую».',
    '«Завтра точно без приключений».',
    '«Я вообще-то ненадолго».',
  ];

  const handleGenerate = () => {
    sound.playClick();
    setIsGenerating(true);
    setCurrentPhrase(null);

    setTimeout(() => {
      sound.playBeep(520, 0.12, 'sawtooth');
      const chosen = phrases[Math.floor(Math.random() * phrases.length)];
      setCurrentPhrase(chosen);
      setIsGenerating(false);
    }, 400);
  };

  return (
    <section id="alcohol-archive" className="py-16 px-4 border-b border-red-950/60 bg-black/75 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-950/80 text-red-400 font-mono text-xs font-bold rounded border border-red-600">
              АРХИВ №007
            </span>
            <span className="text-zinc-500 font-mono text-xs">// РЕЕСТР ВЕЧЕРНИХ ЗАЯВЛЕНИЙ</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
            <GlassWater className="w-4 h-4 text-amber-500" />
            <span>СТАТУС: «Я ЧИСТО НА 15 МИНУТ»</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="space-y-3 text-left">
          <h2 className="text-2xl sm:text-4xl font-heading text-white tracking-wide uppercase leading-tight">
            «КОГДА У БЕКЖАНА ЕСТЬ ПЛАНЫ, НО ОНИ СНОВА СВЯЗАНЫ <span className="text-red-500 neon-glow-red">С ПОСИДЕЛКАМИ</span>».
          </h2>
          <p className="text-zinc-400 font-mono text-sm border-l-2 border-amber-600 pl-4 py-1">
            Исследование парадокса: как фраза «посидим немного» искривляет пространственно-временной континуум.
          </p>
        </div>

        {/* Habits Panel */}
        <div className="bg-zinc-950/90 border border-zinc-800 p-5 rounded-lg space-y-3 font-mono text-xs sm:text-sm text-left">
          <div className="text-amber-400 font-bold uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            ПАНЕЛЬ ПОВЕДЕНЧЕСКИХ ПРИВЫЧЕК:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-zinc-300">
            <div className="p-3 bg-zinc-900/80 rounded border border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-400">Частота фразы «посидим немного»:</span>
              <span className="text-red-400 font-bold uppercase">КРИТИЧЕСКАЯ</span>
            </div>
            <div className="p-3 bg-zinc-900/80 rounded border border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-400">Вероятность окончания раньше планов:</span>
              <span className="text-amber-400 font-bold uppercase">НЕИЗВЕСТНА (0%)</span>
            </div>
            <div className="p-3 bg-zinc-900/80 rounded border border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-400">Повторно рассказанных историй:</span>
              <span className="text-cyan-400 font-bold uppercase">НЕ ОГРАНИЧЕНО</span>
            </div>
            <div className="p-3 bg-zinc-900/80 rounded border border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-400">Уверенность в завтрашнем утре:</span>
              <span className="text-red-500 font-bold uppercase">ПОДОЗРИТЕЛЬНО ВЫСОКАЯ</span>
            </div>
          </div>
        </div>

        {/* Phrase Generator */}
        <div className="bg-zinc-950/90 border border-red-900/60 p-6 rounded-lg text-center space-y-6 shadow-2xl relative">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            ГЕНЕРАТОР ЛЕГЕНДАРНЫХ ЗАЯВЛЕНИЙ
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-8 py-3.5 bg-gradient-to-r from-red-800 via-red-600 to-red-800 hover:from-red-700 hover:to-red-500 text-white font-heading text-sm sm:text-base tracking-wider uppercase rounded shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>СГЕНЕРИРОВАТЬ ФРАЗУ ВЕЧЕРА</span>
          </button>

          {currentPhrase && (
            <div className="relative p-6 bg-black/95 border-2 border-red-600 rounded-lg text-white font-mono space-y-4 shadow-[0_0_25px_rgba(239,68,68,0.35)] animate-fadeIn">
              <div className="text-lg sm:text-2xl font-tech font-bold text-red-200">
                {currentPhrase}
              </div>

              {/* Massive Official Red Stamp */}
              <div className="pt-2">
                <div className="stamp-rejected inline-block px-4 py-2 font-heading text-xs sm:text-sm tracking-widest uppercase animate-bounce">
                  ИСТОРИЧЕСКИ НЕПОДТВЕРЖДЁННОЕ ЗАЯВЛЕНИЕ
                </div>
              </div>

              <div className="text-[11px] text-zinc-500 pt-1">
                Архив предупреждает: данная цитата никогда не соответствовала реальному развитию событий.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
