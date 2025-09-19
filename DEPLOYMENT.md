# Atlas Cipher - Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment Process

### Step 1: Connect GitHub Repository to Vercel

1. **Login to Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" button
   - Select "Import Git Repository"
   - Choose "MoonChainX/atlas-cipher" from the list
   - Click "Import"

### Step 2: Configure Project Settings

1. **Project Name**
   - Set project name to: `atlas-cipher`
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)

2. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Environment Variables Configuration

In the Vercel dashboard, go to **Settings > Environment Variables** and add the following:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_endpoint_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_api_key_here
```

**Important**: Make sure to add these variables for all environments (Production, Preview, Development).

### Step 4: Deploy Configuration

1. **Deployment Settings**
   - Node.js Version: `18.x` (recommended)
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Domain Configuration** (Optional)
   - Go to **Settings > Domains**
   - Add your custom domain if desired
   - Configure DNS settings as instructed

### Step 5: Deploy the Application

1. **Automatic Deployment**
   - Vercel will automatically deploy when you push to the main branch
   - Go to **Deployments** tab to monitor the build process

2. **Manual Deployment**
   - Click "Deploy" button in the dashboard
   - Wait for the build to complete

### Step 6: Verify Deployment

1. **Check Build Logs**
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Review build logs for any errors

2. **Test the Application**
   - Visit the provided Vercel URL
   - Test wallet connection functionality
   - Verify all features are working

## Post-Deployment Configuration

### 1. Custom Domain Setup (Optional)

If you want to use a custom domain:

1. **Add Domain in Vercel**
   - Go to **Settings > Domains**
   - Add your domain name
   - Follow the DNS configuration instructions

2. **DNS Configuration**
   - Add a CNAME record pointing to your Vercel deployment
   - Wait for DNS propagation (up to 24 hours)

### 2. Environment Variables for Production

Ensure all environment variables are set correctly:

```bash
# Required for production
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_endpoint_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_api_key_here
```

### 3. Monitoring and Analytics

1. **Vercel Analytics**
   - Enable Vercel Analytics in the dashboard
   - Monitor performance and user behavior

2. **Error Tracking**
   - Set up error tracking (optional)
   - Monitor application health

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (use 18.x)
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names for typos
   - Verify values are correct

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches the network

### Build Optimization

1. **Bundle Size**
   - Monitor bundle size in build logs
   - Optimize imports if needed
   - Use dynamic imports for large libraries

2. **Performance**
   - Enable Vercel's Edge Functions if needed
   - Optimize images and assets
   - Use CDN for static assets

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to Git
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Vercel automatically provides HTTPS
   - Ensure all external API calls use HTTPS
   - Configure proper CORS settings

## Maintenance

1. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update environment variables as needed

2. **Monitoring**
   - Set up alerts for build failures
   - Monitor application performance
   - Track user engagement

## Support

For issues with deployment:

1. **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
2. **GitHub Issues**: Create an issue in the repository
3. **Community Support**: Vercel Discord or GitHub Discussions

## Deployment Checklist

- [ ] GitHub repository is connected
- [ ] Environment variables are configured
- [ ] Build settings are correct
- [ ] Domain is configured (if using custom domain)
- [ ] Application is accessible
- [ ] Wallet connection works
- [ ] All features are functional
- [ ] Performance is acceptable
- [ ] Security measures are in place

## Next Steps

After successful deployment:

1. **Test thoroughly** on the live environment
2. **Set up monitoring** and analytics
3. **Configure backups** if needed
4. **Plan for scaling** as user base grows
5. **Document any custom configurations**

---

**Note**: This deployment guide assumes you have the necessary permissions and access to the GitHub repository and Vercel account. Make sure all credentials are properly configured before proceeding.
