import { generateBase64FromImage } from "../image";

describe('generateBase64FromImage', () => {
    it('should generate base64 str from file', async () => {
        const mockFile = new Blob(['file-content'], { type: 'image/png' });
        const mockBase64Str = 'data:image/png;base64,abcd';

        const mockFileReader = {
            onload: null,
            onerror: null,
            readAsDataURL: jest.fn().mockImplementation(function () {
                if (this.onload) {
                    this.onload({ target: { result: mockBase64Str } });
                }
            })
        } as unknown as any;

        jest.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader);

        const result = await generateBase64FromImage(mockFile);
        expect(result).toBe(mockBase64Str);
        expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
    })

    it('should reject when there is a problem with the file', async () => {
        const mockFile = new Blob(['file-content'], { type: 'image/png' });
        const errorMsg = 'Invalid file';

        const mockFileReader = {
            onload: null,
            onerror: null,
            readAsDataURL: jest.fn().mockImplementation(function () {
                if (this.onerror) {
                    this.onerror(new Error(errorMsg));
                }
            })
        } as unknown as any;

        jest.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader);

        await expect(generateBase64FromImage(mockFile)).rejects.toThrow(errorMsg);
        expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
    })
})