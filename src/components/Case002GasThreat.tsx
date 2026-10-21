import React, { useState, useEffect, useRef } from 'react';
import { Wind, AlertOctagon, Skull, Flame, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

export const Case002GasThreat: React.FC = () => {
  const [alarmActive, setAlarmActive] = useState(false);
  const [airQuality, setAirQuality] = useState(98);
  const [stage, setStage] = useState<'idle' | 'warning' | 'smoke' | 'critical' | 'cleared'>('idle');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle particle smoke simulation
  useEffect(() => {
    if (!alarmActive || stage === 'cleared') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }> = [];

    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 100,
        y: height - 20,
        radius: Math.random() * 25 + 15,
        vx: (Math.random() - 0.5) * 3,
        vy: -(Math.random() * 2.5 + 1.2),
        alpha: Math.random() * 0.4 + 0.3,
        color: Math.random() > 0.5 ? 'rgba(74, 222, 128,' : 'rgba(239, 68, 68,', // toxic green/red cartoon smoke
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.radius += 0.35;
        p.alpha -= 0.003;

        if (p.alpha <= 0 || p.y < -50) {
          p.x = width / 2 + (Math.random() - 0.5) * 120;
          p.y = height - 20;
          p.radius = Math.random() * 20 + 10;
          p.alpha = Math.random() * 0.4 + 0.3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0, p.alpha)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [alarmActive, stage]);

  const startAtmosphereCheck = () => {
    sound.playGasRelease();
    sound.playSiren(3);
    setAlarmActive(true);
    setStage('warning');
    setAirQuality(98);

    // Drop air quality to 0% progressively
    const drops = [
      { q: 75, delay: 500 },
      { q: 45, delay: 1000 },
      { q: 18, delay: 1500 },
      { q: 0, delay: 2200 },
    ];

    drops.forEach(({ q, delay }) => {
      setTimeout(() => {
        setAirQuality(q);
        if (q > 0) sound.playBeep(250 + q * 4, 0.08, 'sawtooth');
      }, delay);
    });

    setTimeout(() => {
      setStage('smoke');
    }, 800);

    setTimeout(() => {
      setStage('critical');
      sound.playError();
    }, 2400);
  };

  const handleEvacuate = () => {
    sound.playClick();
    sound.playBeep(600, 0.3, 'sine');
    setAlarmActive(false);
    setStage('cleared');
    setAirQuality(100);
  };

  return (
    <section id="case-002" className="py-16 px-4 border-b border-red-950/60 bg-gradient-to-b from-black/80 via-zinc-950 to-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-950/80 text-red-400 font-mono text-xs font-bold rounded border border-red-600">
              ДЕЛО №002
            </span>
            <span className="text-zinc-500 font-mono text-xs">// РАДИАЦИОННО-ХИМИЧЕСКИЙ ОТДЕЛ</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
            <AlertOctagon className="w-4 h-4 text-red-500 animate-pulse" />
            <span>КОД УГРОЗЫ: ГАЗОВАЯ АТАКА</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="space-y-3 text-left">
          <h2 className="text-2xl sm:text-4xl font-heading text-white tracking-wide uppercase leading-tight">
            «БИОЛОГИЧЕСКОЕ ОРУЖИЕ: <span className="text-red-500 neon-glow-red">ПРОИСХОЖДЕНИЕ НЕ УСТАНОВЛЕНО</span>».
          </h2>
          <p className="text-zinc-300 font-tech font-bold text-base sm:text-lg text-amber-300/90 border-l-2 border-amber-500 pl-4 py-1">
            «Один человек. Закрытое помещение. И почему-то все открывают окна».
          </p>
        </div>

        {/* Tactical Indicators Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-950/90 border border-red-900/70 p-5 rounded-lg space-y-3 font-mono text-xs sm:text-sm text-left">
            <div className="text-red-400 font-bold uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Skull className="w-4 h-4 text-red-500" />
              ТАКТИКО-ТЕХНИЧЕСКИЕ ПОКАЗАТЕЛИ:
            </div>
            <ul className="space-y-2.5 text-zinc-300">
              <li className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-400">Радиус поражения:</span>
                <span className="text-amber-400 font-semibold text-right">Зависит от вентиляции</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-400">Время эвакуации:</span>
                <span className="text-red-400 font-semibold text-right">До осознания происходящего</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-400">Уровень опасности:</span>
                <span className="text-red-500 font-bold text-right neon-glow-red uppercase">КРАСНЫЙ</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-400">Система вентиляции:</span>
                <span className="text-zinc-300 text-right">Подала заявление об увольнении</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-400">Эксперты:</span>
                <span className="text-zinc-300 text-right">Попросили проводить исследования на улице</span>
              </li>
            </ul>
          </div>

          {/* Interactive Atmospheric Sensor Display */}
          <div className="relative bg-zinc-950/90 border border-red-900/70 p-5 rounded-lg flex flex-col justify-between overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            {/* Canvas for cartoon smoke */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                alarmActive ? 'opacity-85' : 'opacity-0'
              }`}
            />

            <div className="relative z-10 space-y-4 text-left font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-cyan-400" /> ДАТЧИК КАЧЕСТВА ВОЗДУХА:
                </span>
                <span
                  className={`text-sm font-bold font-tech px-2 py-0.5 rounded ${
                    airQuality > 50
                      ? 'text-green-400 bg-green-950/60'
                      : airQuality > 20
                      ? 'text-amber-400 bg-amber-950/60 animate-pulse'
                      : 'text-red-400 bg-red-950/80 animate-ping'
                  }`}
                >
                  {airQuality}%
                </span>
              </div>

              {/* Progress Bar for Air */}
              <div className="h-4 bg-zinc-900 rounded border border-zinc-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    airQuality > 60
                      ? 'bg-green-500'
                      : airQuality > 25
                      ? 'bg-amber-500'
                      : 'bg-red-600 shadow-[0_0_15px_#ef4444]'
                  }`}
                  style={{ width: `${airQuality}%` }}
                />
              </div>

              {/* Status readout */}
              {stage === 'idle' && (
                <div className="text-xs text-zinc-400 bg-zinc-900/80 p-3 rounded border border-zinc-800">
                  Атмосфера в норме. Бекжан пока сидит спокойно и не подаёт признаков термодинамической активности.
                </div>
              )}

              {stage === 'warning' && (
                <div className="text-xs text-amber-300 bg-amber-950/80 p-3 rounded border border-amber-600 animate-pulse">
                  ⚠️ ВНИМАНИЕ: Зафиксировано резкое падение содержания кислорода! Датчики фиксируют аномальный выброс.
                </div>
              )}

              {(stage === 'smoke' || stage === 'critical') && (
                <div className="space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-red-400 bg-red-950/90 p-3 rounded border border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                    🚨 КРИТИЧЕСКАЯ ОШИБКА: СВЕЖИЙ ВОЗДУХ НЕ НАЙДЕН.
                  </div>
                  <div className="text-xs text-amber-200 bg-black/80 p-2.5 rounded border border-red-800/80 italic">
                    «Бекжан заявил, что это не он. Расследование продолжается».
                  </div>
                </div>
              )}

              {stage === 'cleared' && (
                <div className="text-xs text-green-300 bg-green-950/80 p-3 rounded border border-green-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-400" />
                  Форточки открыты! Помещение экстренно проветрено. Бекжан остался сидеть с невинным лицом.
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="relative z-10 pt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={startAtmosphereCheck}
                className="flex-1 py-2.5 px-4 bg-red-700 hover:bg-red-600 text-white font-mono text-xs uppercase font-bold tracking-wider rounded shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>ЗАПУСТИТЬ ПРОВЕРКУ АТМОСФЕРЫ</span>
              </button>

              {alarmActive && (
                <button
                  onClick={handleEvacuate}
                  className="py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-black font-mono text-xs uppercase font-bold tracking-wider rounded shadow-[0_0_20px_rgba(245,158,11,0.8)] cursor-pointer transition-all flex items-center justify-center gap-1.5 animate-bounce"
                >
                  <Wind className="w-4 h-4" />
                  <span>ЭВАКУАЦИЯ (ПРОВЕТРИТЬ)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
