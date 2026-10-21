import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, ShieldAlert, Radio } from 'lucide-react';
import { sound } from '../utils/audio';

export const AudioToggle: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [musicActive, setMusicActive] = useState(false);

  const toggleSound = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    sound.setEnabled(nextState);
    if (!nextState && musicActive) {
      setMusicActive(false);
      sound.stopMusic();
    }
  };

  const toggleMusic = () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      sound.setEnabled(true);
    }
    const isPlaying = sound.toggleBossMusic();
    setMusicActive(isPlaying);
  };

  // Sync state if audio stopped
  useEffect(() => {
    const timer = setInterval(() => {
      setMusicActive(sound.isMusicPlaying());
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-3 right-3 z-50 flex items-center gap-2 bg-black/85 border border-red-800/80 p-1.5 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.3)]">
      <div className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono text-red-400 border-r border-red-900/60">
        <Radio className="w-3 h-3 text-red-500 animate-pulse" />
        <span className="hidden sm:inline font-bold tracking-wider">СПЕЦСВЯЗЬ:</span>
      </div>

      <button
        onClick={toggleSound}
        className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer ${
          audioEnabled
            ? 'bg-red-950/80 text-red-300 border border-red-600 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
            : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800'
        }`}
        title={audioEnabled ? 'Звук включен' : 'Включить звуковые эффекты'}
      >
        {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-red-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
        <span className="font-semibold">{audioEnabled ? 'ЗВУК ON' : 'ЗВУК OFF'}</span>
      </button>

      <button
        onClick={toggleMusic}
        className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer ${
          musicActive
            ? 'bg-amber-950/80 text-amber-300 border border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)] animate-pulse'
            : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800'
        }`}
        title="8-битный саундтрек боссфайта"
      >
        <Music className="w-3.5 h-3.5" />
        <span className="font-semibold hidden sm:inline">{musicActive ? 'САУНДТРЕК' : 'МУЗЫКА'}</span>
      </button>

      {audioEnabled && (
        <div className="flex items-end gap-0.5 h-4 px-1">
          <span className="w-0.5 bg-red-500 h-2 animate-[pulse_0.4s_ease-in-out_infinite]" />
          <span className="w-0.5 bg-red-500 h-4 animate-[pulse_0.6s_ease-in-out_infinite_0.1s]" />
          <span className="w-0.5 bg-red-500 h-3 animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" />
          <span className="w-0.5 bg-red-500 h-1 animate-[pulse_0.3s_ease-in-out_infinite_0.15s]" />
        </div>
      )}
    </div>
  );
};
