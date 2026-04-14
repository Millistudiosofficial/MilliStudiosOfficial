/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "var(--obsidian)",
        charcoal: "var(--charcoal)",
        silver: "var(--silver)",
        "silver-dim": "var(--silver-dim)",
        white: "var(--white)",
        cyan: "var(--cyan)",
        "cyan-glow": "var(--cyan-glow)",
        glass: "var(--glass)",
        "glass-border": "var(--glass-border)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-obsidian": "var(--gradient-obsidian)",
        "gradient-cyan": "var(--gradient-cyan)",
      },
    },
  },
  plugins: [],
}
