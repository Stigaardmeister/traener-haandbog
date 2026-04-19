import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VIGTIGT: Erstat 'traener-haandbog' med navnet på jeres GitHub-repo
// Hvis I deployer til et "user/organization site" (f.eks. brugernavn.github.io)
// skal base være '/' i stedet for '/traener-haandbog/'
export default defineConfig({
  plugins: [react()],
  base: '/traener-haandbog/',
})
