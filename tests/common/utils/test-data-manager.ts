import fs from 'fs';
import path from 'path';

export class TestDataManager {
    private static instance: TestDataManager;
    private readonly dataDir: string;

    private constructor() {
        this.dataDir = path.join(process.cwd(), 'test-data');
        this.ensureDataDirectory();
    }

    public static getInstance(): TestDataManager {
        if (!TestDataManager.instance) {
            TestDataManager.instance = new TestDataManager();
        }
        return TestDataManager.instance;
    }

    private ensureDataDirectory(): void {
        const directories = [
            this.dataDir,
            // path.join(this.dataDir, 'users'),
            // path.join(this.dataDir, 'vehicles'),
            // path.join(this.dataDir, 'documents'),
            // path.join(this.dataDir, 'transactions'),
            // path.join(this.dataDir, 'environments'),
            path.join(this.dataDir, 'test-data')
        ];

        directories.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    public async loadTestData<T>(category: string, filename: string): Promise<T> {
        const filePath = path.join(this.dataDir, category, `${filename}.json`);
        
        if (!fs.existsSync(filePath)) {
            throw new Error(`Test data file not found: ${filePath}`);
        }

        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }

    public async saveTestData<T>(category: string, filename: string, data: T): Promise<void> {
        const filePath = path.join(this.dataDir, category, `${filename}.json`);
        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    }

    public async generateUniqueId(prefix: string): Promise<string> {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `${prefix}_${timestamp}_${random}`;
    }

    public async getEnvironmentData(env: string): Promise<any> {
        return this.loadTestData('environments', env);
    }
} 