# Deployment Guide

## Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
1. Make sure all your code is committed
2. Push to your GitHub repository

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Paste your GitHub repository URL: `https://github.com/reshu9618/ai-assistant.git`
5. Click "Import"

### Step 3: Configure Environment Variables
1. In the Vercel dashboard, go to Settings → Environment Variables
2. Add the following variables (optional for local development):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Deploy to Other Platforms

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy

### Docker (Self-hosted)
1. Create a Dockerfile:
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

2. Build and run:
\`\`\`bash
docker build -t studyai .
docker run -p 3000:3000 studyai
\`\`\`

## Production Checklist

- [ ] All environment variables configured
- [ ] Database migrations run (if using Supabase)
- [ ] API endpoints tested
- [ ] AI features working
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Error handling tested
- [ ] Analytics configured
- [ ] Backup strategy in place

## Monitoring

### Vercel Analytics
- Monitor performance metrics
- Track user interactions
- View error logs

### Supabase Monitoring
- Check database performance
- Monitor API usage
- Review security logs

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Clear cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Environment Variables Not Working
- Verify variable names match exactly
- Restart deployment after adding variables
- Check variable values in Vercel dashboard

### Database Connection Issues
- Verify Supabase credentials
- Check network connectivity
- Review Supabase logs

## Performance Optimization

1. Enable image optimization
2. Use Next.js caching strategies
3. Implement code splitting
4. Optimize database queries
5. Use CDN for static assets
