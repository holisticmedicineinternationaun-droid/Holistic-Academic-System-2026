const { execSync } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

const REPO_NAME = 'Holistic-Academic-System-2026';

function run(cmd) {
    try {
        return execSync(cmd, { encoding: 'utf8' }).trim();
    } catch (e) {
        return null;
    }
}

// 1. Initialize Git if not exists
if (!run('git rev-parse --is-inside-work-tree')) {
    console.log('Initializing Git...');
    run('git init');
}

// 2. Identify the change type for the commit message
function getCommitMessage(filePath) {
    const ext = path.extname(filePath);
    const fileName = path.basename(filePath);
    const dirName = path.dirname(filePath);

    if (filePath.includes('research')) return 'تحديث أبحاث جامعية وفق ميزان المجلس التاسع';
    if (filePath.includes('lectures')) return 'إضافة إنفوجرافيك جديد عبر Nano Banana 2 والمحاضرات';
    if (filePath.includes('editor')) return 'تحديث المحرر الذكي والربط المنهجي';
    if (filePath.includes('encyclopedia')) return 'تطوير الموسوعة الشمولية والأبعاد الستة';
    if (filePath.includes('audit')) return 'تحديث المختبر الشمولي وكاشف الفجوات';
    if (fileName === 'CONSTITUTION.md') return 'تحديث دستور المنظومة الشمولية';
    if (fileName === 'LOGIC_SYSTEM.md') return 'مزامنة نظام المنطق الأكاديمي';
    if (filePath.includes('holistic-core')) return 'تحديث ميزان الأبواب والضوابط الموحدة';

    return `تعديل برمجى في ${fileName}`;
}

// 3. Watch for changes
console.log('Auto-Sync Agent: Monitoring Holistic Academic System...');
const watcher = chokidar.watch('.', {
    ignored: [/(^|[\/\\])\../, 'node_modules', '.next', 'out', 'build'], // ignore dotfiles, node_modules etc
    persistent: true,
    ignoreInitial: true
});

let debounceTimer;
watcher.on('change', (filePath) => {
    // Debounce to avoid multiple commits for rapid saves
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        console.log(`\n[Auto-Sync] Detected change in: ${filePath}`);

        try {
            const message = getCommitMessage(filePath);

            console.log('Staging changes...');
            run('git add .');

            console.log(`Committing: "${message}"`);
            run(`git commit -m "${message}"`);

            console.log('Pushing to GitHub...');
            run('git push');

            console.log('Done! System Synced with GitHub.');
        } catch (error) {
            console.error('[Sync Error] Possibly remote not set or no changes to commit.');
        }
    }, 2000);
});
