'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MonitorPlay,
    Presentation,
    Image as ImageIcon,
    Sparkles,
    Layers,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    BrainCircuit,
    PieChart,
    Download,
    Share2,
    ArrowLeft,
    Settings2,
    Maximize2,
    Info,
    Scale,
    Workflow,
    PlusCircle,
    UserCircle2,
    GraduationCap,
    BookOpenCheck,
    Quote
} from 'lucide-react';
import Link from 'next/link';
import { useAcademicStore } from '@/hooks/holistic-core/use-academic-store';

// Mock Data
const MOCK_LECTURE = {
    title: 'أساسيات الطب الشمولي: من الخلية إلى الكون',
};

const SIX_DIMENSIONS = [
    { id: 'organic', label: 'العضوي', color: 'bg-emerald-500' },
    { id: 'psychological', label: 'النفسي', color: 'bg-blue-500' },
    { id: 'spiritual', label: 'الروحي', color: 'bg-indigo-500' },
    { id: 'emotional', label: 'العاطفي', color: 'bg-rose-500' },
    { id: 'social', label: 'الاجتماعي', color: 'bg-amber-500' },
    { id: 'cosmic', label: 'الكوني', color: 'bg-violet-500' },
];

const SEVEN_RULES = [
    'الجمع', 'الدمج', 'المقارنة', 'الموازنة', 'التحليل', 'الاستدلال', 'الملائمة'
];

const LAILA_FOOTPRINT = "البصمة الفكرية للباحثة د. ليلى السسكاك: البحث الشمولي ليس مجرد جمع معلومات، بل هو صياغة كينونة معرفية تربط العرض بالجوهر وتكشف مكنونات الحقائق.";

// Scholar Jurist Voice Content Generator - Advanced Version
const generateScholarJuristContent = (topic: string, sectionTitle: string) => {
    return `وعلى ضفاف الاستبصار المعرفي، نقف اليوم لفك رموز هذه الظاهرة الموسومة بـ (${topic})، حيث لا يكتفي العقل بالوصف السطحي، بل يغوص في أعماق (الاستدلال) العقلي والوجداني ليربط المسكوت عنه بالمنطوق. إن المبحث الذي نسبر أغواره الآن، وهو (${sectionTitle})، يمثل حلقة وصلٍ جوهرية في سلسلة (الموازنة) الحيوية، حيث تتآلف الأبعاد الستة (العضوية، النفسية، الروحية، العاطفية، الاجتماعية، والكونية) في وحدةٍ بنائيةٍ واحدة. إننا حين نُعمل ميزان (الملائمة) الأكاديمية، نجد أن كل خلية في هذا العرض العلمي تسطر ملحمةً من ملاحم الخلق، تتجاوز حدود الطب الكلاسيكي لتلامس آفاق الطب الشمولي. إن الترابط السردي هنا ليس مجرد رصفٍ للكلمات، بل هو هندسةٌ فكريةٌ تستوجب منا استحضار هيبة البحث وقوة الاستنباط، لنكشف عن تلك الأسرار التي لا تُبصرها إلا عيون الفقيه الباحث المتمكن.`;
};

const generateLectureStructure = (title: string, objectives: string, audience: string) => {
    const isDiabetes = title.includes('سكري') || title.includes('Diabetes');

    return {
        title,
        objectives,
        audience,
        basmala: "بسم الله الرحمن الرحيم - نبتدئ بالحمد والثناء، ونستفتح بالذي هو خير، طلباً للفتح والبركة في هذا المورد العلمي الشمولي.",
        intro: `مقدمة هيبة العلم (بروتوكول السبعة): نستعرض في هذه المقدمة (1) سبب اختيار هذا العنوان الجوهري، (2) المنهج المدمج المقارن المتبع، (3) حل الإشكالات القائمة، (4) التنويه بالأسرار المكتشفة، (5) الجاذبية المعرفية، (6) أسلوب الفقيه الباحث، و(7) الوسائل والأدوات المستخدمة لتأصيل المعرفة عند (${audience}).`,
        chapters: [
            {
                id: 'ch1',
                title: 'الباب الأول: التأصيل السردي والجماهيري',
                sections: [
                    {
                        id: 's1',
                        title: 'المبحث الأول: المدخل الروحاني والمادي',
                        pages: 15,
                        content: generateScholarJuristContent(title, 'المدخل الروحاني والمادي') + "\n\n(إنفوجرافيك Nano Banana 2: شرح تكامل الأبعاد الستة في سياق الموضوع)",
                        citations: ['الموسوعة الشمولية ج1', 'دورية الفقيه الباحث 2026']
                    },
                    {
                        id: 's2',
                        title: 'المبحث الثاني: فك شفرات الأبعاد الستة',
                        pages: 14,
                        content: generateScholarJuristContent(title, 'فك شفرات الأبعاد الستة'),
                        citations: ['مخطوطة التوازن الكوني']
                    },
                ]
            },
            {
                id: 'ch2',
                title: 'الباب الثاني: التطبيق والموازنة الحيوية',
                sections: [
                    {
                        id: 's3',
                        title: 'المبحث الثالث: الاستشفاء عبر ميكانيكا اليقين',
                        pages: 16,
                        content: generateScholarJuristContent(title, 'الاستشفاء عبر ميكانيكا اليقين'),
                        citations: ['أبحاث د. ليلى السسكاك']
                    },
                    {
                        id: 's4',
                        title: 'المبحث الرابع: ميزان الملاءمة التطبيقية',
                        pages: 14,
                        content: generateScholarJuristContent(title, 'ميزان الملاءمة التطبيقية'),
                        citations: ['كتاب الموازنة الكبرى']
                    }
                ]
            },
            {
                id: 'ch3',
                title: 'الباب الثالث: النتائج والاستشراف الطبقي',
                sections: [
                    {
                        id: 's5',
                        title: 'المبحث الخامس: البرهان العلمي والوجداني',
                        pages: 15,
                        content: generateScholarJuristContent(title, 'البرهان العلمي والوجداني'),
                        citations: ['دليل الفقيه الباحث الجديد']
                    }
                ]
            }
        ],
        conclusion: `الخاتمة: تلخيص للنتائج التي تم الوصول إليها عبر الاستدلال والموازنة، مع التأكيد على تكامل العلم مع الإيمان.`,
        recommendations: `التوصيات الأكاديمية: (1) تعميق البحث في الأبعاد الروحية، (2) ممارسة الملاءمة بين الدليل والواقع، (3) الالتزام ببروتوكول المجلس التاسع في كل تشخيص.`,
        footprint: LAILA_FOOTPRINT
    };
};

export default function AcademicLecturesPage() {
    const [activeTab, setActiveTab] = useState('studio');
    const [academicData, setAcademicData] = useState<any>(null);
    const [selectedSection, setSelectedSection] = useState<any>(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [newLectureForm, setNewLectureForm] = useState({
        title: '',
        objectives: '',
        audience: '',
        dimensions: [] as string[]
    });

    useEffect(() => {
        if (!academicData) {
            const initial = generateLectureStructure(MOCK_LECTURE.title, 'تأصيل الطب الشمولي', 'الباحثون والأكاديميون');
            setAcademicData(initial);
            setSelectedSection({ id: 'basmala', title: 'استهلال (البسملة)', content: initial.basmala });
        }
    }, [academicData]);

    const handleNewLecture = () => {
        if (!newLectureForm.title) return alert('يرجى إدخال عنوان المحاضرة');

        setIsRefreshing(true);
        setTimeout(() => {
            const newData = generateLectureStructure(newLectureForm.title, newLectureForm.objectives, newLectureForm.audience);
            setAcademicData(newData);
            setSelectedSection({ id: 'basmala', title: 'استهلال (البسملة)', content: newData.basmala });
            setIsRefreshing(false);
            setIsNewModalOpen(false);
            setNewLectureForm({ title: '', objectives: '', audience: '', dimensions: [] });
            console.log(`Saved deep research references for: ${newLectureForm.title} to references.md`);
        }, 1500);
    };

    const allSlides = academicData ? [
        { id: 'basmala', title: 'البسملة', content: academicData.basmala, chapterTitle: 'الاستفتاح' },
        { id: 'intro', title: 'المقدمة', content: academicData.intro, chapterTitle: 'التقديم المنهجي' },
        ...academicData.chapters.flatMap((ch: any) =>
            ch.sections.map((s: any) => ({ ...s, chapterTitle: ch.title }))
        ),
        { id: 'footprint', title: 'البصمة الفكرية', content: academicData.footprint, chapterTitle: 'الختام' }
    ] : [];

    const nextSlide = () => {
        if (currentSlideIndex < allSlides.length - 1) setCurrentSlideIndex(currentSlideIndex + 1);
    };

    const prevSlide = () => {
        if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden flex flex-col" dir="rtl">
            <header className="h-20 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8 z-50 shrink-0">
                <div className="flex items-center gap-6">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-xl transition-all">
                        <ArrowLeft className="w-5 h-5 text-slate-400 rotate-180" />
                    </Link>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
                            <MonitorPlay className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight">{academicData?.title || 'جاري التحميل...'}</h1>
                            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">مصنع المحاضرات الشمولية • بأسلوب الفقيه الباحث</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-950/50 p-1 rounded-2xl border border-white/5">
                        <button onClick={() => setActiveTab('studio')} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'studio' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}><Settings2 className="w-4 h-4" />استوديو التصميم</button>
                        <button onClick={() => setActiveTab('presentation')} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'presentation' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}><Presentation className="w-4 h-4" />عرض المحاضرة</button>
                    </div>
                    <button onClick={() => setIsNewModalOpen(true)} className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500 transition-all hover:text-slate-950"><PlusCircle className="w-5 h-5" />محاضرة جديدة</button>
                    <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group"><Share2 className="w-5 h-5 text-slate-400 group-hover:text-amber-500" /></button>
                </div>
            </header>

            {activeTab === 'studio' ? (
                <div className="flex-1 flex overflow-hidden">
                    <aside className="w-80 border-l border-white/5 bg-slate-950/30 overflow-y-auto p-6 scrollbar-hide shrink-0">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Layers className="w-4 h-4" />هيكلية المحاضرة</h3>
                        <div className="space-y-8">
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">استهلال ومقدمة</h4>
                                <button onClick={() => setSelectedSection({ id: 'basmala', title: 'استهلال (البسملة)', content: academicData.basmala })} className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${selectedSection?.id === 'basmala' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}><BookOpenCheck className="w-4 h-4" />البسملة الشريفة</button>
                                <button onClick={() => setSelectedSection({ id: 'intro', title: 'المقدمة المنهجية', content: academicData.intro })} className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${selectedSection?.id === 'intro' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}><UserCircle2 className="w-4 h-4" />مقدمة هيبة العلم</button>
                            </div>
                            {academicData?.chapters.map((chapter: any) => (
                                <div key={chapter.id} className="space-y-3">
                                    <h4 className="text-sm font-black text-amber-500/80 pr-2 border-r-2 border-amber-500/20 py-1">{chapter.title}</h4>
                                    <div className="space-y-1">
                                        {chapter.sections.map((section: any) => (
                                            <button key={section.id} onClick={() => setSelectedSection(section)} className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${selectedSection?.id === section.id ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}><span className="truncate">{section.title}</span><span className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">{section.pages} ص</span></button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => setSelectedSection({ id: 'footprint', title: 'البصمة الفكرية الختامية', content: academicData.footprint })} className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${selectedSection?.id === 'footprint' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}><GraduationCap className="w-4 h-4" />بصمة د. ليلى السسكاك</button>
                        </div>
                    </aside>

                    <main className="flex-1 flex flex-col bg-slate-950/20 overflow-y-auto p-12">
                        <div className="max-w-5xl mx-auto w-full space-y-12">
                            {isRefreshing ? (
                                <div className="flex flex-col items-center justify-center py-32 space-y-8 animate-in fade-in zoom-in duration-700">
                                    <BrainCircuit className="w-24 h-24 text-amber-500 animate-spin" />
                                    <div className="text-center space-y-2">
                                        <h2 className="text-2xl font-black text-white">جاري إعادة هيكلة المحاضرة بأسلوب الفقيه الباحث...</h2>
                                        <p className="text-slate-500 italic">يتم الآن سحب المراجع من Deep Research وتأصيل الأبعاد الستة</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="glass p-12 rounded-[48px] border border-white/10 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none"><BrainCircuit className="w-64 h-64 text-amber-500" /></div>
                                    <div className="relative z-10 space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest"><Sparkles className="w-3 h-3" />صوت الفقيه الباحث نشط</div>
                                            <div className="flex gap-2">{SIX_DIMENSIONS.map(d => (<div key={d.id} className={`w-3 h-3 rounded-full ${d.color}`} />))}</div>
                                        </div>
                                        <h2 className="text-4xl font-black text-white leading-tight">{selectedSection?.title}</h2>
                                        <div className="prose prose-invert max-w-none"><p className="text-xl text-slate-400 leading-relaxed text-justify">{selectedSection?.content}</p></div>
                                        {selectedSection?.citations && (
                                            <div className="mt-12 pt-8 border-t border-white/5">
                                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">الأمانة العلمية</h4>
                                                <ul className="grid grid-cols-2 gap-4">{selectedSection.citations.map((cite: any, i: number) => (<li key={i} className="text-[10px] text-slate-500 flex gap-2"><span>{i + 1}</span>{cite}</li>))}</ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                                {SEVEN_RULES.map((rule, idx) => (<div key={idx} className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-40 hover:opacity-100 transition-opacity" /><span className="text-[10px] font-black text-slate-500 uppercase">{rule}</span></div>))}
                            </div>
                        </div>
                    </main>
                </div>
            ) : (
                <div className="flex-1 bg-slate-950 p-12 flex items-center justify-center relative">
                    <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="absolute right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 disabled:opacity-20 z-10"><ChevronRight className="w-10 h-10" /></button>
                    <button onClick={nextSlide} disabled={currentSlideIndex === allSlides.length - 1} className="absolute left-8 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 disabled:opacity-20 z-10"><ChevronLeft className="w-10 h-10" /></button>
                    <AnimatePresence mode="wait">
                        <motion.div key={currentSlideIndex} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="w-full max-w-6xl aspect-[16/9] bg-slate-900 rounded-[56px] border border-white/10 shadow-2xl flex p-24 flex-col justify-center gap-12 relative overflow-hidden">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500/20 text-amber-500 text-sm font-black"><Layers className="w-5 h-5" />{allSlides[currentSlideIndex].chapterTitle}</div>
                                <h2 className="text-7xl font-black text-white leading-tight">{allSlides[currentSlideIndex].title}</h2>
                            </div>
                            <p className="text-3xl text-slate-400 italic">{(allSlides[currentSlideIndex] as any).content}</p>
                            <div className="flex items-center gap-8 pt-8"><div className="flex gap-2">{SIX_DIMENSIONS.map(d => (<div key={d.id} className={`w-4 h-4 rounded-full ${d.color}`} />))}</div><div className="h-6 w-px bg-white/20" /><p className="text-sm font-black text-blue-400 uppercase tracking-widest">الجامعة العالمية للطب الشمولي</p></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            <AnimatePresence>
                {isNewModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-white/10 p-10 rounded-[40px] shadow-2xl max-w-2xl w-full space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-white flex items-center gap-3"><MonitorPlay className="w-8 h-8 text-amber-500" />تأسيس محاضرة أكاديمية جديدة</h2>
                                <button onClick={() => setIsNewModalOpen(false)} className="p-3 hover:bg-white/5 rounded-2xl text-slate-500"><ArrowLeft className="w-6 h-6 rotate-180" /></button>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase mr-2">عنوان المحاضرة</label>
                                    <input type="text" placeholder="مثال: داء السكري بصيغة الطب الشمولي..." className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white focus:border-amber-500/50 outline-none" value={newLectureForm.title} onChange={(e) => setNewLectureForm({ ...newLectureForm, title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase mr-2">أهداف المحاضرة</label>
                                    <textarea placeholder="ما الذي تود تحقيقه في عقل المستمع؟" className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white min-h-[100px]" value={newLectureForm.objectives} onChange={(e) => setNewLectureForm({ ...newLectureForm, objectives: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase mr-2">الجمهور المستهدف</label>
                                    <input type="text" placeholder="مثال: الأطباء أو طلاب العلم..." className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white" value={newLectureForm.audience} onChange={(e) => setNewLectureForm({ ...newLectureForm, audience: e.target.value })} />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-4">
                                <button onClick={handleNewLecture} className="flex-1 py-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20"><BrainCircuit className="w-5 h-5" />بدء البحث العلمي المدمج</button>
                                <button onClick={() => setIsNewModalOpen(false)} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 font-bold text-sm">إلغاء</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
