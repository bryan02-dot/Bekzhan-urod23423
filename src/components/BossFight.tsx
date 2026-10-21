import React, { useState } from 'react';
import { Swords, Shield, Heart, Zap, Sparkles, RefreshCcw, Skull, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface BattleLog {
  id: string;
  sender: 'player' | 'boss' | 'system';
  text: string;
}

export const BossFight: React.FC = () => {
  const MAX_BOSS_HP = 500;
  const MAX_PLAYER_HP = 120;

  const [bossHp, setBossHp] = useState(MAX_BOSS_HP);
  const [playerHp, setPlayerHp] = useState(MAX_PLAYER_HP);
  const [playerEnergy, setPlayerEnergy] = useState(100);
  const [bossShield, setBossShield] = useState(false);
  const [gameState, setGameState] = useState<'idle' | 'fighting' | 'won' | 'lost'>('idle');
  const [logs, setLogs] = useState<BattleLog[]>([]);
  const [bossActionText, setBossActionText] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const addLog = (sender: 'player' | 'boss' | 'system', text: string) => {
    setLogs((prev) => [
      { id: Math.random().toString(), sender, text },
      ...prev.slice(0, 7),
    ]);
  };

  const startFight = () => {
    sound.playSiren(1);
    setBossHp(MAX_BOSS_HP);
    setPlayerHp(MAX_PLAYER_HP);
    setPlayerEnergy(100);
    setBossShield(false);
    setGameState('fighting');
    setLogs([
      {
        id: '1',
        sender: 'system',
        text: 'БИТВА НАЧАЛАСЬ! Босс Бекжан достал ключи от несуществующей машины и готов спорить!',
      },
    ]);
  };

  // Boss Counterattack Turn
  const triggerBossTurn = (currentBossHp: number) => {
    if (currentBossHp <= 0) return;

    setIsAnimating(true);
    const bossAbilities = [
      {
        name: '«Глупый вопрос»',
        damage: 18,
        desc: 'Бекжан спросил: «Если я стою на месте, почему планета летит?». Ваш мозг закипел (-18 HP).',
      },
      {
        name: '«Газовая атака»',
        damage: 22,
        desc: 'Бекжан тихо выдохнул токсичное облако. Кислород в комнате кончился (-22 HP).',
      },
      {
        name: '«Я щас выхожу»',
        damage: 10,
        heal: 45,
        desc: 'Бекжан заявил «Я уже в лифте» и восстановил себе +45 HP, оставшись лежать на диване.',
      },
      {
        name: '«Брат, ты кымыз попей, а я выпью!»',
        damage: 15,
        desc: 'Бекжан опять зовёт на пьянку под видом "попить кымыз": «Ты чисто кымыз, а я пива, брат!». Вы с трудом удерживаете отказ (-15 HP).',
      },
      {
        name: '«Девушка не разрешила»',
        damage: 0,
        shield: true,
        desc: 'Бекжан укрылся абсолютным щитом: «Она сказала дома сидеть». Все входящие атаки заблокированы!',
      },
      {
        name: '«Я тебе всё объясню»',
        damage: 24,
        desc: 'Бекжан начал 40-минутное голосовое сообщение с объяснениями. У вас лопнуло терпение (-24 HP).',
      },
    ];

    const ability = bossAbilities[Math.floor(Math.random() * bossAbilities.length)];
    setBossActionText(ability.name);

    setTimeout(() => {
      sound.playHit();

      if (ability.heal) {
        setBossHp((prev) => Math.min(MAX_BOSS_HP, prev + ability.heal!));
      }
      if (ability.shield) {
        setBossShield(true);
      }

      setPlayerHp((prev) => {
        const next = Math.max(0, prev - ability.damage);
        if (next <= 0) {
          setGameState('lost');
          sound.playError();
        }
        return next;
      });

      addLog('boss', `Бекжан применил ${ability.name}: ${ability.desc}`);
      setIsAnimating(false);
    }, 900);
  };

  // Player Actions
  const handlePlayerAction = (
    type: 'school' | 'callGirl' | 'entrance' | 'window' | 'promise'
  ) => {
    if (gameState !== 'fighting' || isAnimating) return;

    sound.playClick();
    setIsAnimating(true);
    setBossActionText(null);

    let damage = 0;
    let energyCost = 0;
    let logMsg = '';

    if (type === 'school') {
      damage = bossShield ? 15 : 95;
      energyCost = 20;
      logMsg = 'Вы показали график пересдач автошколы! Психологическая травма нанесла Бекжану 95 урона!';
      if (bossShield) logMsg += ' (Щит частично поглотил удар)';
    } else if (type === 'callGirl') {
      damage = 80;
      energyCost = 25;
      setBossShield(false);
      logMsg = 'Вы позвонили его девушке! Щит Бекжана мгновенно расколот вдребезги! (-80 HP)';
    } else if (type === 'entrance') {
      damage = bossShield ? 20 : 105;
      energyCost = 30;
      logMsg = 'Вы написали: «Мы уже у тебя в подъезде!». Бекжан в панике начал надевать носки! (-105 HP)';
    } else if (type === 'window') {
      damage = 30;
      energyCost = 15;
      setPlayerHp((prev) => Math.min(MAX_PLAYER_HP, prev + 35));
      logMsg = 'Вы настежь открыли форточку! Вентиляция восстановила вам +35 HP!';
    } else if (type === 'promise') {
      damage = bossShield ? 40 : 150;
      energyCost = 40;
      logMsg = 'УЛЬТИМАТИВНЫЙ УДАР: Вы напомнили обещание 2021 года! Реальность сжалась, нанеся критические 150 урона!';
    }

    setPlayerEnergy((prev) => Math.max(0, prev - energyCost));

    setTimeout(() => {
      sound.playHit();
      const nextBossHp = Math.max(0, bossHp - damage);
      setBossHp(nextBossHp);
      addLog('player', logMsg);

      if (nextBossHp <= 0) {
        setGameState('won');
        sound.playFanfare();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#f59e0b', '#ffffff'],
        });
        setIsAnimating(false);
      } else {
        setTimeout(() => {
          triggerBossTurn(nextBossHp);
        }, 600);
      }
    }, 400);
  };

  return (
    <section id="boss-fight" className="py-16 px-4 border-b border-red-950/60 bg-gradient-to-b from-black via-zinc-950 to-black relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-950 text-red-500 font-mono text-xs font-bold rounded border border-red-600 animate-pulse">
              ФИНАЛЬНЫЙ БОСС
            </span>
            <span className="text-zinc-500 font-mono text-xs">// РЕШАЮЩАЯ БИТВА ЗА ЗДРАВЫЙ СМЫСЛ</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
            <Swords className="w-4 h-4 text-red-500" />
            <span>БОСС: БЕКЖАН (УРОВЕНЬ 99 ПО ОТМАЗКАМ)</span>
          </div>
        </div>

        {/* Start Game or Arena */}
        {gameState === 'idle' ? (
          <div className="bg-zinc-950/90 border-2 border-red-900/80 p-8 rounded-xl text-center space-y-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-950/60 border-2 border-red-600 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(239,68,68,0.5)]">
              👑
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase">
                ГОТОВ ЛИ ТЫ СРАЗИТЬСЯ С БЕКЖАНОМ?
              </h3>
              <p className="text-zinc-400 font-mono text-xs sm:text-sm max-w-lg mx-auto">
                Его шкала уворотов от экзамена по вождению прокачана на максимум. Его отговорки способны пробить любую броню логики.
              </p>
            </div>
            <button
              onClick={startFight}
              className="px-8 py-4 bg-gradient-to-r from-red-700 via-red-600 to-red-800 hover:from-red-600 hover:to-red-500 text-white font-heading text-lg tracking-wider uppercase rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.7)] cursor-pointer transition-all hover:scale-105 inline-flex items-center gap-2.5"
            >
              <Swords className="w-5 h-5" />
              <span>НАЧАТЬ БИТВУ С БОССОМ</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Arena Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Boss Card */}
              <div className="bg-zinc-950/90 border-2 border-red-800 p-6 rounded-xl space-y-4 relative shadow-[0_0_25px_rgba(239,68,68,0.3)] text-left font-mono">
                {bossShield && (
                  <div className="absolute top-3 right-3 bg-pink-950 border border-pink-500 text-pink-300 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 animate-pulse">
                    <Shield className="w-3 h-3" /> ЩИТ: ДЕВУШКА ДОМА
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-red-950 border border-red-500 flex items-center justify-center text-3xl shrink-0 shadow-md">
                    🚗
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-red-500 font-bold uppercase tracking-wider">ФИНАЛЬНЫЙ БОСС</div>
                    <div className="text-xl font-heading text-white">БЕКЖАН «ПРАВА-2030»</div>
                    <div className="text-[11px] text-zinc-400">Спецспособность: «Я уже выезжаю»</div>
                  </div>
                </div>

                {/* Boss HP Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-red-500" /> ЗДОРОВЬЕ БОССА:
                    </span>
                    <span className="font-tech font-bold text-red-400">
                      {bossHp} / {MAX_BOSS_HP}
                    </span>
                  </div>
                  <div className="h-4 bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                      style={{ width: `${(bossHp / MAX_BOSS_HP) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Boss action bubble */}
                {bossActionText && (
                  <div className="p-3 bg-red-950/70 border border-red-600 rounded text-red-300 text-xs font-bold animate-pulse">
                    ⚡ БОСС ИСПОЛЬЗУЕТ: {bossActionText}!
                  </div>
                )}
              </div>

              {/* Player Card */}
              <div className="bg-zinc-950/90 border border-zinc-800 p-6 rounded-xl space-y-4 text-left font-mono shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-3xl shrink-0">
                    🛡️
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-green-400 font-bold uppercase tracking-wider">ИГРОК</div>
                    <div className="text-xl font-heading text-white">ДРУЗЬЯ БЕКЖАНА</div>
                    <div className="text-[11px] text-zinc-400">Оружие: Терпение и факты</div>
                  </div>
                </div>

                {/* Player HP */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-green-500" /> ВАШЕ ТЕРПЕНИЕ (HP):
                    </span>
                    <span className="font-tech font-bold text-green-400">
                      {playerHp} / {MAX_PLAYER_HP}
                    </span>
                  </div>
                  <div className="h-4 bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${(playerHp / MAX_PLAYER_HP) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Player Energy */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" /> ЭНЕРГИЯ АРГУМЕНТОВ:
                    </span>
                    <span className="font-tech font-bold text-amber-400">
                      {playerEnergy}%
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${playerEnergy}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Victory / Defeat Screens */}
            {gameState === 'won' && (
              <div className="p-6 bg-green-950/80 border-2 border-green-500 rounded-xl text-center space-y-4 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-fadeIn">
                <div className="text-2xl sm:text-3xl font-heading text-green-400 uppercase">
                  🎉 ПОЗДРАВЛЯЕМ! ТЫ ПОБЕДИЛ БЕКЖАНА.
                </div>
                <p className="text-sm font-mono text-green-200">
                  «НО ОН УЖЕ ПИШЕТ, ЧТО ЭТО БЫЛА НЕЧЕСТНАЯ ПОБЕДА».
                </p>
                <button
                  onClick={startFight}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-black font-mono text-xs uppercase font-bold tracking-wider rounded cursor-pointer transition-all inline-flex items-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span>СЫГРАТЬ СНОВА</span>
                </button>
              </div>
            )}

            {gameState === 'lost' && (
              <div className="p-6 bg-red-950/90 border-2 border-red-600 rounded-xl text-center space-y-4 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-fadeIn">
                <div className="text-2xl sm:text-3xl font-heading text-red-500 uppercase">
                  💀 БЕКЖАН ПОБЕДИЛ!
                </div>
                <p className="text-sm font-mono text-zinc-300">
                  «Пять лет тренировок на экзамене по вождению не прошли даром… хотя водительских прав у него всё ещё нет».
                </p>
                <button
                  onClick={startFight}
                  className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-mono text-xs uppercase font-bold tracking-wider rounded cursor-pointer transition-all inline-flex items-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span>ПОПРОБОВАТЬ СНОВА</span>
                </button>
              </div>
            )}

            {/* Battle Action Buttons */}
            {gameState === 'fighting' && (
              <div className="bg-zinc-950/90 border border-zinc-800 p-5 rounded-xl space-y-3 font-mono text-left">
                <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                  ВЫБЕРИТЕ ДЕЙСТВИЕ В БОЮ:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => handlePlayerAction('school')}
                    disabled={isAnimating}
                    className="p-3 bg-zinc-900 hover:bg-red-950/60 border border-zinc-700 hover:border-red-500 rounded text-left text-xs font-semibold text-zinc-200 transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <span className="text-red-400 font-bold">1. Показать график пересдач</span>
                    <span className="text-[10px] text-zinc-400">Наносит 95 крит. урона от правды</span>
                  </button>

                  <button
                    onClick={() => handlePlayerAction('callGirl')}
                    disabled={isAnimating}
                    className="p-3 bg-zinc-900 hover:bg-pink-950/60 border border-zinc-700 hover:border-pink-500 rounded text-left text-xs font-semibold text-zinc-200 transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <span className="text-pink-400 font-bold">2. Звонок его девушке</span>
                    <span className="text-[10px] text-zinc-400">Сбивает защитный щит босса</span>
                  </button>

                  <button
                    onClick={() => handlePlayerAction('entrance')}
                    disabled={isAnimating}
                    className="p-3 bg-zinc-900 hover:bg-amber-950/60 border border-zinc-700 hover:border-amber-500 rounded text-left text-xs font-semibold text-zinc-200 transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <span className="text-amber-400 font-bold">3. «Мы уже в подъезде»</span>
                    <span className="text-[10px] text-zinc-400">Паническая атака (-105 HP)</span>
                  </button>

                  <button
                    onClick={() => handlePlayerAction('window')}
                    disabled={isAnimating}
                    className="p-3 bg-zinc-900 hover:bg-cyan-950/60 border border-zinc-700 hover:border-cyan-500 rounded text-left text-xs font-semibold text-zinc-200 transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <span className="text-cyan-400 font-bold">4. Открыть форточку</span>
                    <span className="text-[10px] text-zinc-400">Проветривание, восстанавливает +35 HP</span>
                  </button>

                  <button
                    onClick={() => handlePlayerAction('promise')}
                    disabled={isAnimating}
                    className="p-3 bg-zinc-900 hover:bg-red-950 border border-red-700 hover:border-red-500 rounded text-left text-xs font-semibold text-zinc-200 transition-all cursor-pointer flex flex-col gap-1 col-span-1 sm:col-span-2 lg:col-span-1"
                  >
                    <span className="text-red-500 font-bold">5. Напомнить обещание 2021г</span>
                    <span className="text-[10px] text-zinc-400">Ультимейт: 150 колоссального урона</span>
                  </button>
                </div>
              </div>
            )}

            {/* Combat Log */}
            <div className="bg-black/90 border border-zinc-800 p-4 rounded-xl text-left font-mono text-xs space-y-2">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1">
                ЖУРНАЛ БОЕВЫХ ДЕЙСТВИЙ:
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-1.5 rounded text-[11px] ${
                      log.sender === 'boss'
                        ? 'text-red-400 bg-red-950/20'
                        : log.sender === 'player'
                        ? 'text-green-300 bg-green-950/20'
                        : 'text-amber-300 bg-zinc-900/40'
                    }`}
                  >
                    {log.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
