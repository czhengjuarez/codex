# Codex Frontend

This is the Next.js web application that renders your organization's Codex. It dynamically builds a static documentation site based on the Markdown files stored in the root directories of this repository.

## 🚀 Getting Started Locally

To test the Codex on your machine:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## ✍️ How to Contribute & Edit Content

**Do NOT edit `app/page.tsx` or other React components to add content!** 

This application aggregates content automatically from Markdown files. To add a new rule or update an existing standard:

1. Look in the root of the repository for the target category:
   - `/domains/` (Engineering domains like AI, API Design, Rust, etc.)
   - `/governance/` (Process documents like Review Policy or RFC Process)
   - `/product/` (Product shipping guidelines)
   - `/design/` (Design standards)
2. Edit an existing `.md` file or create a new one. (You can use `rfc-template.md` as a starting point!)
3. The content is automatically picked up! Next.js will auto-update as you edit the text in the `.md` files.
4. *Note: If you create a brand-new file, you may need to restart the `npm run dev` server so the generation script (`npm run generate`) can discover the new file and add it to the sidebar.*

## ☁️ Deployment

This project is configured to statically export and deploy automatically to Cloudflare Workers using the `/out` directory.

To deploy manually from your machine:
```bash
npm run build
npx wrangler deploy
```
