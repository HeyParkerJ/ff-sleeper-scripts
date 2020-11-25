import path from 'path';
import fs from 'fs';

const validFileNames = ['matchups', 'rosters'];

const validateFileName = (mockFileType) => {
    if (!validFileNames.includes(mockFileType)) {
        throw new Error('MockFileName is not supported:', mockFileType)
    }
}

const mockFetchData = (mockFileType) => {
    validateFileName(mockFileType)
    const data = fs.readFileSync(
        path.resolve(__dirname, `../mocks/${mockFileType}.json`),
        'utf-8',
    );
    const jsonData = JSON.parse(data);
    return jsonData;
};

const writeMockData = (data, mockFileType) => {
    validateFileName(mockFileType)
    fs.writeFileSync(
        path.resolve(__dirname, `../mocks/${mockFileType}.json`),
        JSON.stringify(data),
    );
}

module.exports = {
    mockFetchData,
    writeMockData,
}
