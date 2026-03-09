'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BrainCircuit,
    Sparkles,
    Send,
    BookOpen,
    Layers,
    ShieldCheck,
    Scale,
    Workflow,
    Image as ImageIcon,
    Download,
    Share2,
    ChevronRight,
    Search,
    User,
    Bot,
    Clock,
    FileText,
    History
} from 'lucide-react';
import Link from 'next/link';
import { useAcademicStore } from '@/hooks/holistic-core/use-academic-store';

// --- System Core Logic (Scholar-Jurist Brain) ---

const LAILA_FOOTPRINT = "البصمة الفكرية للباحثة د. ليلى السسكاك: البحث الشمولي ليس مجرد جمع معلومات، بل هو صياغة كينونة معرفية تربط العرض بالجوهر وتكشف مكنونات الحقائق.";

const generateAutonomousContent = (topic: string, section: string, context: string = "") => {
    return `وعلى أعتاب الاستبصار الأكاديمي، نقف اليوم لفك رموز هذه الظاهرة الموسومة بـ (${topic})، حيث لا يكتفي العقل بالوصف السطحي، بل يغوص في أعماق (الاستدلال) العقلي والوجداني ليربط المسكوت عنه بالمنطوق. إن المبحث الذي نسبر أغواره الآن، وهو (${section})، يمثل حلقة وصلٍ جوهرية في سلسلة (الموازنة) الحيوية، حيث تتآلف الأبعاد الستة (العضوية، النفسية، الروحية، العاطفية، الاجتماعية، والكونية) في وحدةٍ بنائيةٍ واحدة. إننا حين نُعمل ميزان (الملائمة) الأكاديمية، نجد أن كل خلية في هذا العرض العلمي تسطر ملحمةً من ملاحم الخلق، تتجاوز حدود الطب الكلاسيكي لتلامس آفاق الطب الشمولي. إن الترابط السردي هنا ليس مجرد رصفٍ للكلمات، بل هو هندسةٌ فكريةٌ تستوجب منا استحضار هيبة البحث وقوة الاستنباط، لنكشف عن تلك الأسرار التي لا تُبصرها إلا عيون الفقيه الباحث المتمكن. ${context}`;
};

interface Message {
    id: string;
    role: 'user' | 'agent';
    content: string;
    type?: 'text' | 'result';
    data?: any;
    timestamp: Date;
}

export default function AcademicAutonomousAgent() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'agent',
            content: "أهلاً بك في محراب العلم الشمولي. أنا وكيلك الأكاديمي المستقل، المدرس الخصوصي والباحث المتمكن. زودني فقط بـ (عنوان البحث) وسأقوم ببناء منظومة معرفية متكاملة لك.",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeResult, setActiveResult] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSearch = async (title: string) => {
        if (!title.trim()) return;

        setIsProcessing(true);
        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: title, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Step 1: Brain Simulation - Thinking & Structuring
        const agentThinkingMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'agent',
            content: `جاري تفعيل "المحرك الذهني الشمولي"... أقوم الآن بتطبيق الضوابط السبعة ورسم الهيكل (3 أبواب، 6 فصول) لعنوانك: ${title}`,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, agentThinkingMsg]);

        await new Promise(r => setTimeout(r, 2000));

        // Step 2: Content Generation Simulation
        const structure = {
            title: title,
            chapters: [
                {
                    title: "الباب الأول: التأصيل المنهجي والأبعاد الستة",
                    content: generateAutonomousContent(title, "المدخل الروحاني والموضع الأورجاني"),
                    visual: "Infographic: Nano Banana 2 - The Six Dimensions Integration Map"
                },
                {
                    title: "الباب الثاني: الموازنة الحيوية والاستدلال العلمي",
                    content: generateAutonomousContent(title, "ميزان الملاءمة بين الدليل والواقع"),
                    visual: "Conceptual Diagram: Scholar-Jurist Reasoning Loop"
                },
                {
                    title: "الباب الثالث: الاستشراف الطبقي والبصمة الفكرية",
                    content: generateAutonomousContent(title, "نتائج الربط بين الخلية والكون"),
                    visual: "Final Vision: Holistic Academic Synthesis"
                }
            ],
            footprint: LAILA_FOOTPRINT
        };

        const resultMsg: Message = {
            id: (Date.now() + 2).toString(),
            role: 'agent',
            content: "تم الانتهاء من صياغة المادة العلمية الشمولية. يمكنك استعراضها في لوحة النتائج الآن.",
            type: 'result',
            data: structure,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, resultMsg]);
        setActiveResult(structure);
        setIsProcessing(false);

        // Save to global store
        useAcademicStore.getState().setProjectMeta(title, 'وكيل مستقل', structure.chapters.map(c => ({ name: c.title, pages: 15 })));
    };

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        if (!activeResult) return;
        const element = document.querySelector('.print-content') as HTMLElement;
        if (!element) return;

        setIsDownloading(true);
        try {
            // Dynamic imports to handle SSR and save bundle size
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgScaledWidth = imgWidth * ratio;
            const imgScaledHeight = imgHeight * ratio;

            // Handle multiple pages if content is long
            let heightLeft = imgHeight;
            let position = 0;
            const pageHeightInPx = (pdfHeight / pdfWidth) * imgWidth;

            while (heightLeft > 0) {
                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = imgWidth;
                pageCanvas.height = Math.min(heightLeft, pageHeightInPx);
                const ctx = pageCanvas.getContext('2d');
                ctx?.drawImage(canvas, 0, position, imgWidth, pageCanvas.height, 0, 0, imgWidth, pageCanvas.height);

                const pageData = pageCanvas.toDataURL('image/png');
                if (position > 0) pdf.addPage();
                pdf.addImage(pageData, 'PNG', 0, 0, pdfWidth, (pageCanvas.height * pdfWidth) / imgWidth);

                heightLeft -= pageHeightInPx;
                position += pageHeightInPx;
            }

            pdf.save(`${activeResult.title}.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('عذراً، حدث خطأ أثناء توليد ملف PDF.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden" dir="rtl">
            <style jsx global>{`
                @media print {
                    aside:not(.print-content), main, .no-print {
                        display: none !important;
                    }
                    .print-content {
                        width: 100% !important;
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                        margin: 0 !important;
                        padding: 0 40px !important;
                    }
                    body {
                        background: white !important;
                        color: black !important;
                    }
                }
            `}</style>
            {/* Sidebar - History & Tools */}
            <aside className="w-80 border-l border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col shrink-0 no-print">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20">
                            <BrainCircuit className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="font-black text-lg tracking-tight">الوكيل المستقل</h2>
                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Academic Autonomous Agent</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setMessages([{
                                id: '1',
                                role: 'agent',
                                content: "أهلاً بك في محراب العلم الشمولي. أنا وكيلك الأكاديمي المستقل، المدرس الخصوصي والباحث المتمكن. زودني فقط بـ (عنوان البحث) وسأقوم ببناء منظومة معرفية متكاملة لك.",
                                timestamp: new Date()
                            }]);
                            setActiveResult(null);
                        }}
                        className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        <PlusCircle className="w-4 h-4" /> بحث أكاديمي جديد
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase px-4 mb-2 flex items-center gap-2">
                        <History className="w-3 h-3" /> السجل المعرفي
                    </h3>
                    {messages.filter(m => m.role === 'user').map(m => (
                        <button key={m.id} className="w-full text-right p-3 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5 transition-all truncate border border-transparent hover:border-white/5">
                            {m.content}
                        </button>
                    ))}
                </div>

                <div className="p-6 border-t border-white/5 bg-slate-950/30">
                    <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-all">
                        <ChevronRight className="w-4 h-4 rotate-180" /> عودة للوحة التحكم الشمولية
                    </Link>
                </div>
            </aside>

            {/* Main Chat Interface */}
            <main className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent no-print">

                {/* Chat Display Area */}
                <div className="flex-1 overflow-y-auto p-12 space-y-8 scrollbar-hide">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 text-blue-400 border border-white/10'
                                    }`}>
                                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={`max-w-2xl space-y-2 ${msg.role === 'user' ? 'text-left' : ''}`}>
                                    <div className={`p-6 rounded-3xl text-sm leading-relaxed shadow-xl ${msg.role === 'user'
                                        ? 'bg-blue-600/10 border border-blue-500/20 text-blue-100'
                                        : 'bg-slate-900/80 border border-white/5 text-slate-200 backdrop-blur-md'
                                        }`}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[10px] text-slate-600 font-bold block px-2">
                                        {msg.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-8 bg-gradient-to-t from-slate-950 to-transparent">
                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                        <div className="relative flex items-center bg-slate-900/90 border border-white/10 rounded-3xl p-2.5 backdrop-blur-2xl shadow-2xl">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch(input)}
                                placeholder="أدخل عنوان البحث لتفعيل الوكيل الأكاديمي..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-white px-6 text-sm placeholder:text-slate-600 py-3"
                                disabled={isProcessing}
                            />
                            <button
                                onClick={() => handleSearch(input)}
                                disabled={isProcessing || !input.trim()}
                                className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:grayscale text-white rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                            >
                                {isProcessing ? <Sparkles className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="mt-4 flex justify-center gap-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-emerald-500" /> الضوابط السبعة مفعلة</span>
                            <span className="flex items-center gap-1.5"><Scale className="w-3 h-3 text-blue-500" /> موازنة المجلس التاسع</span>
                            <span className="flex items-center gap-1.5"><Workflow className="w-3 h-3 text-purple-500" /> تحليل الأبعاد الستة</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Panel - Professional Output Preview */}
            <AnimatePresence>
                {activeResult && (
                    <motion.aside
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        className="w-[500px] bg-white text-slate-900 overflow-y-auto p-12 shrink-0 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-20 border-r border-slate-200 print-content"
                    >
                        <div className="max-w-md mx-auto space-y-12 pb-20">
                            {/* Academic Header */}
                            <div className="text-center space-y-4 border-b-2 border-slate-900 pb-10">
                                <h4 className="text-sm font-black uppercase tracking-widest opacity-60">جامعة الطب الشمولي - الوكيل الأكاديمي</h4>
                                <h1 className="text-3xl font-black leading-tight">{activeResult.title}</h1>
                                <div className="h-1 w-20 bg-slate-900 mx-auto" />
                                <p className="text-xs font-bold italic">تم الإنتاج بواسطة محرك الفقيه الباحث المستقل</p>
                            </div>

                            {/* Chapters */}
                            {activeResult.chapters.map((ch: any, i: number) => (
                                <div key={i} className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl font-black opacity-10 italic">0{i + 1}</span>
                                        <h2 className="text-xl font-black border-r-4 border-blue-600 pr-4">{ch.title}</h2>
                                    </div>

                                    <p className="text-sm leading-[2.2] text-justify font-serif">
                                        {ch.content}
                                    </p>

                                    {/* Nano Banana 2 Placeholder */}
                                    <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 group hover:bg-slate-100 transition-all cursor-pointer">
                                        <div className="p-4 rounded-full bg-amber-500/10 text-amber-600">
                                            <ImageIcon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Nano Banana 2 Generation</p>
                                            <p className="text-xs font-bold text-slate-700">{ch.visual}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Footprint */}
                            <div className="pt-10 border-t border-slate-200">
                                <blockquote className="p-6 bg-slate-50 rounded-2xl italic text-xs leading-relaxed text-slate-600 border-r-4 border-emerald-500">
                                    {activeResult.footprint}
                                </blockquote>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-10">
                                <button
                                    onClick={handleDownloadPDF}
                                    disabled={isDownloading}
                                    className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all no-print disabled:opacity-50"
                                >
                                    {isDownloading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            جاري التصدير...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4" /> تحميل بصيغة PDF
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('تم نسخ رابط البحث لمشاركته.');
                                    }}
                                    className="p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all no-print"
                                >
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <Link
                                    href="/editor"
                                    className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 transition-all group"
                                    title="تكملة التعديل في المحرر الذكي"
                                >
                                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                                </Link>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
}

const PlusCircle = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>
);
