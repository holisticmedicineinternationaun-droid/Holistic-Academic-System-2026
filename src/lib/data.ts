import fs from 'fs';
import path from 'path';

export async function getSystemRules() {
    const constitutionPath = path.join(process.cwd(), 'CONSTITUTION.md');
    const logicSystemPath = path.join(process.cwd(), 'LOGIC_SYSTEM.md');

    let constitution = '';
    let logicSystem = '';

    try {
        constitution = fs.readFileSync(constitutionPath, 'utf8');
    } catch (err) {
        console.error('Error reading CONSTITUTION.md:', err);
    }

    try {
        logicSystem = fs.readFileSync(logicSystemPath, 'utf8');
    } catch (err) {
        console.error('Error reading LOGIC_SYSTEM.md:', err);
    }

    return {
        constitution,
        logicSystem
    };
}
