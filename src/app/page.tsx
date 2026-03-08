import React from 'react';
import {
  MonitorPlay,
  GraduationCap,
  FileCheck,
  Globe,
  Bot,
  Scale,
  BrainCircuit,
  ScrollText,
  Workflow
} from 'lucide-react';
import RulesSection from '@/components/RulesSection';
import DashboardGrid, { ButtonProps } from '@/components/DashboardGrid';

const buttons: ButtonProps[] = [
  { id: 'lectures', title: 'المحاضرات', icon: 'MonitorPlay' as const, description: 'الوصول إلى الدورات التدريبية المعتمدة' },
  { id: 'research', title: 'البحوث الجامعية', icon: 'GraduationCap' as const, description: 'نظام إدارة البحث الأكاديمي الشمولي' },
  { id: 'academic-agent', title: 'الوكيل الأكاديمي المستقل', icon: 'BrainCircuit' as const, description: 'الباحث والمدرس الخصوصي الآلى (نمط جينماي)' },
  { id: 'audit', title: 'فحص وتعديل البحوث', icon: 'FileCheck' as const, description: 'التدقيق المنهجي وفق المعايير السبعة' },
  { id: 'encyclopedia', title: 'الموسوعة الشمولية', icon: 'Globe' as const, description: 'قاعدة المعارف الطبية الشمولية' },
  { id: 'editor', title: 'المحرر الذكي', icon: 'Bot' as const, description: 'التأليف الأكاديمي المدعوم بالذكاء الاصطناعي' },
];

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 z-10">
        <div className="inline-block p-2 px-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-semibold mb-4">
          نظام الجامعة العالمية للطب الشمولي
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
          لوحة التحكم <span className="gradient-text">الأكاديمية</span>
        </h1>
        <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed">
          الجيل الجديد من منصات البحث العلمي القائمة على المنهج المدمج المقارن والأبعاد الستة للطب الشمولي
        </p>
      </div>

      {/* Main Grid (Client component for animations) */}
      <DashboardGrid buttons={buttons} />

      {/* Rules Section (Server component) */}
      <RulesSection />

      {/* Footer Indicators */}
      <div className="mt-20 flex flex-wrap justify-center gap-8 text-slate-500 text-sm font-medium pb-8">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-500" />
          <span>الالتزام بمعايير CONSTITUTION.md</span>
        </div>
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-blue-500" />
          <span>خوارزمية LOGIC_SYSTEM.md نشطة</span>
        </div>
        <div className="flex items-center gap-2">
          <ScrollText className="w-4 h-4 text-emerald-500" />
          <span>الأبعاد الستة متضمنة</span>
        </div>
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-violet-500" />
          <span>منهجية البحث العلمي المعتمدة</span>
        </div>
      </div>
    </main>
  );
}
