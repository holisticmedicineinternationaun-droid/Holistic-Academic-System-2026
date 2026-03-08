import { getSystemRules } from '@/lib/data';
import { ScrollText, Gavel } from 'lucide-react';

export default async function RulesSection() {
  const { constitution, logicSystem } = await getSystemRules();

  // Extracting some highlights to show
  const constitutionMatches = constitution.match(/([-] .+\n)/g)?.slice(0, 3);
  const logicMatches = logicSystem.split('.').slice(0, 3);

  return (
    <div className="mt-16 w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass p-8 rounded-3xl border-amber-500/20">
        <div className="flex items-center gap-3 mb-6">
          <ScrollText className="w-6 h-6 text-amber-500" />
          <h2 className="text-xl font-bold text-white">من ميثاق العمل (CONSTITUTION)</h2>
        </div>
        <div className="space-y-4 text-slate-400 text-sm leading-relaxed overflow-hidden max-h-[300px]">
          <pre className="whitespace-pre-wrap font-sans">
            {constitution.substring(0, 400)}...
          </pre>
        </div>
        <div className="mt-4 pt-4 border-t border-white/5 text-amber-500/60 text-[10px] uppercase tracking-widest">
           الميثاق الأكاديمي الشمولي المعتمد
        </div>
      </div>

      <div className="glass p-8 rounded-3xl border-blue-500/20">
        <div className="flex items-center gap-3 mb-6">
          <Gavel className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold text-white">منطق النظام (LOGIC_SYSTEM)</h2>
        </div>
        <div className="space-y-4 text-slate-400 text-sm leading-relaxed overflow-hidden max-h-[300px]">
          <pre className="whitespace-pre-wrap font-sans">
            {logicSystem.substring(0, 400)}...
          </pre>
        </div>
        <div className="mt-4 pt-4 border-t border-white/5 text-blue-500/60 text-[10px] uppercase tracking-widest">
          خوارزمية الاستدلال المدمجة
        </div>
      </div>
    </div>
  );
}
