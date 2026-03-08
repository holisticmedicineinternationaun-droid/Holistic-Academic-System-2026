'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileCheck,
    Upload,
    ShieldAlert,
    ShieldCheck,
    Search,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    FileText,
    Layers,
    BrainCircuit,
    Scale,
    BookOpen,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const SIX_DIMENSIONS = [
    { id: 'organic', label: 'البعد العضوي', description: 'يغطي الجوانب الفيزيولوجية والسريرية' },
    { id: 'psychological', label: 'البعد النفسي', description: 'يتناول النواقل العصبية والحالة الشعورية' },
    { id: 'spiritual', label: 'البعد الروحي', description: 'يشمل جوانب الغيب (السحر، المس، العين)' },
    { id: 'emotional', label: 'البعد العاطفي', description: 'يدرس المشاعر العميقة والتوازن العاطفي' },
    { id: 'social', label: 'البعد الاجتماعي', description: 'يتناول تأثير البيئة المحيطة والمجتمع' },
    { id: 'cosmic', label: 'البعد الكوني', description: 'يربط البحث بالمجال الفيزيائي والكوني العام' },
];

const SEVEN_RULES = [
    'الجمع', 'الدمج', 'المقارنة', 'الموازنة', 'التحليل', 'الاستدلال', 'الملائمة'
];

export default function HolisticAuditPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);
    const [auditStats, setAuditStats] = useState({
        dimensionsCovered: ['organic', 'psychological', 'emotional', 'social'],
        rulesApplied: ['الجمع', 'الدمج', 'التحليل', 'الملائمة'],
        gaps: [
            { dim: 'spiritual', suggestion: 'إضافة مبحث: "أثر الطاقات الغيبية والتوازن الروحي في الحالة المدروسة"' },
            { dim: 'cosmic', suggestion: 'إضافة مطلب: "الارتباط بين المجال الفيزيائي الكوني وتطور العلة المرضية"' }
        ]
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setScanComplete(false);
        }
    };

    const startScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);
        }, 4000);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 p-8 flex flex-col items-center font-sans" dir="rtl">
            {/* Background gradients */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full" />
            </div>

            <div className="w-full max-w-6xl relative z-10">
                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                            <FileCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black">المختبر الشمولي</h1>
                            <p className="text-slate-400">نظام التدقيق المنهجي وفحص الفجوات الأكاديمية</p>
                        </div>
                    </div>
                    <Link href="/" className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-bold flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        العودة للوحة القيادة
                    </Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Upload & Live View */}
                    <div className="lg:col-span-1 space-y-6">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`p-10 rounded-[32px] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-4 group ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 bg-white/5 hover:border-amber-500/50 hover:bg-amber-500/5'
                                }`}
                        >
                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx" />
                            <div className={`p-5 rounded-3xl transition-all ${file ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 group-hover:text-amber-500'}`}>
                                {file ? <CheckCircle2 className="w-12 h-12" /> : <Upload className="w-12 h-12" />}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{file ? file.name : 'ارفع ملف البحث هنا'}</h3>
                                <p className="text-sm text-slate-500 mt-2">يدعم ملفات PDF و Word (الحد الأقصى 200MB)</p>
                            </div>
                        </div>

                        {file && !scanComplete && !isScanning && (
                            <button
                                onClick={startScan}
                                className="w-full py-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-lg shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 animate-pulse"
                            >
                                <Search className="w-6 h-6" />
                                بدء الماسح الشمولي
                            </button>
                        )}

                        {isScanning && (
                            <div className="glass p-8 rounded-3xl border border-white/10 text-center space-y-6">
                                <div className="relative w-24 h-24 mx-auto">
                                    <div className="absolute inset-0 border-4 border-amber-500/10 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center text-amber-500">
                                        <ScanLines className="w-10 h-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-lg animate-pulse">
                                        {Math.random() > 0.5 ? 'الضغط الذكي (Smart Compression)...' : 'جاري المسح الشمولي...'}
                                    </h4>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 4 }}
                                            className="h-full bg-amber-500"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">تحسين معالجة البيانات الأكاديمية الكبيرة (200MB)</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Scan Results */}
                    <div className="lg:col-span-2 space-y-8">
                        <AnimatePresence mode="wait">
                            {!scanComplete ? (
                                <motion.div
                                    key="no-data"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-slate-600 bg-white/5 border border-white/10 rounded-[40px] border-dashed p-20"
                                >
                                    <FileText className="w-20 h-20 mb-6 opacity-20" />
                                    <p className="text-xl font-medium">يرجى رفع ملف لبدء الفحص والتدقيق</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8"
                                >
                                    {/* Holistic Dimensions Scan */}
                                    <div className="glass p-10 rounded-[40px] border border-white/10 shadow-2xl">
                                        <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-emerald-400">
                                            <ShieldCheck className="w-8 h-8" />
                                            نتائج الماسح الشمولي (الأبعاد الستة)
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {SIX_DIMENSIONS.map((dim) => {
                                                const isCovered = auditStats.dimensionsCovered.includes(dim.id);
                                                return (
                                                    <div key={dim.id} className={`p-5 rounded-2xl border transition-all ${isCovered ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'
                                                        }`}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className={`font-bold ${isCovered ? 'text-emerald-400' : 'text-rose-400'}`}>{dim.label}</span>
                                                            {isCovered ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
                                                        </div>
                                                        <p className="text-xs text-slate-500 leading-relaxed">{dim.description}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* GAP DETECTOR */}
                                        {auditStats.gaps.length > 0 && (
                                            <div className="mt-8 p-8 rounded-3xl bg-rose-600/10 border border-rose-600/20 space-y-4">
                                                <div className="flex items-center gap-3 text-rose-500 italic font-black">
                                                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                                                    <span>كاشف الفجوات: تم العثور على نقص في شمولية البحث</span>
                                                </div>
                                                <div className="space-y-3">
                                                    {auditStats.gaps.map((gap, i) => (
                                                        <div key={i} className="flex flex-col gap-1 pr-9 relative">
                                                            <div className="absolute right-0 top-1 p-1 bg-rose-500 rounded-full" />
                                                            <p className="text-sm font-bold text-slate-300">نقص في {SIX_DIMENSIONS.find(d => d.id === gap.dim)?.label}</p>
                                                            <p className="text-xs text-rose-400 font-medium">{gap.suggestion}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Methodology Auditor */}
                                    <div className="glass p-10 rounded-[40px] border border-white/10 shadow-2xl">
                                        <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-amber-500">
                                            <Scale className="w-8 h-8" />
                                            مدقق المنهجية (الضوابط السبعة)
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            {SEVEN_RULES.map((rule) => {
                                                const isApplied = auditStats.rulesApplied.includes(rule);
                                                return (
                                                    <div key={rule} className={`px-6 py-4 rounded-2xl border flex items-center gap-3 transition-all ${isApplied ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-800 border-white/5 text-slate-600'
                                                        }`}>
                                                        <span className="font-bold">{rule}</span>
                                                        {isApplied && <Sparkles className="w-4 h-4" />}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-6 p-4 bg-white/5 rounded-2xl text-xs text-slate-400">
                                            تنبيه: يرجى تعزيز ركيزة <strong>(الموازنة)</strong> و <strong>(الاستدلال)</strong> في الفصول الأخيرة من البحث لضمان توافقها مع LOGIC_SYSTEM.md.
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScanLines(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            <line x1="7" x2="17" y1="12" y2="12" />
        </svg>
    );
}
