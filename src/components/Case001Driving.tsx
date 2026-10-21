import React, { useState, useEffect } from 'react';
import { Car, AlertCircle, PhoneCall, Calendar, History, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export const Case001Driving: React.FC = () => {
  const [progress, setProgress] = useState(99);
  const [isGlitching, setIsGlitching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeModal, setActiveModal] = useState<'booking' | 'attempts' | 'call' | null>(null);
  const [callRinging, setCallRinging] = useState(false);

  // Trigger dramatic progress drop
  const recalculateChances = () => {
    sound.playClick();
    setIsGlitching(true);
    setErrorMessage('');
    setProgress(99);

    const steps = [
      { val: 99, delay: 200 },
      { val: 84, delay: 500 },
      { val: 51, delay: 900 },
      { val: 23, delay: 1300 },
      { val: 9, delay: 1700 },
      { val: 1, delay: 2200 },
    ];

    steps.forEach(({ val, delay }) => {
      setTimeout(() => {
        setProgress(val);
        sound.playBeep(400 - val * 2, 0.08, 'sawtooth');
      }, delay);
    });

    setTimeout(() => {
      setIsGlitching(false);
      sound.playError();
      setErrorMessage('Обнаружена новая ошибка. Попробуйте в следующей жизни… или на следующей пересдаче.');
    }, 2500);
  };

  const handleBooking = () => {
    sound.playClick();
    setActiveModal('booking');
  };

  const handleAttempts = () => {
    sound.playClick();
    setActiveModal('attempts');
  };

  const handleCallInstructor = () => {
    sound.playScan();
    setActiveModal('call');
    setCallRinging(true);

    setTimeout(() => {
      sound.playError();
      setCallRinging(false);
    }, 2200);
  };

  return (
    <section id="case-001" className="py-16 px-4 border-b border-red-950/60 bg-black/60 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-900/60 text-red-300 font-mono text-xs font-bold rounded border border-red-700">
              ДЕЛО №001
            </span>
            <span className="text-zinc-500 font-mono text-xs">// РАССЛЕДОВАНИЕ ВЕКА</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
            <Car className="w-4 h-4 text-amber-500" />
            <span>СТАТУС: ПЕШЕХОД ПОНЕВОЛЕ (5 ЛЕТ)</span>
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-3 text-left">
          <h2 className="text-2xl sm:text-4xl font-heading text-white tracking-wide uppercase leading-tight">
            «ПЯТЬ ЛЕТ. СОТНИ ВОЗМОЖНОСТЕЙ. <span className="text-red-500 neon-glow-red">НОЛЬ ВОДИТЕЛЬСКИХ ПРАВ</span>».
          </h2>
          <p className="text-zinc-300 font-mono text-sm sm:text-base border-l-2 border-red-600 pl-4 py-1 bg-red-950/10">
            «Следствие установило: Бекжан уже пять лет находится в отношениях с автошколой. Экзамен пока не готов к серьёзному шагу».
          </p>
        </div>

        {/* Dramatic Progress Bar Gauge */}
        <div className="bg-zinc-950/90 border border-red-900/70 p-6 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.15)] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              ШКАЛА ГОТОВНОСТИ К ПОЛУЧЕНИЮ ПРАВ:
            </span>
            <span className="font-tech text-base font-bold text-red-400">
              {progress}%
            </span>
          </div>

          <div className="h-6 w-full bg-zinc-900 border border-red-800/80 rounded-sm overflow-hidden p-0.5 relative">
            <div
              className={`h-full transition-all duration-300 ease-out rounded-xs ${
                progress > 50
                  ? 'bg-gradient-to-r from-amber-500 to-red-500'
                  : 'bg-red-600 shadow-[0_0_12px_#ef4444]'
              }`}
              style={{ width: `${progress}%` }}
            />
            {isGlitching && (
              <div className="absolute inset-0 bg-red-500/20 animate-pulse pointer-events-none" />
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <button
              onClick={recalculateChances}
              disabled={isGlitching}
              className="text-xs font-mono bg-red-950 hover:bg-red-900 text-red-200 border border-red-700 px-3 py-1.5 rounded cursor-pointer transition-colors"
            >
              🔄 Пересчитать шансы в реальном времени
            </button>
            <div className="text-[11px] font-mono text-zinc-500">
              Расчёт алгоритма: вероятность сдачи стремится к сингулярности
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="mt-4 p-3.5 bg-red-950/70 border border-red-600 rounded text-red-200 font-mono text-xs sm:text-sm flex items-start gap-3 shadow-[0_0_15px_rgba(239,68,68,0.35)] animate-bounce">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-400">КРИТИЧЕСКИЙ СБОЙ: </strong>
                {errorMessage}
              </div>
            </div>
          )}
        </div>

        {/* 3 Interactive Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={handleBooking}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-red-950/70 text-zinc-200 hover:text-white border border-red-900/60 hover:border-red-500 rounded font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4 text-red-500" />
            <span>ЗАПИСАТЬСЯ НА ЭКЗАМЕН</span>
          </button>

          <button
            onClick={handleAttempts}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-red-950/70 text-zinc-200 hover:text-white border border-red-900/60 hover:border-red-500 rounded font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <History className="w-4 h-4 text-amber-500" />
            <span>ПОСМОТРЕТЬ ПРЕДЫДУЩИЕ ПОПЫТКИ</span>
          </button>

          <button
            onClick={handleCallInstructor}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-red-950/70 text-zinc-200 hover:text-white border border-red-900/60 hover:border-red-500 rounded font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <PhoneCall className="w-4 h-4 text-green-500" />
            <span>ПОЗВОНИТЬ ИНСТРУКТОРУ</span>
          </button>
        </div>

        {/* Modals for Funny Scenarios */}
        {activeModal === 'booking' && (
          <div className="p-4 bg-zinc-950 border border-red-700 rounded-lg text-left font-mono space-y-3 relative shadow-2xl">
            <div className="flex items-center justify-between text-xs text-red-400 border-b border-zinc-800 pb-2">
              <span className="font-bold">ПОРТАЛ ЭЛЕКТРОННОЙ ЗАПИСИ АВТОЦОН</span>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕ ЗАКРЫТЬ
              </button>
            </div>
            <p className="text-xs text-zinc-300">
              Попытка бронирования слота для кандидата: <strong>БЕКЖАН (ИИН: ************)</strong>
            </p>
            <div className="p-3 bg-red-950/40 border border-red-800/80 rounded text-xs text-red-300 space-y-1">
              <div>⚠️ <strong>ОТКАЗ СЕРВЕРА:</strong> Все слоты на автодроме до 2049 года забронированы инструкторами в целях личной безопасности.</div>
              <div className="text-zinc-400 text-[11px] pt-1">
                Система предлагает альтернативный вариант: «Пешая ходьба на свежем воздухе полезна для здоровья».
              </div>
            </div>
          </div>
        )}

        {activeModal === 'attempts' && (
          <div className="p-4 bg-zinc-950 border border-amber-700/80 rounded-lg text-left font-mono space-y-3 relative shadow-2xl">
            <div className="flex items-center justify-between text-xs text-amber-400 border-b border-zinc-800 pb-2">
              <span className="font-bold">ЖУРНАЛ ИСПЫТАНИЙ ОБЪЕКТА (ИЗБРАННЫЕ ЭПИЗОДЫ)</span>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕ ЗАКРЫТЬ
              </button>
            </div>
            <div className="space-y-2 text-xs text-zinc-300 max-h-56 overflow-y-auto pr-2">
              <div className="p-2 bg-zinc-900 border-l-2 border-red-500 rounded-r">
                <span className="text-red-400 font-bold">2021 год — Попытка №1:</span> Сбил конус силой мысли ещё до запуска двигателя.
              </div>
              <div className="p-2 bg-zinc-900 border-l-2 border-red-500 rounded-r">
                <span className="text-red-400 font-bold">2022 год — Попытка №14:</span> Перепутал педаль газа с обещанием перезвонить друзьям.
              </div>
              <div className="p-2 bg-zinc-900 border-l-2 border-red-500 rounded-r">
                <span className="text-red-400 font-bold">2023 год — Попытка №38:</span> Пытался договориться со сплошной линией разметки.
              </div>
              <div className="p-2 bg-zinc-900 border-l-2 border-red-500 rounded-r">
                <span className="text-red-400 font-bold">2024 год — Попытка №59:</span> Спросил у гаишника: «А если машина стоит, мы всё равно движемся сквозь пространство?».
              </div>
              <div className="p-2 bg-zinc-900 border-l-2 border-red-500 rounded-r">
                <span className="text-red-400 font-bold">2025 год — Попытка №72:</span> Инструктор молча вышел на эстакаде и пошёл пешком в Тибет.
              </div>
            </div>
          </div>
        )}

        {activeModal === 'call' && (
          <div className="p-4 bg-zinc-950 border border-green-700/80 rounded-lg text-left font-mono space-y-3 relative shadow-2xl">
            <div className="flex items-center justify-between text-xs text-green-400 border-b border-zinc-800 pb-2">
              <span className="font-bold">СПЕЦЛИНИЯ СВЯЗИ: ИНСТРУКТОР АВТОШКОЛЫ</span>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕ ЗАКРЫТЬ
              </button>
            </div>
            {callRinging ? (
              <div className="p-4 text-center space-y-2">
                <div className="text-sm text-green-400 animate-pulse">Гудки... Идёт соединение с абонентом...</div>
                <div className="text-xs text-zinc-500">Определитель номера: «БЕКЖАН (СНОВА ОН)»</div>
              </div>
            ) : (
              <div className="p-4 bg-red-950/50 border border-red-700 rounded text-center space-y-2">
                <div className="text-sm sm:text-base font-bold text-red-300">
                  «Инструктор увидел номер и ушёл на больничный».
                </div>
                <div className="text-xs text-zinc-400">
                  Автоответчик: «Данный номер вне зоны действия здравого смысла до следующего года».
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
