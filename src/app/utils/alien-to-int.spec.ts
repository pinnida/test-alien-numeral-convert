import { alienToInt, isValidAlienSymbol, isValidSubtractivePair, ALIEN_SYMBOLS, SYMBOL_VALUE_MAP, VALID_SUBTRACTIVE_PAIRS } from './alien-to-int.util';

describe('Alien to Int Utility', () => {
  
  describe('ALIEN_SYMBOLS', () => {
    it('should contain all required symbols with correct values', () => {
      const expectedSymbols = [
        { symbol: 'A', value: 1 },
        { symbol: 'B', value: 5 },
        { symbol: 'Z', value: 10 },
        { symbol: 'L', value: 50 },
        { symbol: 'C', value: 100 },
        { symbol: 'D', value: 500 },
        { symbol: 'R', value: 1000 }
      ];
      
      expect(ALIEN_SYMBOLS).toEqual(expectedSymbols);
    });
  });

  describe('SYMBOL_VALUE_MAP', () => {
    it('should map all symbols to their correct values', () => {
      expect(SYMBOL_VALUE_MAP.get('A')).toBe(1);
      expect(SYMBOL_VALUE_MAP.get('B')).toBe(5);
      expect(SYMBOL_VALUE_MAP.get('Z')).toBe(10);
      expect(SYMBOL_VALUE_MAP.get('L')).toBe(50);
      expect(SYMBOL_VALUE_MAP.get('C')).toBe(100);
      expect(SYMBOL_VALUE_MAP.get('D')).toBe(500);
      expect(SYMBOL_VALUE_MAP.get('R')).toBe(1000);
    });
  });

  describe('isValidAlienSymbol', () => {
    it('should return true for valid alien symbols', () => {
      expect(isValidAlienSymbol('A')).toBe(true);
      expect(isValidAlienSymbol('a')).toBe(true);
      expect(isValidAlienSymbol('B')).toBe(true);
      expect(isValidAlienSymbol('Z')).toBe(true);
      expect(isValidAlienSymbol('L')).toBe(true);
      expect(isValidAlienSymbol('C')).toBe(true);
      expect(isValidAlienSymbol('D')).toBe(true);
      expect(isValidAlienSymbol('R')).toBe(true);
    });

    it('should return false for invalid symbols', () => {
      expect(isValidAlienSymbol('X')).toBe(false);
      expect(isValidAlienSymbol('1')).toBe(false);
      expect(isValidAlienSymbol('!')).toBe(false);
      expect(isValidAlienSymbol('')).toBe(false);
    });
  });

  describe('isValidSubtractivePair', () => {
    it('should return true for valid subtractive pairs', () => {
      expect(isValidSubtractivePair('A', 'B')).toBe(true);
      expect(isValidSubtractivePair('A', 'Z')).toBe(true);
      expect(isValidSubtractivePair('Z', 'L')).toBe(true);
      expect(isValidSubtractivePair('Z', 'C')).toBe(true);
      expect(isValidSubtractivePair('C', 'D')).toBe(true);
      expect(isValidSubtractivePair('C', 'R')).toBe(true);
      
      // Case insensitive
      expect(isValidSubtractivePair('a', 'b')).toBe(true);
      expect(isValidSubtractivePair('A', 'z')).toBe(true);
    });

    it('should return false for invalid subtractive pairs', () => {
      expect(isValidSubtractivePair('A', 'L')).toBe(false);
      expect(isValidSubtractivePair('B', 'Z')).toBe(false);
      expect(isValidSubtractivePair('Z', 'D')).toBe(false);
      expect(isValidSubtractivePair('L', 'C')).toBe(false);
      expect(isValidSubtractivePair('D', 'R')).toBe(false);
      expect(isValidSubtractivePair('A', 'A')).toBe(false);
    });
  });

  describe('alienToInt', () => {
    describe('Basic addition cases', () => {
      it('should convert simple single symbols', () => {
        expect(alienToInt('A')).toBe(1);
        expect(alienToInt('B')).toBe(5);
        expect(alienToInt('Z')).toBe(10);
        expect(alienToInt('L')).toBe(50);
        expect(alienToInt('C')).toBe(100);
        expect(alienToInt('D')).toBe(500);
        expect(alienToInt('R')).toBe(1000);
      });

      it('should convert multiple same symbols (addition)', () => {
        expect(alienToInt('AA')).toBe(2);
        expect(alienToInt('AAA')).toBe(3);
        expect(alienToInt('BB')).toBe(10);
        expect(alienToInt('ZZ')).toBe(20);
      });

      it('should convert mixed symbols in descending order', () => {
        expect(alienToInt('BA')).toBe(6); // 5 + 1
        expect(alienToInt('ZA')).toBe(11); // 10 + 1
        expect(alienToInt('ZAA')).toBe(12); // 10 + 1 + 1
        expect(alienToInt('LBAAA')).toBe(58); // 50 + 5 + 1 + 1 + 1
      });
    });

    describe('Subtractive cases', () => {
      it('should convert valid subtractive pairs', () => {
        expect(alienToInt('AB')).toBe(4); // B - A = 5 - 1 = 4
        expect(alienToInt('AZ')).toBe(9); // Z - A = 10 - 1 = 9
        expect(alienToInt('ZL')).toBe(40); // L - Z = 50 - 10 = 40
        expect(alienToInt('ZC')).toBe(90); // C - Z = 100 - 10 = 90
        expect(alienToInt('CD')).toBe(400); // D - C = 500 - 100 = 400
        expect(alienToInt('CR')).toBe(900); // R - C = 1000 - 100 = 900
      });

      it('should convert complex combinations with subtractive pairs', () => {
        expect(alienToInt('RCRZCAB')).toBe(1994); // 1000 + 900 + 90 + 4 = 1994
        expect(alienToInt('ZAB')).toBe(13); // 10 + 4 = 14
        expect(alienToInt('AZB')).toBe(13); // 9 + 5 - 1 = 13 (wait, this should be AZ + B = 9 + 5 = 14)
        // Actually, let me recalculate: AZB = AZ + B = 9 + 5 = 14
        expect(alienToInt('AZB')).toBe(14); // 9 + 5 = 14
      });
    });

    describe('Provided examples', () => {
      it('should convert "AAA" to 3', () => {
        expect(alienToInt('AAA')).toBe(3);
      });

      it('should convert "LBAAA" to 58', () => {
        expect(alienToInt('LBAAA')).toBe(58);
      });

      it('should convert "RCRZCAB" to 1994', () => {
        expect(alienToInt('RCRZCAB')).toBe(1994);
      });
    });

    describe('Case insensitive', () => {
      it('should handle lowercase input', () => {
        expect(alienToInt('aaa')).toBe(3);
        expect(alienToInt('lbaaa')).toBe(58);
        expect(alienToInt('rcrzcab')).toBe(1994);
        expect(alienToInt('ab')).toBe(4);
      });

      it('should handle mixed case input', () => {
        expect(alienToInt('AaA')).toBe(3);
        expect(alienToInt('LbAaA')).toBe(58);
        expect(alienToInt('RcRzCaB')).toBe(1994);
      });
    });

    describe('Error cases', () => {
      it('should throw error for empty input', () => {
        expect(() => alienToInt('')).toThrow('Input cannot be empty');
        expect(() => alienToInt('   ')).toThrow('Input cannot be empty');
      });

      it('should throw error for invalid characters', () => {
        expect(() => alienToInt('X')).toThrow("Invalid character 'X'. Only A, B, Z, L, C, D, R are allowed.");
        expect(() => alienToInt('AAX')).toThrow("Invalid character 'X'. Only A, B, Z, L, C, D, R are allowed.");
        expect(() => alienToInt('123')).toThrow("Invalid character '1'. Only A, B, Z, L, C, D, R are allowed.");
      });

      it('should throw error for invalid subtractive pairs', () => {
        expect(() => alienToInt('AL')).toThrow("Invalid subtractive pair 'AL'. Valid pairs are: AB, AZ, ZL, ZC, CD, CR.");
        expect(() => alienToInt('ZR')).toThrow("Invalid subtractive pair 'ZR'. Valid pairs are: AB, AZ, ZL, ZC, CD, CR.");
        expect(() => alienToInt('BD')).toThrow("Invalid subtractive pair 'BD'. Valid pairs are: AB, AZ, ZL, ZC, CD, CR.");
      });

      it('should throw error for invalid subtractive pairs in complex strings', () => {
        expect(() => alienToInt('RCRZCAL')).toThrow("Invalid subtractive pair 'AL'. Valid pairs are: AB, AZ, ZL, ZC, CD, CR.");
        expect(() => alienToInt('AZBZR')).toThrow("Invalid subtractive pair 'ZR'. Valid pairs are: AB, AZ, ZL, ZC, CD, CR.");
      });
    });

    describe('Edge cases', () => {
      it('should handle single character subtractive pairs', () => {
        expect(alienToInt('AB')).toBe(4);
        expect(alienToInt('AZ')).toBe(9);
        expect(alienToInt('ZL')).toBe(40);
        expect(alienToInt('ZC')).toBe(90);
        expect(alienToInt('CD')).toBe(400);
        expect(alienToInt('CR')).toBe(900);
      });

      it('should handle multiple subtractive pairs in sequence', () => {
        expect(alienToInt('ABAZ')).toBe(13); // 4 + 9 = 13
        expect(alienToInt('ZLZC')).toBe(130); // 40 + 90 = 130
        expect(alienToInt('CDCR')).toBe(1300); // 400 + 900 = 1300
      });

      it('should handle mixed addition and subtraction', () => {
        expect(alienToInt('AAB')).toBe(6); // 1 + 1 + 4 = 6 (A + A + AB)
        expect(alienToInt('ZZAB')).toBe(24); // 10 + 10 + 4 = 24
        expect(alienToInt('RCRZCAB')).toBe(1994); // Complex example
      });
    });
  });
});
