/**
 * ฟังก์ชันเพื่อแปลงตัวเลขเอเลี่ยนเป็นจำนวนเต็ม
 * อ้างอิงจากระบบตัวเลขที่ใช้กฎการลป
 */

export interface AlienSymbol {
  symbol: string;
  value: number;
}

// สัญลักษณ์ตัวเลขเอเลี่ยนที่ใช้ได้และค่าของแต่ละสัญลักษณ์
export const ALIEN_SYMBOLS: AlienSymbol[] = [
  { symbol: 'A', value: 1 },
  { symbol: 'B', value: 5 },
  { symbol: 'Z', value: 10 },
  { symbol: 'L', value: 50 },
  { symbol: 'C', value: 100 },
  { symbol: 'D', value: 500 },
  { symbol: 'R', value: 1000 }
];

// สร้าง map สำหรับค้นหาค่าอย่างรวดเร็ว
export const SYMBOL_VALUE_MAP = new Map<string, number>();
ALIEN_SYMBOLS.forEach(item => {
  SYMBOL_VALUE_MAP.set(item.symbol, item.value);
});

// คู่สัญลักษณ์ลบที่ใช้ได้: [ตัวเล็ก, ตัวใหญ่]
export const VALID_SUBTRACTIVE_PAIRS = [
  ['A', 'B'], // A หน้า B = 4 (5-1)
  ['A', 'Z'], // A หน้า Z = 9 (10-1)
  ['Z', 'L'], // Z หน้า L = 40 (50-10)
  ['Z', 'C'], // Z หน้า C = 90 (100-10)
  ['C', 'D'], // C หน้า D = 400 (500-100)
  ['C', 'R']  // C หน้า R = 900 (1000-100)
];

/**
 * ตรวจสอบว่าตัวอักษรเป็นสัญลักษณ์ตัวเลขเอเลี่ยนที่ถูกต้องหรือไม่
 */
export function isValidAlienSymbol(char: string): boolean {
  return SYMBOL_VALUE_MAP.has(char.toUpperCase());
}

/**
 * ตรวจสอบว่าคู่ตัวอักษรสามารถใช้การลบได้หรือไม่
 */
export function isValidSubtractivePair(first: string, second: string): boolean {
  return VALID_SUBTRACTIVE_PAIRS.some(pair => 
    pair[0] === first.toUpperCase() && pair[1] === second.toUpperCase()
  );
}

/**
 * แปลงตัวเลขเอเลี่ยนเป็นจำนวนเต็ม
 * @param s ข้อความตัวเลขเอเลี่ยนที่จะแปลง
 * @returns ค่าจำนวนเต็ม
 * @throws Error หากข้อมูลมีตัวอักษรที่ไม่ถูกต้อง หรือคู่สัญลักษณ์ลบที่ไม่ถูกต้อง
 */
export function alienToInt(s: string): number {
  if (!s || s.trim().length === 0) {
    throw new Error('ข้อมูลต้องไม่ว่างเปล่า');
  }

  const input = s.trim().toUpperCase();
  let total = 0;
  let i = 0;

  while (i < input.length) {
    const currentChar = input[i];
    
    // ตรวจสอบตัวอักษรปัจจุบัน
    if (!isValidAlienSymbol(currentChar)) {
      throw new Error(`ตัวอักษรไม่ถูกต้อง '${currentChar}' ใช้ได้เฉพาะ A, B, Z, L, C, D, R เท่านั้น`);
    }

    const currentValue = SYMBOL_VALUE_MAP.get(currentChar)!;

    // ตรวจสอบว่าเป็นส่วนหนึ่งของคู่ลบหรือไม่
    if (i + 1 < input.length) {
      const nextChar = input[i + 1];
      const nextValue = SYMBOL_VALUE_MAP.get(nextChar);

      // หากตัวอักษรถัดไปมีค่ามากกว่า ตรวจสอบว่าเป็นคู่ลบที่ถูกต้องหรือไม่
      if (nextValue && nextValue > currentValue) {
        if (isValidSubtractivePair(currentChar, nextChar)) {
          // คู่ลบที่ถูกต้อง: ลบตัวปัจจุบันจากตัวถัดไป
          total += (nextValue - currentValue);
          i += 2; // ข้ามทั้งสองตัว
          continue;
        } else {
          // คู่ลบที่ไม่ถูกต้อง
          throw new Error(`คู่สัญลักษณ์ลบไม่ถูกต้อง '${currentChar}${nextChar}' คู่ที่ใช้ได้คือ: AB, AZ, ZL, ZC, CD, CR`);
        }
      }
    }

    // บวกค่าปัจจุบันแบบปกติ
    total += currentValue;
    i++;
  }

  return total;
}
