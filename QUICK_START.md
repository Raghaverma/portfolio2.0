# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env.local`:
```bash
# Windows
copy .env.example .env.local

# Mac/Linux
cp .env.example .env.local
```

### 3. Add Your Email Configuration (Optional but Recommended)
Get a free Resend API key at [resend.com](https://resend.com):

```bash
# Add to .env.local
RESEND_API_KEY=re_your_key_here
OWNER_EMAIL=your@email.com
```

**Note**: Contact form will work without this (stores in SQLite), but won't send emails.

### 4. Build & Run
```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

---

## 🎯 What's New?

### Keyboard Shortcuts
- `Cmd+K` (Mac) or `Ctrl+K` (Win/Linux) - Open command palette

### New Features
- ✅ Email notifications on contact form submissions
- ✅ Error boundaries for graceful error handling
- ✅ Command palette for quick navigation
- ✅ Improved accessibility (WCAG 2.1)
- ✅ API caching for better performance
- ✅ SEO optimization (sitemap + metadata)

---

## 📝 Key Files

```
components/
  ├── command-palette.tsx       # Cmd+K quick actions
  ├── error-boundary.tsx        # Error handling
  └── loading-skeleton.tsx      # Loading states

lib/
  └── email.ts                  # Email integration

app/
  ├── sitemap.ts               # /sitemap.xml
  └── robots.ts                # /robots.txt
```

---

## 🔧 Configuration

### Email Setup (Resend)
1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=your_key
   OWNER_EMAIL=your@email.com
   ```
4. Update `lib/email.ts` lines 27 & 80 with your verified domain

### Domain Update
Update your domain in:
- `app/layout.tsx` (line 21): `metadataBase`
- `app/sitemap.ts` (line 4): `baseUrl`
- `lib/email.ts` (lines 27 & 80): email "from" addresses

---

## ✅ Deployment Checklist

- [ ] Environment variables set on hosting platform
- [ ] Domain verified with Resend (if using emails)
- [ ] Email "from" addresses updated in `lib/email.ts`
- [ ] Build succeeds: `npm run build`
- [ ] Submit sitemap to Google Search Console

---

## 📚 Documentation

- **Detailed Changes**: `UPGRADE_SUMMARY.md`
- **Implementation Details**: `IMPLEMENTATION_COMPLETE.md`
- **This Guide**: `QUICK_START.md`

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Emails Not Sending
1. Check RESEND_API_KEY is set
2. Check OWNER_EMAIL is set
3. Verify domain in Resend dashboard
4. Check console logs for error messages

### Command Palette Not Opening
- Try Ctrl+K instead of Cmd+K (Windows/Linux)
- Check browser console for errors
- Ensure JavaScript is enabled

---

## 🎨 Customization

### Add More Commands
Edit `components/command-palette.tsx`:
```tsx
<CommandItem onSelect={() => runCommand(() => {
  // Your action here
})}>
  <YourIcon className="mr-2 h-4 w-4" />
  <span>Your Command</span>
</CommandItem>
```

### Change Cache Duration
Edit `app/api/github/route.ts` or `app/api/music/route.ts`:
```tsx
{
  revalidate: 3600, // Change to your preferred seconds
}
```

---

## 📞 Support

Questions? Check out:
- GitHub: [@Raghaverma](https://github.com/Raghaverma)
- LinkedIn: [/raghaverma](https://www.linkedin.com/in/raghaverma/)

---

**That's it!** You're ready to deploy. 🚀
