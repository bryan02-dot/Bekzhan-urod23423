import React, { useState } from 'react';
import { HelpCircle, Brain, Flame, AlertOctagon, RefreshCw, Cpu } from 'lucide-react';
import { sound } from '../utils/audio';

export const Case005StupidQuestions: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoadingBrain, setIsLoadingBrain] = useState(false);
  const [isOverheated, setIsOverheated] = useState(false);
  const [brainLoadProgress, setBrainLoadProgress] = useState(0);

  const questionsList = [
    '«Если я закрою глаза, меня перестанут видеть?»',
    '«А если ничего не делать, это тоже план?»',
    '«Почему мы едем туда, если ещё не приехали?»',
    '«Если экзамен сложный, можно просто попросить его стать легче?»',
    '«А права можно получить, если очень сильно захотеть?»',
    '«Если я уже сказал, что выхожу, обязательно ли выходить?»',
    '«Если светофор красный, он злится на меня или на всех?»',
    '«А в автошколе знают, что руль круглый, а Земля тоже круглая?»',
  ];

  const handleAskQuestion = () => {
    if (isOverheated) return;

    sound.playClick();
    setIsLoadingBrain(true);
    setBrainLoadProgress(0);

    const interval = setInterval(() => {
      setBrainLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoadingBrain(false);
      const nextCount = questionCount + 1;
      setQuestionCount(nextCount);

      const randomQ = questionsList[Math.floor(Math.random() * questionsList.length)];
      setCurrentQuestion(randomQ);

      if (nextCount >= 5) {
        setIsOverheated(true);
        sound.playError();
      } else {
        sound.playBeep(480, 0.1, 'sawtooth');
      }
    }, 600);
  };

  const handleCoolDown = () => {
    sound.playScan();
    setIsOverheated(false);
    setQuestionCount(0);
    setCurrentQuestion(null);
  };

  return (
    <section id="case-005" className="py-16 px-4 border-b border-red-950/60 bg-black/80 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-950/80 text-red-400 font-mono text-xs font-bold rounded border border-red-600">
              ДЕЛО №005
            </span>
            <span className="text-zinc-500 font-mono text-xs">// ИССЛЕДОВАТЕЛЬСКИЙ ЦЕНТР АБСУРДА</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span>СТАТУС: ФИЛОСОФИЯ В ТУПИКЕ</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="space-y-3 text-left">
          <h2 className="text-2xl sm:text-4xl font-heading text-white tracking-wide uppercase leading-tight">
            «ВОПРОС, ПОСЛЕ КОТОРОГО <span className="text-red-500 neon-glow-red">ЗАМОЛЧАЛИ ДАЖЕ УЧЁНЫЕ</span>».
          </h2>
          <p className="text-zinc-400 font-mono text-sm border-l-2 border-red-600 pl-4 py-1">
            Генератор интеллектуальных диверсий, ставящих под угрозу базовые законы логики и физики.
          </p>
        </div>

        {/* Question Counter Card */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950/90 border border-zinc-800 p-4 rounded-lg font-mono text-xs text-left">
          <div className="flex items-center gap-2 text-zinc-300">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Счётчик вопросов, поставивших сайт в тупик:</span>
          </div>
          <div className="text-base font-bold text-red-400 font-tech px-2 py-0.5 bg-red-950/50 rounded border border-red-800">
            {questionCount} / 5 ДО ПЕРЕГРЕВА
          </div>
        </div>

        {/* Interactive Question Machine */}
        <div className="bg-zinc-950/90 border border-red-900/70 p-6 rounded-lg text-center space-y-6 shadow-2xl relative overflow-hidden">
          {/* Overheated State */}
          {isOverheated ? (
            <div className="space-y-4 py-4">
              <div className="inline-flex p-3 bg-red-950 border border-red-500 rounded-full animate-bounce">
                <Flame className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-base sm:text-xl font-heading text-red-500 neon-glow-red tracking-wider">
                🚨 СИСТЕМА ПЕРЕГРЕЛАСЬ. ПОЖАЛУЙСТА, НЕ ЗАДАВАЙТЕ БОЛЬШЕ ВОПРОСОВ.
              </div>
              <p className="text-xs text-zinc-400 font-mono max-w-lg mx-auto">
                Сервер не выдержал концентрации нелинейной логики Бекжана. Процессоры плавятся, нейросеть ушла в бессрочный отпуск.
              </p>
              <button
                onClick={handleCoolDown}
                className="px-5 py-2.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-500 rounded font-mono text-xs uppercase font-bold tracking-wider cursor-pointer transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                ❄️ Остудить сервер жидким азотом
              </button>
            </div>
          ) : (
            <>
              {/* Trigger Button */}
              <button
                onClick={handleAskQuestion}
                disabled={isLoadingBrain}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-800 via-red-600 to-red-800 hover:from-red-700 hover:to-red-500 text-white font-heading text-base tracking-wider uppercase rounded shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer transition-all inline-flex items-center justify-center gap-2.5"
              >
                <Brain className="w-5 h-5 text-red-200 animate-pulse" />
                <span>ЗАДАТЬ ВОПРОС БЕКЖАНА</span>
              </button>

              {/* Brain Loading Animation */}
              {isLoadingBrain && (
                <div className="max-w-md mx-auto space-y-2 text-left font-mono">
                  <div className="text-xs text-amber-400 flex items-center justify-between">
                    <span>Попытка осознать вопрос...</span>
                    <span>{brainLoadProgress}%</span>
                  </div>
                  <div className="h-2 bg-zinc-900 rounded border border-zinc-700 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-100"
                      style={{ width: `${brainLoadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Display Question */}
              {currentQuestion && !isLoadingBrain && (
                <div className="p-5 bg-black/90 border-2 border-red-700/80 rounded-lg text-white font-mono shadow-[0_0_25px_rgba(239,68,68,0.3)] animate-fadeIn">
                  <div className="text-xs text-red-400 font-bold uppercase tracking-widest mb-2">
                    ВЫДАН ВОПРОС ПОВЫШЕННОЙ СЛОЖНОСТИ:
                  </div>
                  <div className="text-base sm:text-xl font-tech font-bold text-red-200">
                    {currentQuestion}
                  </div>
                  <div className="mt-3 text-[11px] text-zinc-500 border-t border-zinc-900 pt-2">
                    Вердикт учёных: «Ответа нет, и надежды на него тоже нет».
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
