import React, { useState } from 'react';
import { BarChart3, Search, CheckCircle, ShieldAlert, FileSearch, Stamp } from 'lucide-react';
import { sound } from '../utils/audio';

export const Case006PromiseMaster: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const verdicts = [
    '«Обещание принято. Срок выполнения неизвестен».',
    '«Обнаружена уважительная причина №47».',
    '«Событие перенесено на неопределённое будущее».',
    '«Бекжан подтверждает, что собирался это сделать».',
    '«Дело закрыто без фактического выполнения обещания».',
    '«Обещание попало во временную петлю между "сейчас" и "никогда"».',
  ];

  const handleCheckPromise = () => {
    sound.playScan();
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      sound.playError();
      setAnalyzing(false);
      const chosen = verdicts[Math.floor(Math.random() * verdicts.length)];
      setResult(chosen);
    }, 1100);
  };

  return (
    <section id="case-006" className="py-16 px-4 border-b border-red-950/60 bg-gradient-to-b from-black via-zinc-950 to-black relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-950/80 text-red-400 font-mono text-xs font-bold rounded border border-red-600">
              ДЕЛО №006
            </span>
            <span className="text-zinc-500 font-mono text-xs">// АНАЛИТИЧЕСКИЙ ЦЕНТР ВЕРИФИКАЦИИ СЛОВ</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
            <BarChart3 className="w-4 h-4 text-amber-500" />
            <span>ИНДЕКС ИСПОЛНЕНИЯ: 0.00%</span>
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-3 text-left">
          <h2 className="text-2xl sm:text-4xl font-heading text-white tracking-wide uppercase leading-tight">
            «БЕКЖАН: СЛОВО ДЕРЖИТ. <span className="text-red-500 neon-glow-red">НО НЕ ОБЯЗАТЕЛЬНО СВОЁ</span>».
          </h2>
          <p className="text-zinc-400 font-mono text-sm border-l-2 border-red-600 pl-4 py-1">
            Математическая модель обещаний, выверенная на базе сотен срывов и внезапных переносов.
          </p>
        </div>

        {/* Fake Analytics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-zinc-950/90 border border-zinc-800 p-4 rounded-lg text-left font-mono">
            <div className="text-2xl sm:text-3xl font-heading text-green-400">100%</div>
            <div className="text-[11px] text-zinc-400 mt-1 uppercase">
              Уверенность в собственных обещаниях
            </div>
          </div>

          <div className="bg-zinc-950/90 border border-zinc-800 p-4 rounded-lg text-left font-mono">
            <div className="text-2xl sm:text-3xl font-heading text-amber-400">7%</div>
            <div className="text-[11px] text-zinc-400 mt-1 uppercase">
              Вероятность, что всё пойдёт по плану
            </div>
          </div>

          <div className="bg-zinc-950/90 border border-zinc-800 p-4 rounded-lg text-left font-mono">
            <div className="text-2xl sm:text-3xl font-heading text-red-500 neon-glow-red">93%</div>
            <div className="text-[11px] text-zinc-400 mt-1 uppercase">
              Шанс появления новых обстоятельств
            </div>
          </div>

          <div className="bg-zinc-950/90 border border-zinc-800 p-4 rounded-lg text-left font-mono">
            <div className="text-2xl sm:text-3xl font-heading text-red-400">404</div>
            <div className="text-[11px] text-zinc-400 mt-1 uppercase">
              Доверие не найдено в реестре
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-zinc-950/90 border border-zinc-800 p-4 rounded-lg text-left font-mono">
            <div className="text-2xl sm:text-3xl font-heading text-cyan-400">∞</div >
            <div className="text-[11px] text-zinc-400 mt-1 uppercase">
              Объяснений на вопрос «ну что там?»
            </div>
          </div>
        </div>

        {/* Interactive Promise Checker */}
        <div className="bg-zinc-950/90 border border-red-900/60 p-6 rounded-lg text-center space-y-5 shadow-2xl relative">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-center gap-2">
            <FileSearch className="w-4 h-4 text-red-500" />
            СИСТЕМА ДЕТЕКЦИИ ДОСТОВЕРНОСТИ ОБЕЩАНИЯ
          </div>

          <button
            onClick={handleCheckPromise}
            disabled={analyzing}
            className="px-8 py-3.5 bg-gradient-to-r from-red-700 via-red-600 to-red-800 hover:from-red-600 hover:to-red-500 text-white font-heading text-sm sm:text-base tracking-wider uppercase rounded shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <Search className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
            <span>{analyzing ? 'АНАЛИЗ БАЗЫ ОБЕЩАНИЙ...' : 'ПРОВЕРИТЬ ОБЕЩАНИЕ'}</span>
          </button>

          {analyzing && (
            <div className="text-xs font-mono text-amber-400 animate-pulse">
              [СКАНИРОВАНИЕ]: Сопоставление слов объекта с физической реальностью...
            </div>
          )}

          {result && (
            <div className="relative p-6 bg-black/95 border-2 border-red-600 rounded-lg text-white font-mono space-y-3 shadow-[0_0_25px_rgba(239,68,68,0.35)] animate-fadeIn">
              <div className="stamp-rejected inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest mb-1">
                СТАТУС: АННУЛИРОВАНО
              </div>
              <div className="text-base sm:text-xl font-tech font-bold text-red-300">
                {result}
              </div>
              <div className="text-[11px] text-zinc-500">
                Аналитическая система рекомендует планировать дела независимо от заявлений объекта.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
