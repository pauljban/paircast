/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'landscape': "url('https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?q=80&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }
    },
  },
  plugins: [],
}

