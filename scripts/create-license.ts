import { copyFile } from 'fs';

copyFile('../../LICENSE', 'LICENSE', (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
});
