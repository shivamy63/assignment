import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://http.dog/';
const OUTPUT_FILE = path.join('./data', 'codes.json'); // Static file location

/**
 * Fetch all available HTTP response codes and save to a file if the file doesn't exist.
 */
export const fetchAndSaveCodes = async () => {
    try {
        // Check if the file already exists
        const fileExists = await fs
            .access(OUTPUT_FILE)
            .then(() => true) // If the file exists, return true
            .catch(() => false); // If the file doesn't exist, return false

        if (fileExists) {
            console.log('Codes file already exists. Skipping fetch.');
            return; // Exit the function if the file exists
        }

        console.log("Saving codes...");

        // Define range of HTTP response codes
        const responseCodes = [
            ...Array.from({ length: 100 }, (_, i) => i + 200), // 200-299
            ...Array.from({ length: 100 }, (_, i) => i + 300), // 300-399
            ...Array.from({ length: 100 }, (_, i) => i + 400), // 400-499
            ...Array.from({ length: 100 }, (_, i) => i + 500), // 500-599
            ...Array.from({ length: 100 }, (_, i) => i + 600), // 600-699
            ...Array.from({ length: 100 }, (_, i) => i + 700), // 700-799
            ...Array.from({ length: 100 }, (_, i) => i + 800), // 800-899
            ...Array.from({ length: 100 }, (_, i) => i + 900), // 900-999
            ...Array.from({ length: 100 }, (_, i) => i + 1000), // 1000-1099
        ];

        // Fetch data concurrently
        const responses = await Promise.all(
            responseCodes.map((code) =>
                axios
                    .get(`${BASE_URL}${code}.json`)
                    .then((response) => ({
                        code,
                        data: response.data,
                    }))
                    .catch(() => null) // Handle failed requests
            )
        );

        // Filter valid responses
        const validResponses = responses.filter((response) => response !== null);

        // Ensure the directory exists and write data to static file
        await fs.mkdir('./data', { recursive: true });
        await fs.writeFile(OUTPUT_FILE, JSON.stringify(validResponses, null, 2), 'utf-8');

        console.log('HTTP codes fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching HTTP codes:', error);
    }
};
