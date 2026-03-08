import {
    Activity,
    Brain,
    Wind,
    Heart,
    Users,
    Sun
} from 'lucide-react';

export const SIX_DIMENSIONS = [
    { id: 'organic', label: 'البعد العضوي', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'psychological', label: 'البعد النفسي', icon: Brain, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'spiritual', label: 'البعد الروحي', icon: Wind, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'emotional', label: 'البعد العاطفي', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'social', label: 'البعد الاجتماعي', icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'cosmic', label: 'البعد الكوني', icon: Sun, color: 'text-violet-500', bg: 'bg-violet-500/10' },
];

export const SEVEN_RULES = [
    'الجمع', 'الدمج', 'المقارنة', 'الموازنة', 'التحليل', 'الاستدلال', 'الملائمة'
];

export const TEN_TERMS = [
    'التعريف', 'المفهوم', 'الدلالة', 'المسمى المختار', 'الأدلة والنصوص',
    'الأهمية العلمية', 'القواعد الحاكمة', 'الضوابط البحثية', 'المنهجية المقترحة', 'الخلاصة والنتائج'
];

// Academic Engine Logic: Chapter Balance (±5 Pages)
export const checkChapterBalance = (chapters: { pages: number }[]) => {
    if (chapters.length < 2) return { isBalanced: true, diff: 0 };
    const pages = chapters.map(c => c.pages);
    const min = Math.min(...pages);
    const max = Math.max(...pages);
    const diff = max - min;
    return {
        isBalanced: diff <= 5,
        diff
    };
};

// Nano Banana 2: Shared Visual Generator Mock Helper
export const generateHolisticVisual = async (prompt: string) => {
    console.log(`[Nano Banana 2] Generating visual for: ${prompt}`);
    // In real implementation, this would call a DALL-E or Google Imagen API
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve('https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=2000');
        }, 2000);
    });
};
