'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MonitorPlay, GraduationCap, FileCheck, Globe, Bot, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

const IconMap = {
    MonitorPlay,
    GraduationCap,
    FileCheck,
    Globe,
    Bot,
    BrainCircuit
} as const;

export interface ButtonProps {
    id: string;
    title: string;
    icon: keyof typeof IconMap;
    description: string;
}

export default function DashboardGrid({ buttons }: { buttons: ButtonProps[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl z-10">
            {buttons.map((btn, idx) => (
                <Link
                    href={
                        btn.id === 'editor' ? '/editor' :
                            btn.id === 'research' ? '/research' :
                                btn.id === 'audit' ? '/audit' :
                                    btn.id === 'encyclopedia' ? '/encyclopedia' :
                                        btn.id === 'lectures' ? '/lectures' :
                                            btn.id === 'academic-agent' ? '/academic-agent' :
                                                '#'
                    }
                    key={btn.id}
                    className="block contents"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass glass-hover p-8 rounded-3xl flex flex-col items-center text-center group cursor-pointer h-full"
                    >
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all duration-300 mb-6 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                            {React.createElement(IconMap[btn.icon], {
                                className: "w-10 h-10 text-slate-300 group-hover:text-amber-500 transition-colors"
                            })}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-amber-500 transition-colors">
                            {btn.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">
                            {btn.description}
                        </p>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
