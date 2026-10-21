import React, { useState } from 'react';
import { Gamepad2, ShieldX, UserCheck, MessageSquare, AlertTriangle, Lock } from 'lucide-react';
import { sound } from '../utils/audio';

export const Case003Henpecked: React.FC = () => {
  const [selectedInvite, setSelectedInvite] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [adminDenied, setAdminDenied] = useState(false);
  const [freedomLevel, setFreedomLevel] = useState(12);

  const excuses = [
    '«Брат, я бы пришёл, но у меня обстоятельства».',
    '«Щас спрошу и напишу».',
    '«Она сказала сегодня дома посидеть».',
    '«Брат, в следующий раз точно».',
    '«Я уже почти оделся… но планы изменились».',
  ];

  const handleInvite = (inviteText: string) => {
    sound.playClick();
    setSelectedInvite(inviteText);
    setIsTyping(true);
    setResponse(null);
    setAdminDenied(false);

    // Randomize initial freedom level, but it will plummet
    const randomFreedom = Math.floor(Math.random() * 30) + 5;
    setFreedomLevel(randomFreedom);

    setTimeout(() => {
      const chosenExcuse = excuses[Math.floor(Math.random() * excuses.length)];
      setResponse(chosenExcuse);
      setIsTyping(false);
      sound.playBeep(520, 0.12, 'triangle');
    }, 1200);

    // Show critical admin denied alert
    setTimeout(() => {
      setAdminDenied(true);
      setFreedomLevel(0);
      sound.playError();
    }, 2800);
  };

  return (
    <section id="case-003" className="py-16 px-4 border-b border-red-950/60 bg-black/70 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-950/80 text-red-400 font-mono text-xs font-bold rounded border border-red-600">
              ДЕЛО №003
            </span>
            <span className="text-zinc-500 font-mono text-xs">// МОНИТОРИНГ АВТОНОМИИ ОБЪЕКТА</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-pink-400 font-mono">
            <Lock className="w-4 h-4 text-pink-500" />
            <span>СТАТУС: ПОДКАБЛУЧНИК ГОДА</span>
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-3 text-left">
          <h2 className="text-2xl sm:text-4xl font-heading text-white tracking-wide uppercase leading-tight">
            «СВОБОДНЫЙ ЧЕЛОВЕК. <span className="text-red-500 neon-glow-red">НЕСВОБОДНЫЙ РАСПИСАНИЕ</span>».
          </h2>
          <p className="text-zinc-300 font-mono text-sm sm:text-base border-l-2 border-pink-600 pl-4 py-1 bg-pink-950/10">
            «Бекжан может принимать самостоятельные решения. По предварительным данным, последнее такое решение было принято до знакомства с девушкой».
          </p>
        </div>

        {/* Freedom Meter */}
        <div className="bg-zinc-950/90 border border-zinc-800 p-5 rounded-lg space-y-3 font-mono text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-pink-500" />
              ИНДЕКС ЛИЧНОЙ СВОБОДЫ ОБЪЕКТА В МОМЕНТЕ:
            </span>
            <span className={`font-tech text-base font-bold ${freedomLevel === 0 ? 'text-red-500 neon-glow-red' : 'text-pink-400'}`}>
              {freedomLevel}% {freedomLevel === 0 ? '(ПОЛНАЯ БЛОКИРОВКА)' : ''}
            </span>
          </div>
          <div className="h-4 bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                freedomLevel > 0 ? 'bg-pink-600' : 'bg-red-700 shadow-[0_0_10px_#ef4444]'
              }`}
              style={{ width: `${Math.max(3, freedomLevel)}%` }}
            />
          </div>
        </div>

        {/* Simulator Box */}
        <div className="bg-zinc-950/90 border border-red-900/60 p-6 rounded-lg text-left font-mono space-y-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 text-sm text-zinc-300 font-bold">
            <Gamepad2 className="w-5 h-5 text-red-500" />
            <span>СИТУАЦИЯ: ДРУЗЬЯ ЗОВУТ БЕКЖАНА В КОМПЬЮТЕРНЫЙ КЛУБ</span>
          </div>

          {/* 3 Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleInvite('Брат, пошли на компы.')}
              className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-red-500 rounded text-xs font-bold tracking-wide transition-all cursor-pointer text-left"
            >
              1. «Брат, пошли на компы»
            </button>
            <button
              onClick={() => handleInvite('Давай хотя бы на час.')}
              className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-red-500 rounded text-xs font-bold tracking-wide transition-all cursor-pointer text-left"
            >
              2. «Давай хотя бы на час»
            </button>
            <button
              onClick={() => handleInvite('Мы уже забронировали места.')}
              className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-red-500 rounded text-xs font-bold tracking-wide transition-all cursor-pointer text-left"
            >
              3. «Мы уже забронировали места»
            </button>
          </div>

          {/* Interactive Chat / Output */}
          {selectedInvite && (
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-2 text-xs">
                <span className="text-zinc-500 font-bold">ДРУЗЬЯ:</span>
                <span className="bg-zinc-900 text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-800">
                  {selectedInvite}
                </span>
              </div>

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Бекжан печатает ответ (и параллельно советуется)...</span>
                </div>
              )}

              {response && (
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-red-400 font-bold">БЕКЖАН:</span>
                  <span className="bg-red-950/60 text-red-200 px-3.5 py-2 rounded-lg border border-red-700 font-semibold shadow-md">
                    {response}
                  </span>
                </div>
              )}

              {/* System Notification: Denied by Admin */}
              {adminDenied && (
                <div className="p-4 bg-red-950/90 border-2 border-red-600 rounded-lg text-white font-mono shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-bounce space-y-2">
                  <div className="flex items-center gap-2 text-red-400 text-sm sm:text-base font-heading tracking-wider">
                    <ShieldX className="w-6 h-6 text-red-500 shrink-0" />
                    <span>ЗАПРОС ОТКЛОНЁН. ПРАВА АДМИНИСТРАТОРА ПРИНАДЛЕЖАТ ДЕВУШКЕ</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Код ошибки: <strong>WIFE_ROOT_ACCESS_VIOLATION</strong>. Попытка самостоятельного выхода в свет заблокирована протоколом домашнего уюта.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
