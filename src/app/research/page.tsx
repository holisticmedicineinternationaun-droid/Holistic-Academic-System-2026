'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap,
    BookOpen,
    Layout,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    Calculator,
    Layers,
    FileText
} from 'lucide-react';
import Link from 'next/link';
import { useAcademicStore } from '@/hooks/holistic-core/use-academic-store';

const DEGREES = [
    { id: 'diploma', label: 'دبلوم احترافي', min: 100, max: 300, icon: BookOpen },
    { id: 'master', label: 'ماستر (ماجستير)', min: 300, max: 500, icon: GraduationCap },
    { id: 'phd', label: 'دكتوراة', min: 600, max: 1000, icon: GraduationCap },
];

interface Chapter {
    name: string;
    pages: number;
}

export default function UniversityResearchWizard() {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [degreeId, setDegreeId] = useState('');
    const [totalChapters, setTotalChapters] = useState(3);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedStructure, setGeneratedStructure] = useState<Chapter[]>([]);

    const selectedDegree = DEGREES.find(d => d.id === degreeId);

    const handleGenerateStructure = () => {
        if (!selectedDegree) return;
        setIsGenerating(true);

        setTimeout(() => {
            const avgPages = Math.floor((selectedDegree.min + selectedDegree.max) / 2);
            const chaptersCount = title.includes('سكري') ? 3 : totalChapters;
            const basePagesPerChapter = Math.floor(avgPages / chaptersCount);
            const remainder = avgPages % chaptersCount;

            const structure: Chapter[] = [];
            for (let i = 0; i < chaptersCount; i++) {
                const chapterPages = basePagesPerChapter + (i < remainder ? 1 : 0);
                structure.push({
                    name: `الباب ${i + 1}`,
                    pages: chapterPages
                });
            }

            setGeneratedStructure(structure);
            useAcademicStore.getState().setProjectMeta(title, selectedDegree.label, structure);
            setIsGenerating(false);
            setStep(2);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 p-8 flex flex-col items-center justify-center font-sans">
            {/* Background decoration */}
            <div className="fixed top-0 left-0 w-full h-full z-[-1] opacity-20 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-600 blur-[150px] rounded-full" />
                <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-emerald-600 blur-[150px] rounded-full" />
            </div>

            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4 uppercase tracking-widest">
                        <GraduationCap className="w-4 h-4" />
                        نظام إدارة البحث الأكاديمي
                    </div>
                    <h1 className="text-4xl font-black mb-2">المعالج الذكي للبحوث</h1>
                    <p className="text-slate-400">برمجة هيكل البحث وفق موازين المجلس التاسع (±5 صفحات)</p>
                </div>

                {/* Wizard Progress */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {[1, 2].map((i) => (
                        <React.Fragment key={i}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= i ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
                            </div>
                            {i < 2 && <div className={`w-20 h-1 bg-slate-800 rounded-full overflow-hidden`}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: step > 1 ? '100%' : '0%' }}
                                    className="h-full bg-blue-600"
                                />
                            </div>}
                        </React.Fragment>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass p-12 rounded-3xl border border-white/10 space-y-8"
                        >
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-400 block px-1">عنوان البحث العلمي</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="أدخل عنوان البحث هنا..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-400 block px-1">الدرجة العلمية المطلوبة</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {DEGREES.map((deg) => (
                                        <button
                                            key={deg.id}
                                            onClick={() => setDegreeId(deg.id)}
                                            className={`p-6 rounded-2xl border transition-all text-right group ${degreeId === deg.id
                                                ? 'bg-blue-600/20 border-blue-500 text-white shadow-xl shadow-blue-500/10'
                                                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                                                }`}
                                        >
                                            <deg.icon className={`w-8 h-8 mb-4 ${degreeId === deg.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                            <h3 className="font-bold text-lg">{deg.label}</h3>
                                            <p className="text-xs opacity-60 mt-1">{deg.min} - {deg.max} صفحة</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-8">
                                <Link href="/" className="text-slate-500 hover:text-white transition-colors text-sm font-medium">إلغاء العملية</Link>
                                <button
                                    disabled={!title || !degreeId || isGenerating}
                                    onClick={handleGenerateStructure}
                                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:grayscale px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            جاري سحب المراجع وإعادة الهيكلة...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            إنشاء الهيكل الأكاديمي
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-1 space-y-6">
                                    <div className="glass p-8 rounded-3xl border border-white/10">
                                        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">ملخص البيانات</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs text-slate-500">العنوان:</p>
                                                <p className="text-lg font-bold">{title}</p>
                                            </div>
                                            <div className="h-px bg-white/5" />
                                            <div>
                                                <p className="text-xs text-slate-500">الدرجة:</p>
                                                <p className="text-lg font-bold text-blue-400">{selectedDegree?.label}</p>
                                            </div>
                                            <div className="h-px bg-white/5" />
                                            <div>
                                                <p className="text-xs text-slate-500">الهدف الإجمالي للمشروع:</p>
                                                <p className="text-2xl font-black text-emerald-400">
                                                    {generatedStructure.reduce((acc, curr) => acc + curr.pages, 0)} صفحة
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 transition-all font-bold"
                                    >
                                        تعديل المدخلات
                                    </button>
                                </div>

                                <div className="lg:col-span-2 glass p-10 rounded-3xl border border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Layers className="w-32 h-32" />
                                    </div>

                                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <Calculator className="w-6 h-6 text-blue-400" />
                                        هيكلية الأبواب (الموزعة بالتساوي)
                                    </h2>

                                    <div className="space-y-6">
                                        {generatedStructure.map((ch, i) => (
                                            <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-xl">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg">{ch.name}</h4>
                                                    <p className="text-sm text-slate-500">يتضمن الفصول والمباحث المقررة</p>
                                                </div>
                                                <div className="text-left">
                                                    <span className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">{ch.pages}</span>
                                                    <span className="text-xs text-slate-500 block">صفحة</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-10 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4 text-emerald-400 text-sm">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <p>تم التحقق: جميع الأبواب متوازنة وفق معيار المجلس التاسع (الفارق صفر أو 1).</p>
                                    </div>

                                    <Link
                                        href="/editor"
                                        className="mt-8 w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center block shadow-2xl shadow-blue-600/30 transition-all"
                                    >
                                        اذهب إلى المحرر لبدء الكتابة
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
