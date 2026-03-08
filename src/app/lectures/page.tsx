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
    History,
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

// Mock Data for a Lecture Structure (Balanced per Ninth Council)
const MOCK_LECTURE = {
    title: 'أساسيات الطب الشمولي: من الخلية إلى الكون',
    chapters: [
        {
            id: 'ch1',
            title: 'الباب الأول: التأصيل المنهجي للطاقة الحيوية',
            sections: [
                {
                    id: 's1',
                    title: 'المبحث الأول: تعريف الطاقة في المدارس القديمة',
                    pages: 15,
                    content: 'في هذا المبحث، نقوم بتطبيق "الضوابط السبعة" للبحث العلمي لضمان شمولية الطرح. نبدأ بـ الجمع بين الأدلة التراثية و الدمج مع المعطيات المخبرية الحديثة. إن الهدف هو تحقيق المقارنة الموضوعية التي تؤدي إلى الموازنة بين مختلف المدارس الطبية، مع الحفاظ على دقة الاستدلال و الملائمة للسياق المعاصر.'
                },
                {
                    id: 's2',
                    title: 'المبحث الثاني: المفهوم الفيزيائي المعاصر للمجال الطاقي',
                    pages: 14,
                    content: 'ننتقل هنا لتحليل المجال الطاقي من منظور ميكانيكا الكم، حيث نربط بين مفهوم "الأثير" في النصوص القديمة وبين "المجال الموحد" في الفيزياء الحديثة. هذا الربط ليس مجرد فحص نظري، بل هو تأصيل علمي لكيفية تأثير النوايا والمشاعر على المادة الحيوية.'
                },
            ]
        },
        {
            id: 'ch2',
            title: 'الباب الثاني: البعد العضوي والنواقل العصبية',
            sections: [
                {
                    id: 's3',
                    title: 'المبحث الأول: كيمياء الدماغ والمشاعر العميقة',
                    pages: 16,
                    content: 'نركز في هذا القسم على محور (الدماغ-الأمعاء) وكيف يتحكم التوازن الحيوي في النواقل العصبية مثل السيروتونين والدوبامين. الدراسة تثبت أن المشاعر ليست مجرد ردود فعل نفسية بل هي تفاعلات كيميائية حيوية تتأثر بالتغذية والبيئة المحيطة.'
                },
                {
                    id: 's4',
                    title: 'المبحث الثاني: أثر الغذاء على التوازن الهرموني',
                    pages: 15,
                    content: 'التوازن الهرموني هو مرآة الموازنة الشمولية. نناقش هنا الأطعمة "المعدلة للمزاج" ودورها في ضبط الغدد الصماء، مع التركيز على "القانون السابع" وهو الملائمة، حيث تختلف الاحتياجات الغذائية حسب الطبيعة البشرية والظروف المناخية.'
                },
            ]
        },
        {
            id: 'ch3',
            title: 'الباب الثالث: البعد الروحي والكوني',
            sections: [
                {
                    id: 's5',
                    title: 'المبحث الأول: تأثير المجالات المغناطيسية الكونية',
                    pages: 15,
                    content: 'لاحظ الارتباط الوثيق بين البعد العضوي والمجال الكوني في هذه النقطة بالذات، حيث تتأثر الدورات البيولوجية ليس فقط بالغذاء، بل بالدورات البيولوجية المرتبطة بالمجال المغناطيسي للأرض والنشاط الشمسي.'
                },
                {
                    id: 's6',
                    title: 'المبحث الثاني: الروحانية كعنصر استشفائي أساسي',
                    pages: 16,
                    content: 'الختام يكون مع البعد الروحي، وهو المحرك الأساسي للأبعاد الستة. نوضح هنا كيف يساهم التأمل والسكينة الروحية في تحفيز نظام المناعة (Immunology) وتسريع عمليات التشافي الذاتي وفق ميزان المجلس التاسع.'
                },
            ]
        }
    ]
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

type DegreeLevel = 'diploma' | 'master' | 'phd';

const DEGREE_CONFIG = {
    diploma: { chapters: 3, sections: 6, label: 'دبلوم' },
    master: { chapters: 6, sections: 12, label: 'ماجستير' },
    phd: { chapters: 9, sections: 18, label: 'دكتوراه' },
};

// Intellectual Footprint constant
const LAILA_FOOTPRINT = "البصمة الفكرية للباحثة د. ليلى السكاك: البحث الشمولي ليس مجرد جمع معلومات، بل هو صياغة كينونة معرفية تربط العرض بالجوهر.";

// Function to generate dynamic academic structure
const generateAcademicStructure = (title: string, level: DegreeLevel) => {
    const config = DEGREE_CONFIG[level];
    const structure: any = {
        title,
        level,
        mandatoryPages: [
            { id: 'basmala', title: 'البسملة', type: 'header', content: 'بسم الله الرحمن الرحيم - بدئنا باسم الخالق لتوثيق الصلة بين العلم والإيمان.' },
            { id: 'dedication', title: 'الإهداء الأكاديمي', type: 'header', content: 'إلى طالبي الحقيقة والباحثين عن التوازن الشمولي في محراب العلم.' },
            { id: 'intro', title: 'مقدمة البحث (بروتوكول الـ 7 عناصر)', type: 'header', content: 'سبب الاختيار: الرغبة في كشف الأبعاد الخفية. المنهج: المدمج المقارن. حل الإشكاليات: سد الثغرة بين المدارس القديمة والحديثة. الأسرار: التنويه بالقوانين الكونية المكتشفة. الجاذبية: عرض مشوق. الأسلوب: الفقيه الباحث. الأدوات: Nano Banana 2 والموسوعة الشمولية.' },
        ],
        chapters: []
    };

    for (let c = 1; c <= config.chapters; c++) {
        structure.chapters.push({
            id: `ch${c}`,
            title: `الباب ${c}: مدخل المبحث الموزون`,
            madkhal: `مدخل الباب ${c}: ربط الفرع بالأصل والجذور التاريخية وفق ميزان المجلس التاسع.`,
            footprint: LAILA_FOOTPRINT,
            infographic: `خريطة ذهنية أولية للباب ${c} تعبر عن محتواه الشمولي (Nano Banana 2).`,
            sections: Array.from({ length: config.sections }, (_, s) => ({
                id: `s${c}-${s + 1}`,
                title: `${s % 2 === 0 ? `المبحث ${s + 1}: الفصل المركزي` : `هل سألنا عن ${s + 1}؟ (سؤال فرعي)`}`,
                pages: 15,
                content: `محتوى المبحث ${s + 1} المولد آلياً بالاعتماد على الأبعاد الستة والضوابط السبعة. يتم هنا تحليل العناوين (مركزية، رئيسية، وفرعية) لضمان عدم التشتت المنهجي وفق بروتوكول د. إحسان حمدان.`,
                citations: ['مرجع أكاديمي 1', 'دورية الطب الشمولي 2026', 'مخطوطة التراث المدمجة'],
                connection: `جملة ربط: وبالانتقال من هذا العمق، نجد أن الفصل التالي يكمل ميزان هذا الباب...`
            }))
        });
    }

    structure.conclusion = {
        id: 'conclusion',
        title: 'الخاتمة الشمولية',
        results: 'خلاصة النتائج وفق الأبعاد الستة: تم إثبات أن الصحة هي نتاج موازنة بين العضوي والكوني.',
        recommendations: 'التوصيات: ضرورة اعتماد الحلول السلوكية الموازنة قبل العلاج الدوائي.',
        footprint: 'البصمة الختامية: الباحثة كـ (فقيه باحث) استطاعت فك شفرة هذا المبحث عبر المنهج الشمولي.'
    };

    return structure;
};

export default function AcademicLecturesPage() {
    const [activeTab, setActiveTab] = useState('studio'); // 'studio' or 'presentation'
    // Current Lecture Data
    const [academicData, setAcademicData] = useState<any>(null);
    const [selectedSection, setSelectedSection] = useState<any>(null);

    const [isGeneratingVisuals, setIsGeneratingVisuals] = useState(false);
    const [generatedVisual, setGeneratedVisual] = useState<string | null>(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // New State for Modal and Inputs
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [newLectureForm, setNewLectureForm] = useState({
        title: '',
        dimensions: [] as string[],
        level: 'diploma' as DegreeLevel
    });

    // Initialize with a mock if nothing is selected
    useEffect(() => {
        if (!academicData) {
            const initial = generateAcademicStructure(MOCK_LECTURE.title, 'diploma');
            setAcademicData(initial);
            setSelectedSection(initial.mandatoryPages[0]);
        }
    }, [academicData]);

    const handleNewLecture = () => {
        const newData = generateAcademicStructure(newLectureForm.title, newLectureForm.level);
        setAcademicData(newData);
        setSelectedSection(newData.mandatoryPages[0]);
        setIsNewModalOpen(false);
        setNewLectureForm({ title: '', dimensions: [], level: 'diploma' });
    };

    // Flatten all sections into slides for presentation mode
    const allSlides = academicData ? [
        ...academicData.mandatoryPages,
        ...academicData.chapters.flatMap((ch: any) => [
            { id: `madkhal-${ch.id}`, title: `مدخل ${ch.title}`, content: ch.madkhal, chapterTitle: ch.title },
            { id: `infographic-${ch.id}`, title: `الخارطة الذهنية للباب`, content: ch.infographic, chapterTitle: ch.title, type: 'visual' },
            ...ch.sections.flatMap((s: any) => [
                { ...s, chapterTitle: ch.title },
                { id: `conn-${s.id}`, title: 'جسر السردية', content: s.connection, chapterTitle: ch.title, type: 'connection' }
            ]),
            { id: `footprint-${ch.id}`, title: 'البصمة الفكرية', content: ch.footprint, chapterTitle: ch.title }
        ]),
        { ...academicData.conclusion, chapterTitle: 'النهاية' }
    ] : [];

    const handleGenerateVisuals = () => {
        setIsGeneratingVisuals(true);
        setGeneratedVisual(null);
        // Simulation of "Nano Banana 2" agent
        setTimeout(() => {
            setIsGeneratingVisuals(false);
            // In a real app, this would be a URL from an Image Generation API
            setGeneratedVisual('https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=2070');
        }, 3000);
    };

    const nextSlide = () => {
        if (currentSlideIndex < allSlides.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden flex flex-col" dir="rtl">
            {/* Top Navigation Bar */}
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
                            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                                بوضعية {DEGREE_CONFIG[academicData?.level as DegreeLevel]?.label || 'الدبلوم'} • الدستور المنهجي المعتمد
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-950/50 p-1 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setActiveTab('studio')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'studio' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            <Settings2 className="w-4 h-4" />
                            استوديو التصميم
                        </button>
                        <button
                            onClick={() => setActiveTab('presentation')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'presentation' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            <Presentation className="w-4 h-4" />
                            عرض المحاضرة
                        </button>
                    </div>

                    <button
                        onClick={() => setIsNewModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500 transition-all hover:text-slate-950"
                    >
                        <PlusCircle className="w-5 h-5" />
                        محاضرة جديدة
                    </button>

                    <button
                        onClick={() => {
                            const buffer = useAcademicStore.getState().searchBuffer;
                            if (buffer) {
                                alert('تمت مزامنة بيانات الموسوعة مع المحاضرة بنجاح!');
                                // In a real app, this would append to the active section's notes or body
                            } else {
                                alert('لا توجد بيانات جديدة للمزامنة.');
                            }
                        }}
                        className="p-3 rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 hover:bg-violet-600/30 transition-all group"
                        title="مزامنة شاملة"
                    >
                        <Workflow className="w-5 h-5 group-hover:animate-spin" />
                    </button>
                    <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group">
                        <Share2 className="w-5 h-5 text-slate-400 group-hover:text-amber-500" />
                    </button>
                </div>
            </header>

            {activeTab === 'studio' ? (
                <div className="flex-1 flex overflow-hidden">
                    {/* Lecture Navigation Sidebar */}
                    <aside className="w-80 border-l border-white/5 bg-slate-950/30 overflow-y-auto p-6 scrollbar-hide shrink-0">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            هيكلية المحاضرة
                        </h3>

                        <div className="space-y-8">
                            {/* Mandatory Pages */}
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">الصفحات الإلزامية</h4>
                                {academicData?.mandatoryPages.map((page: any) => (
                                    <button
                                        key={page.id}
                                        onClick={() => setSelectedSection(page)}
                                        className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${selectedSection?.id === page.id ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                                    >
                                        <BookOpenCheck className="w-4 h-4" />
                                        {page.title}
                                    </button>
                                ))}
                            </div>

                            {academicData?.chapters.map((chapter: any) => (
                                <div key={chapter.id} className="space-y-3">
                                    <h4 className="text-sm font-black text-amber-500/80 pr-2 border-r-2 border-amber-500/20 py-1">
                                        {chapter.title}
                                    </h4>
                                    <div className="space-y-1">
                                        {chapter.sections.map((section: any) => (
                                            <button
                                                key={section.id}
                                                onClick={() => setSelectedSection(section)}
                                                className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${selectedSection?.id === section.id ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
                                            >
                                                <span className="truncate">{section.title}</span>
                                                <span className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">{section.pages} ص</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Conclusion */}
                            <button
                                onClick={() => setSelectedSection(academicData.conclusion)}
                                className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${selectedSection?.id === 'conclusion' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                            >
                                <GraduationCap className="w-4 h-4" />
                                {academicData?.conclusion.title}
                            </button>
                        </div>

                        <div className="mt-12 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                            <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                <Scale className="w-4 h-4" />
                                <span className="text-xs font-bold">ميزان المجلس التاسع</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">توزيع الأبواب متوازن تماماً بفارق ±1 صفحة (تم التحقق).</p>
                        </div>
                    </aside>

                    {/* Main Content Area: Design Studio */}
                    <main className="flex-1 flex flex-col bg-slate-950/20 overflow-y-auto p-12">
                        <div className="max-w-5xl mx-auto w-full space-y-12">
                            {/* Content Card */}
                            <div className="glass p-12 rounded-[48px] border border-white/10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                    <BrainCircuit className="w-64 h-64 text-amber-500" />
                                </div>

                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                                            <Sparkles className="w-3 h-3" />
                                            الوكيل المصمم Nano Banana 2 نشط
                                        </div>
                                        <div className="flex gap-2">
                                            {SIX_DIMENSIONS.map(d => (
                                                <div key={d.id} title={d.label} className={`w-3 h-3 rounded-full ${d.color} opacity-80 hover:opacity-100 cursor-help transition-all shadow-lg shadow-${d.id}/20`} />
                                            ))}
                                        </div>
                                    </div>

                                    <h2 className="text-4xl font-black text-white leading-tight">
                                        {selectedSection?.title}
                                    </h2>

                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-xl text-slate-400 leading-relaxed text-justify">
                                            {selectedSection?.content || selectedSection?.results}
                                        </p>
                                        {selectedSection?.recommendations && (
                                            <div className="mt-8 p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                                                <h4 className="text-emerald-400 font-bold mb-2">التوصيات الإجرائية:</h4>
                                                <p className="text-sm text-slate-400">{selectedSection.recommendations}</p>
                                            </div>
                                        )}
                                        {selectedSection?.footprint && (
                                            <div className="mt-8 p-6 rounded-3xl bg-violet-500/5 border border-violet-500/20 italic">
                                                <div className="flex items-center gap-2 text-violet-400 mb-2">
                                                    <Quote className="w-4 h-4" />
                                                    <span className="text-xs font-bold">بصمة الباحثة</span>
                                                </div>
                                                <p className="text-sm text-slate-400">{selectedSection.footprint}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Citations Footer */}
                                    {selectedSection?.citations && (
                                        <div className="mt-12 pt-8 border-t border-white/5">
                                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">المراجع والإحالات العلمية</h4>
                                            <ul className="grid grid-cols-2 gap-4">
                                                {selectedSection.citations.map((cite: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-2 text-[10px] text-slate-500">
                                                        <span className="w-4 h-4 rounded bg-white/5 flex items-center justify-center shrink-0">{i + 1}</span>
                                                        {cite}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Nano Banana 2: Visual Designer Integration */}
                                    <div className="mt-12 pt-12 border-t border-white/5 space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-black flex items-center gap-3">
                                                    <ImageIcon className="w-6 h-6 text-amber-500" />
                                                    توليد العناصر البصرية التعليمية
                                                </h3>
                                                <p className="text-sm text-slate-500 italic">يتم تحليل المبحث لإنشاء إنفوجرافيك يعبر عن الأبعاد الستة</p>
                                            </div>
                                            <button
                                                onClick={handleGenerateVisuals}
                                                disabled={isGeneratingVisuals}
                                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-black text-sm flex items-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-amber-600/20 disabled:opacity-50"
                                            >
                                                {isGeneratingVisuals ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                                                        جاري التوليد...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="w-5 h-5 animate-pulse" />
                                                        توليد (Infographic) المحاضرة
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <div className="relative aspect-video rounded-[32px] bg-slate-900 border border-white/5 overflow-hidden flex items-center justify-center text-slate-600 group">
                                            {isGeneratingVisuals ? (
                                                <div className="flex flex-col items-center gap-4 animate-pulse">
                                                    <BrainCircuit className="w-16 h-16 text-amber-500/20" />
                                                    <p className="text-xs font-bold tracking-widest text-amber-500/40">NANO BANANA 2 IS THINKING...</p>
                                                </div>
                                            ) : generatedVisual ? (
                                                <>
                                                    <img src={generatedVisual} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" alt="Generated visual" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                                        <p className="text-emerald-400 text-xs font-black flex items-center gap-2 mb-2">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            تم التوليد بنجاح وفق معايير جوجل الصورية
                                                        </p>
                                                        <div className="flex gap-4">
                                                            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"><Download className="w-4 h-4" /></button>
                                                            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"><Maximize2 className="w-4 h-4" /></button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center gap-4 opacity-30">
                                                    <ImageIcon className="w-16 h-16" />
                                                    <p className="text-xs font-bold tracking-widest uppercase">No visuals generated yet for this section</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Methodology Checklist Indicator */}
                            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                                {SEVEN_RULES.map((rule, idx) => (
                                    <div key={idx} className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3 text-center group hover:border-emerald-500/50 transition-all">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <CheckCircle2 className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase transition-colors">{rule}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            ) : (
                /* PRESENTATION MODE: Slides Interface */
                <div className="flex-1 bg-slate-950 p-12 flex items-center justify-center relative">
                    {/* Navigation Controls */}
                    <button
                        onClick={prevSlide}
                        disabled={currentSlideIndex === 0}
                        className="absolute right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all disabled:opacity-20 z-10"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={currentSlideIndex === allSlides.length - 1}
                        className="absolute left-8 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all disabled:opacity-20 z-10"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlideIndex}
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -100, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: 'circOut' }}
                            className="w-full max-w-6xl aspect-[16/9] bg-slate-900 rounded-[56px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex overflow-hidden relative"
                        >
                            {/* Slide Background Visual */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-amber-500/20" />
                                <BrainCircuit className="absolute -bottom-24 -right-24 w-[600px] h-[600px]" />
                            </div>

                            {/* Slide Content */}
                            <div className="flex-1 p-24 flex flex-col justify-center gap-12 relative z-10">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-500 text-sm font-black">
                                        <Layers className="w-5 h-5" />
                                        {allSlides[currentSlideIndex].chapterTitle}
                                    </div>
                                    <h2 className="text-7xl font-black text-white leading-tight">
                                        {allSlides[currentSlideIndex].title}
                                    </h2>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-3xl text-slate-400 leading-relaxed max-w-4xl font-light italic">
                                        {(allSlides[currentSlideIndex] as any).content || (allSlides[currentSlideIndex] as any).results}
                                    </p>

                                    {(allSlides[currentSlideIndex] as any).recommendations && (
                                        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 max-w-3xl">
                                            <p className="text-xl text-emerald-400 font-bold">التوصيات الإجرائية المباشرة:</p>
                                            <p className="text-lg text-slate-300">{(allSlides[currentSlideIndex] as any).recommendations}</p>
                                        </div>
                                    )}

                                    {(allSlides[currentSlideIndex] as any).footprint && (
                                        <div className="p-6 rounded-3xl bg-violet-500/10 border border-violet-500/20 max-w-3xl italic">
                                            <p className="text-lg text-slate-400">{(allSlides[currentSlideIndex] as any).footprint}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-8 pt-8">
                                    <div className="flex gap-2">
                                        {SIX_DIMENSIONS.map(d => (
                                            <div key={d.id} className={`w-4 h-4 rounded-full ${d.color} shadow-lg`} />
                                        ))}
                                    </div>
                                    <div className="h-6 w-px bg-white/20" />
                                    <p className="text-sm font-black text-blue-400 tracking-widest uppercase">الجامعة العالمية للطب الشمولي</p>
                                </div>
                            </div>

                            {/* Progress Bar (Footer of Slide) */}
                            <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between text-slate-500 text-xs font-black">
                                <span>{currentSlideIndex + 1} / {allSlides.length}</span>
                                <div className="flex-1 mx-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-amber-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentSlideIndex + 1) / allSlides.length) * 100}%` }}
                                    />
                                </div>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">الجيل الأكاديمي الثالث</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Presenter Tools */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10">
                        <button className="p-3 text-slate-400 hover:text-white transition-colors" title="إحصائيات"><PieChart className="w-5 h-5" /></button>
                        <button className="p-3 text-slate-400 hover:text-white transition-colors" title="ملاحظات المحاضر"><Info className="w-5 h-5" /></button>
                        <div className="h-4 w-px bg-white/10" />
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold" title="تحليل الموازنة">±5 ميزان</button>
                    </div>
                </div>
            )}

            {/* New Lecture Modal Overlay */}
            <AnimatePresence>
                {isNewModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-slate-900 border border-white/10 p-10 rounded-[40px] shadow-2xl max-w-2xl w-full space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    <MonitorPlay className="w-8 h-8 text-amber-500" />
                                    تأسيس محاضرة أكاديمية جديدة
                                </h2>
                                <button
                                    onClick={() => setIsNewModalOpen(false)}
                                    className="p-3 hover:bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="w-6 h-6 rotate-180" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">عنوان المحاضرة</label>
                                    <input
                                        type="text"
                                        placeholder="مثال: فيزياء الوعي وأبعاد النفس الستة..."
                                        className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:border-amber-500/50 outline-none transition-all"
                                        value={newLectureForm.title}
                                        onChange={(e) => setNewLectureForm({ ...newLectureForm, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">نوع الدرجة العلمية (تدرج الهيكل)</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {(Object.keys(DEGREE_CONFIG) as DegreeLevel[]).map(level => (
                                            <button
                                                key={level}
                                                onClick={() => setNewLectureForm({ ...newLectureForm, level })}
                                                className={`p-4 rounded-xl border font-bold transition-all flex flex-col items-center gap-2 ${newLectureForm.level === level ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-lg' : 'bg-white/5 border-white/5 text-slate-500'}`}
                                            >
                                                <GraduationCap className="w-5 h-5" />
                                                <span className="text-xs">{DEGREE_CONFIG[level].label}</span>
                                                <span className="text-[8px] opacity-60">{DEGREE_CONFIG[level].chapters} أبواب / {DEGREE_CONFIG[level].sections} فصول</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">الأبعاد الشمولية المستهدفة</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {SIX_DIMENSIONS.map(dim => (
                                            <button
                                                key={dim.id}
                                                onClick={() => {
                                                    const current = newLectureForm.dimensions;
                                                    const updated = current.includes(dim.id)
                                                        ? current.filter(id => id !== dim.id)
                                                        : [...current, dim.id];
                                                    setNewLectureForm({ ...newLectureForm, dimensions: updated });
                                                }}
                                                className={`p-3 rounded-xl border text-[10px] font-bold transition-all flex items-center gap-2 ${newLectureForm.dimensions.includes(dim.id) ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-white/5 border-white/5 text-slate-500 opacity-60 hover:opacity-100'}`}
                                            >
                                                <div className={`w-2 h-2 rounded-full ${dim.color}`} />
                                                {dim.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    onClick={handleNewLecture}
                                    className="flex-1 py-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20"
                                >
                                    <BrainCircuit className="w-5 h-5" />
                                    بدء البحث العلمي المدمج
                                </button>
                                <button
                                    onClick={() => setIsNewModalOpen(false)}
                                    className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 font-bold text-sm hover:bg-white/10 transition-all"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
