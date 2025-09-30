# 🚀 คู่มือการ Deploy ขึ้น Firebase Hosting

## ขั้นตอนการ Deploy (ครั้งแรก)

### 1. ติดตั้ง Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login เข้า Firebase
```bash
firebase login
```
- จะเปิด browser ให้ login ด้วย Google Account
- เลือก account ที่ต้องการใช้งาน

### 3. สร้าง Firebase Project
1. ไปที่ [Firebase Console](https://console.firebase.google.com/)
2. คลิก "Add project" หรือ "เพิ่มโปรเจ็กต์"
3. ตั้งชื่อโปรเจ็กต์ (เช่น alien-numeral-converter)
4. รอให้สร้างเสร็จ

### 4. เชื่อมต่อ Project กับ Firebase
แก้ไขไฟล์ `.firebaserc` ให้ใส่ Project ID ที่ได้จาก Firebase Console:
```json
{
  "projects": {
    "default": "your-project-id-here"
  }
}
```

### 5. Build และ Deploy
```bash
npm run deploy
```

หรือแยกเป็นขั้นตอน:
```bash
# Build production
npm run build:prod

# Deploy
npm run firebase:deploy
```

## ขั้นตอนการ Deploy (ครั้งต่อไป)

เมื่อมีการแก้ไขโค้ดแล้ว ให้รัน:
```bash
npm run deploy
```

## คำสั่งที่มีให้ใช้งาน

- `npm run deploy` - Build และ Deploy ในคำสั่งเดียว
- `npm run build:prod` - Build production เท่านั้น
- `npm run firebase:deploy` - Deploy ไปที่ Firebase เท่านั้น
- `npm run firebase:init` - Login และ Initialize Firebase ใหม่

## ตรวจสอบผลลัพธ์

หลัง Deploy เสร็จ จะได้ URL มาประมาณ:
```
https://your-project-id.web.app
https://your-project-id.firebaseapp.com
```

## หมายเหตุ

- ไฟล์ที่จะถูก Deploy อยู่ใน folder: `dist/alien-numeral-converter/browser`
- Angular routing จะทำงานได้ปกติด้วยการตั้งค่า rewrites ใน `firebase.json`
- หากต้องการ custom domain สามารถตั้งค่าได้ที่ Firebase Console > Hosting

## การแก้ปัญหา

### ถ้า Deploy แล้วหน้าเว็บว่างเปล่า
1. ตรวจสอบว่า build เสร็จแล้ว โดยดูใน folder `dist/alien-numeral-converter/browser`
2. ตรวจสอบ `firebase.json` ว่า public path ถูกต้อง
3. ลองเคลียร์ cache และ rebuild ใหม่

### ถ้า Firebase command ไม่พบ
```bash
npm install -g firebase-tools
```

### ถ้า Login ไม่ได้
```bash
firebase logout
firebase login --reauth
```
