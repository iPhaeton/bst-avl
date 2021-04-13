import { getOppositeSide, getSpaces } from "../utils";

describe('getSpaces', () => {
    it('should return a string of a certain amount of spaces', () => {
        expect(getSpaces(5)).toBe('     ');
    });

    it('should return an empty string, if number of spaces is 0', () => {
        expect(getSpaces(0)).toBe('');
    });

    it('should return an empty string, if number of spaces is negative', () => {
        expect(getSpaces(-5)).toBe('');
    });
});

describe('getOppsiteSide', () => {
    it('should return "right" for the "left" argument', () => {
        expect(getOppositeSide('left')).toBe('right');
    });

    it('should return "left" for the "right" argument', () => {
        expect(getOppositeSide('right')).toBe('left');
    });
});