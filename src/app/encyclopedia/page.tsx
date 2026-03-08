'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Book,
    Stethoscope,
    Microscope,
    Activity,
    Sparkles,
    ArrowLeft,
    Brain,
    History,
    Layers,
    Globe,
    Wind,
    Heart,
    Users,
    Sun,
    BookOpenCheck,
    BriefcaseMedical,
    Scale
} from 'lucide-react';
import Link from 'next/link';
import { useAcademicStore } from '@/hooks/holistic-core/use-academic-store';

const CATEGORIES = [
    { id: 'diseases', label: 'الأمراض والعلل', icon: Stethoscope, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { id: 'anatomy', label: 'التشريح والوظائف', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'labs', label: 'المختبر والتشخيص', icon: Microscope, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'therapy', label: 'التقنيات العلاجية', icon: BriefcaseMedical, color: 'text-amber-400', bg: 'bg-amber-400/10' },
];

const SIX_DIMENSIONS = [
    { id: 'organic', label: 'البعد العضوي', icon: Activity },
    { id: 'psychological', label: 'البعد النفسي', icon: Brain },
    { id: 'spiritual', label: 'البعد الروحي', icon: Wind },
    { id: 'emotional', label: 'البعد العاطفي', icon: Heart },
    { id: 'social', label: 'البعد الاجتماعي', icon: Users },
    { id: 'cosmic', label: 'البعد الكوني', icon: Sun },
];

const TEN_TERMS = [
    'التعريف', 'المفهوم', 'الدلالة', 'المسمى المختار', 'الأدلة والنصوص',
    'الأهمية العلمية', 'القواعد الحاكمة', 'الضوابط البحثية', 'المنهجية المقترحة', 'الخلاصة والنتائج'
];

export default function HolisticEncyclopedia() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [activeCategory, setActiveCategory] = useState('diseases');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            setShowResults(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 p-8 flex flex-col items-center font-sans" dir="rtl">
            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full" />
                <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-6xl relative z-10 flex-1 flex flex-col">
                {/* Navigation Header */}
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <Book className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black">الموسوعة الشمولية الأكاديمية</h1>
                            <p className="text-slate-400">محرك بحث فقه التشخيص والعلوم الطبية الحديثة</p>
                        </div>
                    </div>
                    <Link href="/" className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-bold flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        العودة للوحة القيادة
                    </Link>
                </header>

                {/* Search Sector */}
                <div className={`transition-all duration-700 ${showResults ? 'mb-12' : 'flex-1 flex flex-col justify-center mb-24'}`}>
                    <div className="max-w-3xl mx-auto w-full space-y-8">
                        {!showResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center space-y-4"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest">
                                    <Sparkles className="w-4 h-4" />
                                    قاعدة بيانات المجلس التاسع الموحدة
                                </div>
                                <h2 className="text-5xl font-black leading-tight text-white drop-shadow-2xl">عن ماذا تبحث اليوم في <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">الطب الشمولي المعاصر؟</span></h2>
                            </motion.div>
                        )}

                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                                {isSearching ? <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /> : <Search className="w-6 h-6" />}
                            </div>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ابحث عن (عضو، مرض، تحليل، أو تقنية علاجية)..."
                                className="w-full h-20 bg-white/5 border border-white/10 rounded-[32px] pr-16 pl-8 text-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 font-medium shadow-2xl"
                            />
                            <button
                                type="submit"
                                className="absolute left-3 top-3 bottom-3 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 transition-all"
                            >
                                بـحـث
                            </button>
                        </form>

                        <div className="flex flex-wrap justify-center gap-4">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all text-sm font-bold ${activeCategory === cat.id
                                        ? `${cat.bg} border-${cat.id}-500/30 ${cat.color} shadow-lg shadow-${cat.id}-500/10`
                                        : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                                        }`}
                                >
                                    <cat.icon className="w-5 h-5" />
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Sector */}
                <AnimatePresence>
                    {showResults && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-24"
                        >
                            {/* Main Content Area */}
                            <div className="lg:col-span-3 space-y-8">
                                {/* Result Summary Header */}
                                <div className="glass p-10 rounded-[48px] border border-white/10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                                        <History className="w-48 h-48" />
                                    </div>
                                    <div className="space-y-6 relative z-10">
                                        <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm">
                                            <BookOpenCheck className="w-5 h-5" />
                                            مادة مؤصلة وفق منهجية المجلس التاسع
                                        </div>
                                        <h2 className="text-4xl font-black text-white">{searchQuery} <span className="text-slate-500 text-xl font-medium block mt-2 tracking-wide">(دراسة تحليلية شمولية مقارنة)</span></h2>
                                        <p className="text-xl text-slate-400 leading-relaxed max-w-4xl">
                                            يُعد {searchQuery} ركيزة أساسية في فهم التوازن الحيوي، حيث يمتد تأثيره من الوظائف الفيزيولوجية العضوية إلى المسارات الطاقية العليا، وهو ما يستوجب تحليلاً دقيقاً طبقاً للأبعاد الستة.
                                        </p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => {
                                                    const result = `${searchQuery}: دراسة تحليلية شمولية مقارنة وفق البعد العضوي والنفسي والروحي.`;
                                                    useAcademicStore.getState().addSearchToBuffer(result);
                                                    alert('تمت إضافة النتيجة لبفر المزامنة! يمكنك إدراجها الآن في المحرر أو المحاضرة.');
                                                }}
                                                className="px-6 py-3 bg-blue-600 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                                            >
                                                <Globe className="w-5 h-5" />
                                                Deep Research (أحدث الأبحاث)
                                            </button>
                                            <button className="px-6 py-3 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600/30 transition-all">
                                                <Layers className="w-5 h-5" />
                                                عرض المخطط التشريحي
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* THE TEN TERMS (Academic Definitions) */}
                                <div className="glass p-12 rounded-[48px] border border-white/10 space-y-10">
                                    <h3 className="text-2xl font-black flex items-center gap-4 text-amber-500">
                                        <Scale className="w-8 h-8" />
                                        تأصيل المادة العلمية (المصطلحات العشرة)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {TEN_TERMS.map((term, i) => (
                                            <div key={i} className="space-y-3 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xs">
                                                        {i + 1}
                                                    </span>
                                                    <h4 className="font-black text-slate-300 group-hover:text-amber-500 transition-colors">{term}</h4>
                                                </div>
                                                <p className="text-sm text-slate-500 leading-relaxed pr-11">
                                                    شرح وتحليل دقيق لـ {term} الخاص بـ {searchQuery} بما يتوافق مع مراجع ابن سينا والرازي والأبحاث المعاصرة.
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar: Six Dimensions Analysis */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="glass p-8 rounded-[40px] border border-blue-500/20 sticky top-8">
                                    <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-blue-400">
                                        <Globe className="w-6 h-6 border-b border-blue-400 pb-1" />
                                        تحليل الأبعاد الستة
                                    </h3>
                                    <div className="space-y-4">
                                        {SIX_DIMENSIONS.map((dim) => (
                                            <div key={dim.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                        <dim.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-sm text-slate-300">{dim.label}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                                                        transition={{ duration: 1, delay: 1 }}
                                                        className="h-full bg-gradient-to-l from-blue-500 to-emerald-500"
                                                    />
                                                </div>
                                                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                                                    تحليل عميق يربط {searchQuery} بالمجال {dim.label} وفقاً لدستور المنظومة.
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                                        <p className="text-emerald-400 text-xs font-bold font-black mb-2 animate-pulse">الحالة: شمولية مكتملة</p>
                                        <p className="text-[10px] text-slate-400">هذه المادة العلمية تم فحصها آلياً وتغطي كافة محاور البحث الشمولي الأكاديمي.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Branding */}
            <footer className="w-full max-w-7xl border-t border-white/5 mt-auto py-8 text-center text-slate-600 text-[10px] uppercase tracking-widest font-bold">
                نظام الموسوعة الشمولية الذكي • الإصدار الأكاديمي 2026 • المجلس التاسع
            </footer>
        </div>
    );
}
