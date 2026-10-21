import React, { useState } from 'react';
import { CupSoda, Wine, ShieldCheck, Sparkles, AlertOctagon, RefreshCw, XCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export const Case004Kymyz: React.FC = () => {
  const [currentOffer, setCurrentOffer] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [refusalCount, setRefusalCount] = useState(142);
  const [refusalFeedback, setRefusalFeedback] = useState<string | null>(null);

  const offers = [
    '«Брат, я тебе литр кымыза куплю за свой счёт, только посиди со мной, пока я пиво пью!»',
    '«Ну давай хотя бы на полчаса! Ты кымыз попьёшь, витамины получишь, а я чисто сниму стресс!»',
    '«Отказываешься? А если я найду заведение, где есть кымыз для тебя и коньяк для меня?»',
    '«Брат, кымыз — это же почти напиток чемпионов! Ты пьёшь здоровье, я пью за твоё здоровье!»',
    '«Я не алкоголик, мне просто нужен трезвый свидетель моих мудрых тостов!»',
    '«Брат, со следующего понедельника я вообще в завязке, сегодня последний раз!»',
    '«Ну пожалуйста, чисто посидим! Ты с кымызом посидишь, а я в караоке попою!»',
  ];

  const handleGenerateOffer = () => {
    sound.playClick();
    setIsGenerating(true);
    setCurrentOffer(null);

    setTimeout(() => {
      const random = offers[Math.floor(Math.random() * offers.length)];
      setCurrentOffer(random);
      setIsGenerating(false);
      sound.playBeep(640, 0.15, 'triangle');
    }, 400);
  };

  const handleRefuse = () => {
    sound.playError();
    const nextCount = refusalCount + 1;
    setRefusalCount(nextCount);

    const feedbacks = [
      '«ОТКАЗ ПРИНЯТ: Трезвость сохранена. Бекжан вздохнул и пошёл пить один».',
      '«ОТКАЗ №' + nextCount + ': Кымызная наживка не сработала. Бекжан в шоке от вашей стойкости».',
      '«ОТКАЗ ПРИНЯТ: Печень спасена. Бекжан всё ещё считает, что в следующий раз вы согласитесь».',
    ];
    setRefusalFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
  };

  return (
    <section id="case-004" className="py-16 px-4 border-b border-red-950/60 bg-gradient-to-b from-black via-zinc-950 to-black relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-950/80 text-amber-400 font-mono text-xs font-bold rounded border border-amber-600">
              ДЕЛО №004
            </span>
            <span className="text-zinc-500 font-mono text-xs">// ОПЕРАЦИЯ: «ПРИКРЫТИЕ КЫМЫЗОМ»</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 bg-red-950/80 text-red-400 border border-red-700 rounded flex items-center gap-1">
              <Wine className="w-3.5 h-3.5 text-red-500" />
              БЕКЖАН: ТЯНЕТ НА АЛКОГОЛЬ
            </span>
            <span className="px-2 py-0.5 bg-green-950/80 text-green-400 border border-green-700 rounded flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              ДРУГ: В ОТКАЗЕ
            </span>
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-3 text-left">
          <h2 className="text-2xl sm:text-4xl font-heading text-white tracking-wide uppercase leading-tight">
            «САМЫЙ ОПАСНЫЙ ЗВОНОК: <span className="text-amber-400 neon-glow-amber">БРАТ, ТЫ КЫМЫЗ ВЫПЬЕШЬ, А Я...</span>»
          </h2>
          <p className="text-zinc-300 font-mono text-sm sm:text-base border-l-2 border-amber-500 pl-4 py-1.5 bg-amber-950/10">
            «Следствие установило: Бекжан постоянно зовёт выпить алкоголь. Но поскольку друг категорически отказывается пить, у Бекжана созрела "гениальная" схема вербовки: предлагать другу целебный кымыз, лишь бы тот согласился составить компанию его алкогольным похождениям!»
          </p>
        </div>

        {/* Tactical Diagram: The Scheme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs text-left">
          <div className="p-3.5 bg-zinc-950/90 border border-red-900/60 rounded-lg space-y-1">
            <div className="text-red-400 font-bold flex items-center gap-1.5">
              <Wine className="w-4 h-4 text-red-500" />
              ЦЕЛЬ БЕКЖАНА:
            </div>
            <div className="text-zinc-300">
              Выпить пива, виски или коктейлей. Душа требует движения и посиделок до трёх ночи.
            </div>
          </div>

          <div className="p-3.5 bg-zinc-950/90 border border-amber-900/60 rounded-lg space-y-1">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <CupSoda className="w-4 h-4 text-amber-500" />
              МАСКИРОВКА (НАЖИВКА):
            </div>
            <div className="text-zinc-300">
              «Брат, ты чисто кымыз попьёшь, витамины! Я тебе литр возьму, чисто посидим!»
            </div>
          </div>

          <div className="p-3.5 bg-zinc-950/90 border border-green-900/60 rounded-lg space-y-1">
            <div className="text-green-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              ОТВЕТ ДРУГА:
            </div>
            <div className="text-zinc-300 font-semibold text-green-300">
              «НЕТ. Я отказываюсь. Знаю я твой "кымыз" — опять сам накидаешься».
            </div>
          </div>
        </div>

        {/* Authentic Messenger UI */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-xl mx-auto overflow-hidden shadow-2xl font-mono text-xs sm:text-sm">
          {/* Messenger Bar */}
          <div className="bg-zinc-900/90 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-red-900 border border-red-500 flex items-center justify-center font-bold text-red-200">
                Б
              </div>
              <div>
                <div className="text-white font-bold flex items-center gap-1.5">
                  Бекжан (Постоянно зовёт выпить)
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="text-[11px] text-zinc-400">был(а) в сети 6 часов назад</div>
              </div>
            </div>
            <div className="text-[10px] text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
              ЧАТ «ВЕРБОВКА»
            </div>
          </div>

          {/* Messages Feed */}
          <div className="p-4 space-y-3 bg-black/60 min-h-[340px] flex flex-col justify-end text-left">
            {/* Bekzhan */}
            <div className="flex justify-start">
              <div className="bg-zinc-900 text-zinc-200 px-3.5 py-2 rounded-2xl rounded-tl-sm max-w-[85%] border border-zinc-800">
                «Брат, посидим сегодня? Чисто выпьем немного!»
                <div className="text-[9px] text-zinc-500 text-right mt-1">17:15</div>
              </div>
            </div>

            {/* You refuse */}
            <div className="flex justify-end">
              <div className="bg-green-950/70 text-green-200 px-3.5 py-2 rounded-2xl rounded-tr-sm max-w-[85%] border border-green-800 font-semibold">
                «Я не пью вообще, ты же знаешь. Я отказываюсь».
                <div className="text-[9px] text-green-400/60 text-right mt-1">17:16 ✓✓</div>
              </div>
            </div>

            {/* Bekzhan brings up kymyz */}
            <div className="flex justify-start">
              <div className="bg-zinc-900 text-amber-200 px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] border border-amber-800/80">
                «Да подожди, брат! Я тебе кымыз куплю! Ты будешь сидеть кымыз пить, оздоравливаться, а я чисто пиво/виски! Самое главное вместе посидим, пообщаемся!»
                <div className="text-[9px] text-zinc-500 text-right mt-1">17:17</div>
              </div>
            </div>

            {/* You refuse again */}
            <div className="flex justify-end">
              <div className="bg-green-950/70 text-green-200 px-3.5 py-2 rounded-2xl rounded-tr-sm max-w-[85%] border border-green-800">
                «Нет, Бекжан. Ты опять накидаешься в ноль и начнёшь объяснять устройство вселенной. Я дома».
                <div className="text-[9px] text-green-400/60 text-right mt-1">17:18 ✓✓</div>
              </div>
            </div>

            {/* Bekzhan */}
            <div className="flex justify-start">
              <div className="bg-zinc-900 text-zinc-200 px-3.5 py-2 rounded-2xl rounded-tl-sm max-w-[85%] border border-zinc-800">
                «Щас решим. Я уже кымыз ищу, брат, всё под контролем...»
                <div className="text-[9px] text-zinc-500 text-right mt-1">17:20</div>
              </div>
            </div>

            {/* System 6 hours later */}
            <div className="flex justify-center my-1.5">
              <span className="bg-red-950/50 text-red-400 text-[11px] px-3 py-1 rounded-full border border-red-900/60 font-semibold animate-pulse">
                ⏱️ Прошло 6 часов... (00:20 ночи)
              </span>
            </div>

            {/* You */}
            <div className="flex justify-end">
              <div className="bg-green-950/70 text-green-200 px-3.5 py-2 rounded-2xl rounded-tr-sm max-w-[85%] border border-green-800">
                «Ну что, где твой кымыз?»
                <div className="text-[9px] text-green-400/60 text-right mt-1">00:21 ✓✓</div>
              </div>
            </div>

            {/* Bekzhan drunk */}
            <div className="flex justify-start">
              <div className="bg-red-950/70 text-red-200 px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] border border-red-800 font-bold">
                «Брааат... короче кымыз не нашли, но мы тут с пацанами уже пятую бутылку открываем, подъезжай на такси, ты мне нужен!»
                <div className="text-[9px] text-red-400/60 text-right mt-1">00:23</div>
              </div>
            </div>

            {/* System Final verdict */}
            <div className="p-3 bg-red-950/80 border border-red-700 rounded-lg text-center text-xs text-red-300 font-bold space-y-1 shadow-lg">
              <div>🚫 Кымыз не был даже заказан.</div>
              <div>🍺 Бекжан подтвердил статус скрытого алкоголика. Друг снова спас свою трезвость.</div>
            </div>
          </div>
        </div>

        {/* Interactive Refusal Button & Stats */}
        <div className="max-w-xl mx-auto bg-zinc-950/90 border border-green-800/80 p-5 rounded-lg space-y-4 text-center font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              СЧЁТЧИК УСПЕШНЫХ ОТКАЗОВ ОТ АЛКО-ВЫЛАЗОК:
            </span>
            <span className="text-green-400 font-bold text-base font-tech bg-green-950/70 px-2 py-0.5 rounded border border-green-700">
              {refusalCount} РАЗ
            </span>
          </div>

          <button
            onClick={handleRefuse}
            className="w-full py-3 px-4 bg-green-900/80 hover:bg-green-800 text-green-100 font-heading text-xs sm:text-sm uppercase tracking-wider rounded border border-green-500 cursor-pointer transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            <XCircle className="w-4 h-4 text-green-400" />
            <span>ОТКАЗАТЬСЯ В ОЧЕРЕДНОЙ РАЗ («Я НЕ ПЬЮ, БЕКЖАН»)</span>
          </button>

          {refusalFeedback && (
            <div className="p-3 bg-black/90 border border-green-600 rounded text-xs text-green-300 font-bold animate-fadeIn">
              {refusalFeedback}
            </div>
          )}
        </div>

        {/* Generator: «ЧТО ОН ПРЕДЛОЖИТ СЕГОДНЯ, ЧТОБЫ ВЫПИТЬ?» */}
        <div className="bg-zinc-950/90 border border-amber-900/60 p-6 rounded-lg max-w-xl mx-auto space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            ГЕНЕРАТОР ЗАМАНУХ: «КЫМЫЗ ДЛЯ ТЕБЯ, ВЫПИВКА ДЛЯ МЕНЯ»
          </div>

          <button
            onClick={handleGenerateOffer}
            disabled={isGenerating}
            className="w-full py-3 px-6 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-white font-heading text-sm uppercase tracking-wider rounded shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>КАК ОН БУДЕТ ЗАМАНИВАТЬ СЕГОДНЯ?</span>
          </button>

          {currentOffer && (
            <div className="p-4 bg-black/90 border border-amber-500 rounded text-amber-200 font-mono text-sm sm:text-base font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-fadeIn">
              {currentOffer}
            </div>
          )}

          <p className="text-[11px] font-mono text-zinc-500 pt-1 italic">
            «Все обещания купить кымыз являются предварительными и заканчиваются походом в пивной магазин».
          </p>
        </div>
      </div>
    </section>
  );
};
