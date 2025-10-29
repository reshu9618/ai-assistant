# GitHub Setup & Deployment Guide

## Step 1: Initialize Git Repository (If Not Already Done)

\`\`\`bash
# Navigate to your project directory
cd ai-assistant

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: StudyAI - AI-powered student academic assistant"
\`\`\`

## Step 2: Add Remote Repository

\`\`\`bash
# Add your GitHub repository as remote
git remote add origin https://github.com/reshu9618/ai-assistant.git

# Verify remote was added
git remote -v
\`\`\`

## Step 3: Push to GitHub

\`\`\`bash
# Push to main branch
git branch -M main
git push -u origin main
\`\`\`

## Step 4: Verify on GitHub

1. Go to https://github.com/reshu9618/ai-assistant
2. Verify all files are uploaded
3. Check that README.md is displayed

## Step 5: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Import Git Repository"
5. Paste: \`https://github.com/reshu9618/ai-assistant.git\`
6. Click "Import"
7. Configure environment variables (if needed)
8. Click "Deploy"

### Option B: Using Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to connect your GitHub account
\`\`\`

## Step 6: Configure GitHub Settings

### Add Branch Protection Rules
1. Go to Settings → Branches
2. Click "Add rule"
3. Set branch name pattern: \`main\`
4. Enable "Require pull request reviews"
5. Enable "Require status checks to pass"

### Add GitHub Actions (Optional CI/CD)
Create \`.github/workflows/deploy.yml\`:

\`\`\`yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@main
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
\`\`\`

## Step 7: Add Secrets to GitHub

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add the following secrets:
   - \`VERCEL_TOKEN\` - Get from Vercel dashboard
   - \`VERCEL_ORG_ID\` - Your Vercel organization ID
   - \`VERCEL_PROJECT_ID\` - Your Vercel project ID

## Continuous Deployment

Once set up, every push to main will:
1. Trigger GitHub Actions
2. Run tests and build
3. Deploy to Vercel automatically
4. Update your live site

## Troubleshooting

### Push Rejected
\`\`\`bash
# If you get "rejected" error, pull first
git pull origin main
git push origin main
\`\`\`

### Authentication Issues
\`\`\`bash
# Use personal access token instead of password
# Generate at: https://github.com/settings/tokens
git remote set-url origin https://YOUR_TOKEN@github.com/reshu9618/ai-assistant.git
\`\`\`

### Large Files
\`\`\`bash
# If you have large files, use Git LFS
git lfs install
git lfs track "*.psd"
git add .gitattributes
git commit -m "Add Git LFS"
\`\`\`

## Useful Git Commands

\`\`\`bash
# Check status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View remote URL
git remote -v

# Update remote URL
git remote set-url origin NEW_URL
\`\`\`

## Best Practices

1. **Commit Often**: Make small, meaningful commits
2. **Write Good Messages**: Use clear commit messages
3. **Use Branches**: Create feature branches for new work
4. **Pull Before Push**: Always pull latest changes first
5. **Review Before Commit**: Check what you're committing
6. **Keep Secrets Safe**: Never commit API keys or passwords
7. **Use .gitignore**: Exclude unnecessary files
8. **Tag Releases**: Use git tags for version releases

## Release Management

\`\`\`bash
# Create a release tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags to GitHub
git push origin --tags

# View all tags
git tag -l
\`\`\`

## Collaboration

### For Team Members

1. Clone the repository:
\`\`\`bash
git clone https://github.com/reshu9618/ai-assistant.git
cd ai-assistant
\`\`\`

2. Create feature branch:
\`\`\`bash
git checkout -b feature/your-feature
\`\`\`

3. Make changes and commit:
\`\`\`bash
git add .
git commit -m "Add your feature"
\`\`\`

4. Push and create pull request:
\`\`\`bash
git push origin feature/your-feature
\`\`\`

5. Create PR on GitHub and request review

## Support

For issues with GitHub or Vercel deployment, visit:
- GitHub Help: https://docs.github.com
- Vercel Docs: https://vercel.com/docs
