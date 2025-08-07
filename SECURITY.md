# Security Guidelines

## Environment Variables

This project uses environment variables for sensitive configuration. Follow these security best practices:

### Required Environment Variables

- `GITHUB_API_KEY`: GitHub Personal Access Token
- `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username
- `DEV_TO_API_KEY`: Dev.to API key (optional)

### Security Rules

1. **Never commit real tokens to the repository**
   - The `.env.local` file is gitignored for this reason
   - Only use `.env.example` for documentation with placeholder values

2. **Token Management**
   - Generate tokens with minimal required permissions
   - Regularly rotate tokens
   - Immediately revoke tokens if accidentally exposed

3. **Environment File Structure**
   ```
   .env.local          # Real values (gitignored)
   .env.example        # Placeholder values (committed)
   ```

### GitHub Token Setup

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `public_repo` (for repository data)
   - `read:user` (for user profile data)
4. Copy the token to your `.env.local` file

### If a Token is Exposed

1. **Immediately revoke the token** in GitHub settings
2. **Remove from git history** using:
   ```bash
   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env.local' --prune-empty --tag-name-filter cat -- --all
   git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
   git reflog expire --expire=now --all && git gc --prune=now --aggressive
   ```
3. **Generate a new token** and update `.env.local`
4. **Force push** to update the remote repository

### Development Setup

1. Copy `.env.example` to `.env.local`
2. Replace placeholder values with real credentials
3. Never commit `.env.local`

### Production Deployment

For production deployments (Vercel, Netlify, etc.):
- Set environment variables in the deployment platform's dashboard
- Never commit production tokens to the repository
- Use deployment platform's secret management features
