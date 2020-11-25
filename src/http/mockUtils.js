import path from 'path';
import fs from 'fs';

const validFileNames = ['matchups', 'rosters'];

const validateFileName = (mockFileName) => {
    if (!validFileNames.includes(mockFileName)) {
        throw new Error('MockFileName is not supported:', mockFileName)
    }
}

const mockFetchData = (mockFileName) => {
    validateFileName(mockFileName)
    const data = fs.readFileSync(
        path.resolve(__dirname, `../mocks/${mockFileType}.json`),
        'utf-8',
    );
    const jsonData = JSON.parse(data);
    return jsonData;
};

const writeMockData = (data, mockFileName) => {
    validateFileName(mockFileName)
    fs.writeFileSync(
        path.resolve(__dirname, `../mocks/${mockFileName}.json`),
        JSON.stringify(data),
    );
}

module.exports = {
    mockFetchData,
    writeMockData,
}
