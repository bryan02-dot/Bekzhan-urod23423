import React from 'react';
import { ShieldAlert, Car, Wind, Lock, CupSoda, HelpCircle, BarChart3, GlassWater, Swords } from 'lucide-react';

export const HeaderNav: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'case-001', label: '№001 Права', icon: Car },
    { id: 'case-002', label: '№002 Газ', icon: Wind },
    { id: 'case-003', label: '№003 Свобода', icon: Lock },
    { id: 'case-004', label: '№004 Кымыз', icon: CupSoda },
    { id: 'case-005', label: '№005 Вопросы', icon: HelpCircle },
    { id: 'case-006', label: '№006 Обещания', icon: BarChart3 },
    { id: 'alcohol-archive', label: '№007 Посиделки', icon: GlassWater },
    { id: 'boss-fight', label: 'ФИНАЛЬНЫЙ БОСС', icon: Swords, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-black/90 border-b border-red-950/80 backdrop-blur-md px-3 py-2 flex items-center justify-between overflow-x-auto shadow-lg">
      <div className="flex items-center gap-2 pr-4 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
        <span className="text-xs font-mono font-bold tracking-widest text-red-500 hidden sm:inline">
          BEKZHAN.EXE // ДЕЛО №666
        </span>
      </div>

      <nav className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                item.highlight
                  ? 'bg-red-900/80 text-red-200 border border-red-600 font-bold shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Icon className="w-3 h-3 text-red-400" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
