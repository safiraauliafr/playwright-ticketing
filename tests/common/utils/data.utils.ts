export class DataUtils {
    /**
     * Generate random string
     */
    static generateRandomString(length: number): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }

    /**
     * Generate random email
     */
    static generateEmail(domain = 'test.com'): string {
        const timestamp = new Date().getTime();
        const randomString = this.generateRandomString(8);
        return `test.${randomString}.${timestamp}@${domain}`;
    }

    /**
     * Generate random phone number (Malaysia format)
     */
    static generatePhoneNumber(): string {
        const prefixes = ['011', '012', '013', '014', '015', '016', '017', '018', '019'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
        return `${prefix}${number}`;
    }

    /**
     * Generate random car data
     */
    static generateCarData(): {
        make: string;
        model: string;
        year: number;
        price: number;
        mileage: number;
    } {
        const makes = ['Toyota', 'Honda', 'Mazda', 'Nissan', 'BMW', 'Mercedes'];
        const models = ['Camry', 'Civic', 'CX-5', 'X3', 'C200', 'Altima'];
        
        return {
            make: makes[Math.floor(Math.random() * makes.length)],
            model: models[Math.floor(Math.random() * models.length)],
            year: Math.floor(Math.random() * (2024 - 2015) + 2015),
            price: Math.floor(Math.random() * (150000 - 30000) + 30000),
            mileage: Math.floor(Math.random() * (150000 - 1000) + 1000)
        };
    }

    /**
     * Generate random address (Malaysia)
     */
    static generateAddress(): {
        street: string;
        city: string;
        state: string;
        postcode: string;
    } {
        const states = ['Selangor', 'Kuala Lumpur', 'Penang', 'Johor', 'Sabah', 'Sarawak'];
        const cities = ['Shah Alam', 'Petaling Jaya', 'Georgetown', 'Johor Bahru', 'Kota Kinabalu', 'Kuching'];
        
        return {
            street: `${Math.floor(Math.random() * 200)} Jalan ${this.generateRandomString(6)}`,
            city: cities[Math.floor(Math.random() * cities.length)],
            state: states[Math.floor(Math.random() * states.length)],
            postcode: Math.floor(Math.random() * (90000 - 10000) + 10000).toString()
        };
    }

    /**
     * Generate random date within range
     */
    static generateDate(startDate: Date, endDate: Date): Date {
        const start = startDate.getTime();
        const end = endDate.getTime();
        return new Date(start + Math.random() * (end - start));
    }

    /**
     * Generate random price range
     */
    static generatePriceRange(): { min: number; max: number } {
        const min = Math.floor(Math.random() * (80000 - 30000) + 30000);
        const max = Math.floor(Math.random() * (150000 - min) + min);
        return { min, max };
    }

    /**
     * Generate a random Malaysian vehicle registration plate
     * @param location Optional specific location (e.g., 'Langkawi', 'Putrajaya')
     * @returns A valid Malaysian vehicle registration plate number
     */
    static generateMalaysianPlate(location?: string): string {
        const states = {
            Johor: 'J',
            Kedah: 'K',
            Kelantan: 'D',
            Melaka: 'M',
            Negeri_Sembilan: 'N',
            Pahang: 'C',
            Perak: 'A',
            Perlis: 'R',
            Pulau_Pinang: 'P',
            Sabah: 'S',
            Sarawak: 'Q',
            Selangor: 'B',
            Terengganu: 'T',
            Kuala_Lumpur: 'W',
            Labuan: 'L',
            Putrajaya: 'F'
        } as const;

        const putrajayaPrefixes = ['FA', 'FB', 'FC', 'FD', 'FE', 'FF', 'FG', 'FFF'];

        /**
         * Generate a random number with leading zeros
         */
        const generateNumber = (max: number = 9999): string => {
            const num = Math.floor(Math.random() * max) + 1;
            return num.toString().padStart(4, '0');
        };

        /**
         * Generate a random letter excluding I and O
         */
        const generateLetter = (): string => {
            const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Excluding I and O
            return letters[Math.floor(Math.random() * letters.length)];
        };

        /**
         * Generate a Langkawi format plate (KV #### X)
         */
        const generateLangkawiPlate = (): string => {
            return `KV${generateNumber()}${generateLetter()}`;
        };

        /**
         * Generate a Putrajaya format plate
         */
        const generatePutrajayaPlate = (): string => {
            const prefix = putrajayaPrefixes[Math.floor(Math.random() * putrajayaPrefixes.length)];
            return `${prefix}${generateNumber()}`;
        };

        /**
         * Generate a standard state plate
         */
        const generateStatePlate = (): string => {
            const stateKeys = Object.keys(states);
            const randomState = stateKeys[Math.floor(Math.random() * stateKeys.length)];
            const prefix = states[randomState as keyof typeof states];
            
            // Handle Putrajaya special case
            if (prefix === 'F') {
                return generatePutrajayaPlate();
            }

            return `${prefix}${generateNumber()}${generateLetter()}`;
        };

        // Generate plate based on location
        switch (location?.toLowerCase()) {
            case 'langkawi':
                return generateLangkawiPlate();
            case 'putrajaya':
                return generatePutrajayaPlate();
            default:
                return generateStatePlate();
        }
    }

        /**
     * Generates a timestamp-based string (in YYMMDDHHmm format)
     * e.g., 2506162130
     */
    static generatePlateByTimestamp(): string {
        const now = new Date()

        const pad = (n: number) => n.toString().padStart(2, '0')

        const year = now.getFullYear().toString().slice(-2) // Get last 2 digits
        const month = pad(now.getMonth() + 1)
        const day = pad(now.getDate())
        const hour = pad(now.getHours())
        const minute = pad(now.getMinutes())

        return `${year}${month}${day}${hour}${minute}`
    }






} 