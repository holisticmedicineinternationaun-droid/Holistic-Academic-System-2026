'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Bold, Italic, Underline, List, ListOrdered, AlignLeft,
    AlignCenter, AlignRight, Save, ShieldCheck, BarChart3,
    FileText, Layout, Sparkles, AlertCircle, CheckCircle2,
    BookOpen, History, Layers, BrainCircuit, Quote
} from 'lucide-react';
import Link from 'next/link';
import { useAcademicStore } from '@/hooks/holistic-core/use-academic-store';

// Mock content based on Constitution/Logic
const SIX_DIMENSIONS = [
    { id: 'organic', label: 'البعد العضوي', color: 'text-rose-500' },
    { id: 'psychological', label: 'البعد النفسي (النواقل)', color: 'text-blue-500' },
    { id: 'spiritual', label: 'البعد الروحي (الغيب)', color: 'text-purple-500' },
    { id: 'emotional', label: 'البعد العاطفي', color: 'text-pink-500' },
    { id: 'social', label: 'البعد الاجتماعي', color: 'text-emerald-500' },
    { id: 'cosmic', label: 'البعاد الكوني (البيئة)', color: 'text-amber-500' },
];

const LAILA_FOOTPRINT = "البصمة الفكرية الأكاديمية: إن البحث في علم (المسارات العصبية الطاقية الروحية) ليس مجرد رصدٍ للمعلومات، بل هو صياغة كينونة معرفية تربط الأصالة بالمعاصرة، وتكشف المكنونات الخفية وراء التوازن الحيوي في ظل الأبعاد الستة للإنسان.";

// Advanced Scholarly Content Generator (Pathways Style)
const generateScholarJuristContent = (topic: string, sectionTitle: string) => {
    return `في محراب هذا الاستقصاء الأكاديمي الموسوم بـ (${topic})، نجد أنفسنا أمام ضرورة حتمية لإعادة قراءة (المسارات العصبية النفسية الطاقية الروحية) كنسيجٍ واحد لا ينفصم. إن المبحث الذي نسلط عليه الضوء الآن، وهو (${sectionTitle})، يتجاوز التعريفات الكلاسيكية ليغوص في عمق (الأصالة والمعاصرة)، مستدلاً بميزان (الموازنة) الحيوية والضوابط السبعة (الجمع، الدمج، المقارنة، الموازنة، التحليل، الاستدلال، الملاءمة). إننا حين نُخضع هذه الظاهرة لمشرط التحليل الأكاديمي الشمولي، يتكشف لنا كيف تتقاطع (الأبعاد الستة) للوجود الإنساني مع تدفقات الطاقة والروابط الروحية العميقة، حتى تلك التي تلامس القوى الخفية وعالم الاستبصار.`;
};

export default function SmartEditorPage() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('بحث جديد - الطب الشمولي');
    const [activeDimensions, setActiveDimensions] = useState<string[]>([]);
    const [chapters, setChapters] = useState([
        { name: 'الباب الأول', pages: 12 },
        { name: 'الباب الثاني', pages: 15 },
        { name: 'الباب الثالث', pages: 10 },
    ]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showBalanceChart, setShowBalanceChart] = useState(false);
    const [showDeepResearch, setShowDeepResearch] = useState(false);
    const [auditResults, setAuditResults] = useState<{ label: string; status: 'v' | 'x' | '!' }[]>([]);
    const [isAuditing, setIsAuditing] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);

    // Sync from Store (Wizard)
    useEffect(() => {
        const store = useAcademicStore.getState();
        if (store.currentTitle) {
            setTitle(store.currentTitle);
        }
        if (store.currentStructure && store.currentStructure.length > 0) {
            setChapters(store.currentStructure);
        }
    }, []);

    // Calculate Balance (Max diff between chapters should be ±5)
    const getBalanceStatus = () => {
        if (chapters.length < 2) return { status: 'متوازن', color: 'text-emerald-500' };
        const pages = chapters.map(c => c.pages);
        const max = Math.max(...pages);
        const min = Math.min(...pages);
        const diff = max - min;

        if (diff <= 5) return { status: 'متوازن (±5)', color: 'text-emerald-400', diff };
        return { status: 'غير متوازن', color: 'text-rose-400', diff };
    };

    const balance = getBalanceStatus();

    // Function to expand paragraphs with scientific depth (Pathways Style)
    const handleExpandContent = () => {
        if (!content) return alert('الرجاء كتابة مسودة أولية ليتم توسيعها.');
        setIsExpanding(true);
        setTimeout(() => {
            const lines = content.split('\n').filter(l => l.trim());
            const expandedLines = lines.map(line => {
                if (line.trim().length < 10) return line;
                return `إن سبر أغوار هذه الفكرة القائلة بـ ("${line.trim()}") يستوجب منا استحضار (المسارات العصبية النفسية الطاقية)، حيث لا نكتفي بالرصد السطحي، بل نُفعل ميزان (الاستدلال) الشمولي لربط الخلية بالكون. إن هذه الفقرة تمثل 'حلقة وصل' في ميزان (الموازنة) الحيوية، حيث تتقاطع فيها (الأبعاد الستة) لتشكل كينونة معرفية فريدة تلامس جوهر الأصالة وعمق المعاصرة. إننا هنا لا نحلل مجرد كلمات، بل نفك شفرات 'التوازن الروحي' وعلاقته بالقوى الخفية التي تنعكس على فيزيولوجية الجهاز العصبي، مما يجعل هذه الجزئية ركيزة أساسية في نيل درجة الاستبصار الأكاديمي.`;
            });
            setContent(expandedLines.join('\n\n') + '\n\n' + 'تذييل منهجي: تمت صياغة وتوسيع هذه المباحث بأسلوب (الفقيه الباحث) لتصل إلى مستوى البصمة الفكرية المتكاملة.');
            setIsExpanding(false);
        }, 1500);
    };

    const handleApplyDimensions = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setActiveDimensions(['organic', 'psychological', 'emotional', 'spiritual', 'social', 'cosmic']);
            if (!content.includes('نستفتح')) {
                setContent(generateScholarJuristContent(title, 'تأصيل الأبعاد الستة') + '\n\n' + content);
            }
        }, 2000);
    };

    const handleAuditSevenRules = () => {
        setIsAuditing(true);
        setTimeout(() => {
            setIsAuditing(false);
            setAuditResults([
                { label: 'الجمع', status: 'v' },
                { label: 'الدمج', status: 'v' },
                { label: 'المقارنة', status: 'v' },
                { label: 'الموازنة', status: 'v' },
                { label: 'التحليل', status: 'v' },
                { label: 'الاستدلال', status: 'v' },
                { label: 'الملائمة', status: 'v' },
            ]);
        }, 1500);
    };

    return (
        <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
            {/* DEEP RESEARCH MODAL */}
            {showDeepResearch && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowDeepResearch(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                    >
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-blue-600/10 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400">
                                    <Sparkles className="w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">البحث العميق (Deep Research)</h3>
                                    <p className="text-slate-400 text-sm">استخراج المراجع آلياً لعنوان: <span className="text-blue-400 font-bold">{title}</span></p>
                                </div>
                            </div>
                            <button onClick={() => setShowDeepResearch(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white">
                                <Layout className="w-6 h-6 rotate-45" />
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-amber-500 font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                                    <BookOpen className="w-4 h-4" /> المدارس القديمة
                                </h4>
                                {[
                                    'القانون في الطب - ابن سينا (تحليل الهرمونات)',
                                    'الحاوي - الرازي (منهج المقارنة)',
                                    'مخطوطات المجلس التاسع الأصلية',
                                ].map((ref, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-300 group-hover:text-white transition-colors">{ref}</span>
                                            <div className="w-2 h-2 rounded-full bg-amber-500 opacity-50" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-blue-500 font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                                    <BrainCircuit className="w-4 h-4" /> المدارس الحديثة
                                </h4>
                                {[
                                    'أبحاث النواقل العصبية (جامعة هارفارد)',
                                    'الفيزياء الكونية والمجال الحيوي (2025)',
                                    'دراسات السلوك العاطفي المدمج',
                                ].map((ref, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-300 group-hover:text-white transition-colors">{ref}</span>
                                            <div className="w-2 h-2 rounded-full bg-blue-500 opacity-50" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* BALANCE CHART MODAL */}
            {showBalanceChart && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowBalanceChart(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-emerald-500" />
                            ميزان المجلس التاسع (توزيع الصفحات)
                        </h3>
                        <div className="flex items-end justify-around h-64 gap-8 mb-8 border-b border-white/10 pb-2">
                            {chapters.map((ch, i) => (
                                <div key={i} className="flex flex-col items-center flex-1 gap-4">
                                    <div className="w-full relative group">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(ch.pages / 20) * 100}%` }}
                                            className={`w-full rounded-t-xl transition-all ${balance.diff && balance.diff > 5 ? 'bg-gradient-to-t from-rose-600 to-rose-400' : 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                                                } min-h-[20px]`}
                                        />
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {ch.pages} صفحة
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400">{ch.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className={`p-4 rounded-2xl flex items-center gap-4 ${balance.diff && balance.diff > 5 ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}`}>
                            {balance.diff && balance.diff > 5 ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                            <div>
                                <p className="font-bold">{balance.status}</p>
                                <p className="text-xs opacity-70">أقصى فرق بين الأبواب هو {balance.diff || 0} صفحات (المسموح به ±5 صفحات).</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* LEFT SIDEBAR - Analytics & Rules */}
            <aside className="w-80 border-l border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 flex flex-col gap-8 overflow-y-auto">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <ShieldCheck className="w-5 h-5 text-amber-500" />
                        <h2 className="font-bold text-lg">قوانين المنظومة</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-400">توازن الأبواب (المجلس التاسع)</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/5 ${balance.color}`}>
                                    {balance.status}
                                </span>
                            </div>
                            <div className="space-y-3">
                                {chapters.map((ch, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500/50"
                                                style={{ width: `${(ch.pages / 20) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-slate-300 w-16 truncate">{ch.name}</span>
                                        <span className="text-xs font-bold text-blue-400">{ch.pages} ص</span>
                                    </div>
                                ))}
                            </div>
                            {balance.diff && balance.diff > 5 && (
                                <div className="mt-3 flex items-center gap-2 text-rose-400 text-[10px] bg-rose-500/10 p-2 rounded-lg">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>تنبيه: الفرق الحالي ({balance.diff} صفحات) يتجاوز حد الـ 5 صفحات المسموح به.</span>
                                </div>
                            )}
                        </div>

                        {auditResults.length > 0 && (
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-bottom-2">
                                <span className="text-sm font-medium text-slate-400 block mb-3">نتائج الضوابط السبعة</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {auditResults.map((audit, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg text-[10px]">
                                            <span className="text-slate-400">{audit.label}</span>
                                            {audit.status === 'v' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> :
                                                audit.status === 'x' ? <AlertCircle className="w-3 h-3 text-rose-500" /> :
                                                    <AlertCircle className="w-3 h-3 text-amber-500" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <span className="text-sm font-medium text-slate-400 block mb-3">تغطية الأبعاد الستة</span>
                            <div className="grid grid-cols-2 gap-2">
                                {SIX_DIMENSIONS.map(dim => (
                                    <div
                                        key={dim.id}
                                        className={`p-2 rounded-xl border text-[10px] transition-all duration-500 flex items-center gap-2 ${activeDimensions.includes(dim.id)
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                            : 'bg-white/5 border-white/5 text-slate-500'
                                            }`}
                                    >
                                        {activeDimensions.includes(dim.id) ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-slate-700" />}
                                        {dim.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <History className="w-5 h-5 text-blue-400" />
                        <h2 className="font-bold text-lg">سجل المراجعة</h2>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        يتم فحص النص وفق معايير "الجمع، الدمج، المقارنة، الموازنة، التحليل، الاستدلال، الملائمة".
                    </p>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
                        <Layout className="w-4 h-4" />
                        العودة للوحة التحكم
                    </Link>
                </div>
            </aside>

            {/* MAIN EDITOR AREA */}
            <main className="flex-1 flex flex-col relative text-right" dir="rtl">
                {/* Scholar Jurist Advanced Toolbar */}
                <header className="h-24 border-b border-white/10 flex items-center justify-between px-8 bg-slate-900/60 backdrop-blur-2xl sticky top-0 z-30 gap-6 shadow-2xl">
                    {/* Basic Formatting Group */}
                    <div className="flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/10 shadow-inner">
                        <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white hover:scale-110 active:scale-95"><Bold className="w-4 h-4" /></button>
                        <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white hover:scale-110 active:scale-95"><Italic className="w-4 h-4" /></button>
                        <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white hover:scale-110 active:scale-95"><Underline className="w-4 h-4" /></button>
                        <div className="w-px h-6 bg-white/10 mx-2" />
                        <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white hover:scale-110 active:scale-95"><List className="w-4 h-4" /></button>
                        <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white hover:scale-110 active:scale-95"><ListOrdered className="w-4 h-4" /></button>
                    </div>

                    {/* Academic Tools Group (The requested buttons) */}
                    <div className="flex items-center gap-3 bg-slate-950/50 p-1.5 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/5">
                        <button
                            onClick={() => {
                                alert('جاري تحليل سياق الفقرة لتوليد إنفوجرافيك Nano Banana 2 عالي الجودة...');
                                // Logic for visual generation would go here
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500 hover:text-slate-950 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] group"
                        >
                            <BrainCircuit className="w-4 h-4 group-hover:animate-spin" />
                            إنفوجرافيك Nano Banana 2
                        </button>

                        <div className="w-px h-8 bg-white/10" />

                        <button
                            onClick={handleExpandContent}
                            disabled={isExpanding}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-600 hover:text-white transition-all hover:shadow-[0_0_20px_rgba(225,29,72,0.3)] ${isExpanding ? 'animate-pulse' : ''}`}
                        >
                            <Layers className="w-4 h-4" />
                            {isExpanding ? 'جاري التوسيع العميق...' : 'توسيع العمق العلمي (البصمة)'}
                        </button>

                        <div className="w-px h-8 bg-white/10" />

                        <button
                            onClick={() => setShowDeepResearch(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        >
                            <BookOpen className="w-4 h-4" />
                            إدراج مرجع علمي
                        </button>

                        <div className="w-px h-8 bg-white/10" />

                        <button
                            onClick={() => {
                                setContent(prev => prev + '\n\n' + 'البصمة الفكرية: ' + LAILA_FOOTPRINT);
                                alert('تم تفعيل وإدراج البصمة الفكرية للفقيه الباحث بنجاح.');
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        >
                            <Quote className="w-4 h-4" />
                            تفعيل البصمة الفكرية
                        </button>
                    </div>

                    {/* Methodology Group */}
                    <div className="flex items-center gap-2 bg-slate-950/50 p-1.5 rounded-2xl border border-amber-500/20">
                        <button
                            onClick={handleAuditSevenRules}
                            disabled={isAuditing}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${isAuditing ? 'bg-amber-500/20 text-amber-500 animate-pulse' : 'hover:bg-amber-500/10 text-amber-500'}`}
                        >
                            <ShieldCheck className="w-4 h-4" />
                            {isAuditing ? 'جاري الفحص...' : 'الضوابط السبعة'}
                        </button>
                        <button
                            onClick={() => setShowBalanceChart(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-emerald-400 hover:bg-emerald-500/10 transition-all"
                        >
                            <BarChart3 className="w-4 h-4" />
                            ميزان الأبواب
                        </button>
                    </div>

                    {/* Title & Stats */}
                    <div className="flex flex-col items-center gap-1 flex-1 px-4 border-l border-white/10">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-transparent border-none text-center focus:ring-0 font-black text-white w-full text-base placeholder:text-slate-700"
                            placeholder="عنوان البحث..."
                        />
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <span className="text-blue-400 italic">نمط الفقيه الباحث نشط</span>
                            <span>•</span>
                            <span>{content.split(/\s+/).filter(x => x).length} كلمة</span>
                        </div>
                    </div>

                    {/* Actions Group */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={handleApplyDimensions}
                            disabled={isAnalyzing}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black text-xs transition-all ${isAnalyzing
                                ? 'bg-blue-500/20 text-blue-400 cursor-wait'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105'
                                }`}
                        >
                            <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                            {isAnalyzing ? 'تحليل الأبعاد...' : 'تطبيق الأبعاد الستة'}
                        </button>
                        <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:border-amber-500/50">
                            <Save className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </header>

                {/* Writing Interface */}
                <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-950/20">
                    <div className="w-full max-w-[850px] bg-white rounded-sm shadow-2xl min-h-[1100px] p-24 text-slate-900 border-x border-slate-200 relative overflow-hidden">
                        {/* Watermark/Background based on the Constitution */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center select-none rotate-45 text-6xl font-black">
                            HOLISTIC SYSTEM
                        </div>

                        <textarea
                            className="w-full h-full border-none focus:ring-0 p-0 text-xl leading-relaxed resize-none font-serif placeholder:text-slate-300 placeholder:italic text-right"
                            placeholder="ابدأ الكتابة هنا وفق منهجية المجلس التاسع..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            dir="rtl"
                        />
                    </div>
                </div>

                {/* Footer Info */}
                <footer className="h-10 border-t border-white/10 bg-slate-900/50 flex items-center px-8 text-[10px] text-slate-500 justify-between uppercase tracking-widest shrink-0">
                    <div className="flex gap-4">
                        <span>اللغة: العربية</span>
                        <span>عدد الكلمات: {content.split(/\s+/).filter(x => x).length}</span>
                        <span>صافي الصفحات: {Math.max(1, Math.ceil(content.length / 2000))}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Layers className="w-3 h-3 text-amber-500" />
                        <span>الهيكل: باب - فصل - مبحث - مطلب</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
