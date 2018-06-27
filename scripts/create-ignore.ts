import { writeFile } from 'fs';

let ignoreList: string[] = [
    '*.ts',
    '!*.d.ts'
];

writeFile('.npmignore', ignoreList.join('\n'), { encoding: 'utf8' }, (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
});
