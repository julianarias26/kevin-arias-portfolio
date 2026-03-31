// replace-env.js
const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');

let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
  '__SUPABASE_URL__':        process.env.SUPABASE_URL        || '',
  '__SUPABASE_KEY__':        process.env.SUPABASE_KEY        || '',
  '__EMAILJS_PUBLIC_KEY__':  process.env.EMAILJS_PUBLIC_KEY  || '',
  '__EMAILJS_SERVICE_ID__':  process.env.EMAILJS_SERVICE_ID  || '',
  '__EMAILJS_TEMPLATE_ID__': process.env.EMAILJS_TEMPLATE_ID || '',
};

Object.entries(replacements).forEach(([placeholder, value]) => {
  content = content.replaceAll(placeholder, value);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Environment variables replaced successfully');