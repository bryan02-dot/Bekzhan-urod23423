import React, { useState } from 'react';
import { Lock, Unlock, AlertTriangle, ShieldAlert, Check, Copy, X, Folder, EyeOff } from 'lucide-react';
import { sound } from '../utils/audio';

export const SecretEndingModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClassifiedUnlocked, setIsClassifiedUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDeclassify = () => {
    sound.playSiren(3);
    setIsOpen(true);
    setIsClassifiedUnlocked(false);

    // Dramatic blackout and alarm effect
    setTimeout(() => {
      sound.playScan();
      setIsClassifiedUnlocked(true);
    }, 1800);
  };

  const dossierText = `БЕКЖАН — ЧЕЛОВЕК, КОТОРЫЙ МОЖЕТ:
• Пять лет сдавать на права.
• Задать вопрос, на который никто не просил отвечать.
• Звать выпить алкоголь, обещая трезвому другу кымыз в качестве отмазки.
• Собраться на компы и не прийти.
• Объяснить, почему он не виноват.
• Создать угрозу атмосфере помещения.

«ЕГО НЕЛЬЗЯ ОСТАНОВИТЬ. ЕГО МОЖНО ТОЛЬКО ДОЖДАТЬСЯ. НО НЕ ФАКТ, ЧТО ОН ПРИДЁТ».

Досье подготовлено друзьями. Все совпадения подозрительно точны.`;

  const copyToClipboard = () => {
    sound.playClick();
    navigator.clipboard.writeText(dossierText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-16 px-4 bg-black border-t border-red-950/80 text-center relative overflow-hidden">
      {/* Visual background accents */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-900 rounded-full text-red-500 font-mono text-xs">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>СЕКЦИЯ №666 // НАИВЫСШИЙ УРОВЕНЬ СЕКРЕТНОСТИ</span>
        </div>

        <h3 className="text-xl sm:text-3xl font-heading text-white uppercase tracking-wider">
          ПОЛНЫЙ ДОСТУП К АРХИВУ ДРУЖБЫ
        </h3>

        <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md mx-auto">
          Нажмите кнопку ниже, чтобы открыть финальные материалы расследования, скрытые от посторонних глаз.
        </p>

        {/* Master Declassify Button */}
        <div>
          <button
            onClick={handleDeclassify}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-800 via-red-600 to-red-900 text-white font-heading text-base sm:text-lg tracking-widest uppercase rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.7)] hover:shadow-[0_0_50px_rgba(239,68,68,1)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-red-400"
          >
            <Unlock className="w-5 h-5 text-red-200 group-hover:rotate-12 transition-transform" />
            <span>РАССЕКРЕТИТЬ АБСОЛЮТНО ВСЁ</span>
          </button>
        </div>
      </div>

      {/* Secret Dossier Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn">
          {/* Blackout / Alarm transition */}
          {!isClassifiedUnlocked ? (
            <div className="text-center space-y-4 font-mono text-red-500">
              <ShieldAlert className="w-16 h-16 mx-auto animate-ping" />
              <div className="text-xl font-heading uppercase tracking-widest animate-pulse">
                СНЯТИЕ ГРИФА СЕКРЕТНОСТИ...
              </div>
              <p className="text-xs text-zinc-400">
                Внимание! Доступ открывается по личному разрешению наблюдательного совета друзей.
              </p>
            </div>
          ) : (
            <div className="relative max-w-xl w-full bg-zinc-950 border-2 border-red-600 rounded-xl p-6 sm:p-8 text-left font-mono space-y-6 shadow-[0_0_50px_rgba(239,68,68,0.8)] overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-md bg-zinc-900 border border-zinc-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Folder Header */}
              <div className="flex items-center gap-3 border-b border-red-900/60 pb-4">
                <Folder className="w-7 h-7 text-red-500" />
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                    СЕКРЕТНАЯ ПАПКА
                  </div>
                  <div className="text-lg sm:text-xl font-heading text-red-400 uppercase tracking-wider">
                    «НЕ ДЛЯ ЧУЖИХ ГЛАЗ»
                  </div>
                </div>
              </div>

              {/* Dossier Content */}
              <div className="space-y-4">
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                  БЕКЖАН — ЧЕЛОВЕК, КОТОРЫЙ МОЖЕТ:
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-zinc-200 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Пять лет сдавать на права.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Задать вопрос, на который никто не просил отвечать.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Звать выпить алкоголь, обещая другу кымыз в качестве прикрытия.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Собраться на компы и не прийти.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Объяснить, почему он не виноват.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Создать угрозу атмосфере помещения.</span>
                  </li>
                </ul>

                {/* Final Legendary Punchline */}
                <div className="p-4 bg-red-950/60 border border-red-700 rounded-lg text-center space-y-2 shadow-inner">
                  <div className="text-sm sm:text-base font-heading text-red-400 tracking-wide uppercase leading-snug">
                    «ЕГО НЕЛЬЗЯ ОСТАНОВИТЬ. ЕГО МОЖНО ТОЛЬКО ДОЖДАТЬСЯ. НО НЕ ФАКТ, ЧТО ОН ПРИДЁТ».
                  </div>
                  <div className="text-[11px] text-zinc-400 italic pt-1 border-t border-red-900/40">
                    Досье подготовлено друзьями. Все совпадения подозрительно точны.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-900">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded text-xs font-semibold cursor-pointer transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                  <span>{copied ? 'СКОПИРОВАНО ДЛЯ ЧАТА' : 'СКОПИРОВАТЬ ДОСЬЕ'}</span>
                </button>

                <div className="stamp-classified px-3 py-1 text-[10px] font-heading uppercase tracking-widest">
                  ОРИГИНАЛ В АРХИВЕ
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
