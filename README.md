
# GPT Browsing API Server

שרת Node.js שמבצע שאילתות ל-GPT-4 כדי למצוא כתובת וטלפון של יזם, קבלן או אדריכל לפי שם ותפקיד.

## 📦 שימוש
שלח בקשת POST ל:
```
/api/fetch-details
```

### גוף הבקשה:
```json
{
  "name": "שם החברה או האדם",
  "role": "יזם | קבלן | אדריכל"
}
```

### תשובת השרת:
```json
{
  "result": "שם: ...\nכתובת: ...\nטלפון: ..."
}
```

## 🚀 פריסה מהירה ב-Render
1. פתח חשבון ב-https://render.com
2. העלה את הקבצים האלו לריפו ב-GitHub
3. צור שירות חדש (New Web Service)
4. הגדר:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Port: 3000
   - משתנה סביבה:
     - `OPENAI_API_KEY=your_openai_key`
