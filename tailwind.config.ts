import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // Colors
    "text-cyan-400",
    "text-purple-400",
    "text-green-400",
    "text-orange-400",
    "text-pink-400",
    "text-blue-400",
    "text-yellow-400",
    "bg-cyan-400",
    "bg-purple-400",
    "bg-green-400",
    "bg-orange-400",
    "bg-pink-400",
    "bg-blue-400",
    "bg-yellow-400",
    "border-cyan-400",
    "border-purple-400",
    "border-green-400",
    "border-orange-400",
    "border-pink-400",
    "border-blue-400",
    "border-yellow-400",

    // Gradients
    "from-cyan-400",
    "from-purple-400",
    "from-green-400",
    "from-orange-400",
    "from-pink-400",
    "from-blue-400",
    "from-yellow-400",
    "to-cyan-600",
    "to-purple-600",
    "to-green-600",
    "to-orange-600",
    "to-pink-600",
    "to-blue-600",
    "to-yellow-600",

    // Backgrounds with opacity
    "bg-cyan-400/20",
    "bg-purple-400/20",
    "bg-green-400/20",
    "bg-orange-400/20",
    "bg-pink-400/20",
    "bg-blue-400/20",
    "bg-yellow-400/20",
    "bg-cyan-400/10",
    "bg-purple-400/10",
    "bg-green-400/10",
    "bg-orange-400/10",
    "bg-pink-400/10",
    "bg-blue-400/10",
    "bg-yellow-400/10",

    // Borders with opacity
    "border-cyan-400/30",
    "border-purple-400/30",
    "border-green-400/30",
    "border-orange-400/30",
    "border-pink-400/30",
    "border-blue-400/30",
    "border-yellow-400/30",

    // Shadows
    "shadow-cyan-400/25",
    "shadow-purple-400/25",
    "shadow-green-400/25",
    "shadow-orange-400/25",
    "shadow-pink-400/25",
    "shadow-blue-400/25",
    "shadow-yellow-400/25",
    "shadow-cyan-400/10",
    "shadow-purple-400/10",
    "shadow-green-400/10",
    "shadow-orange-400/10",
    "shadow-pink-400/10",
    "shadow-blue-400/10",
    "shadow-yellow-400/10",

    // Hover states
    "hover:bg-cyan-400/10",
    "hover:bg-purple-400/10",
    "hover:bg-green-400/10",
    "hover:bg-orange-400/10",
    "hover:bg-pink-400/10",
    "hover:bg-blue-400/10",
    "hover:bg-yellow-400/10",
    "hover:border-cyan-400/30",
    "hover:border-purple-400/30",
    "hover:border-green-400/30",
    "hover:border-orange-400/30",
    "hover:border-pink-400/30",
    "hover:border-blue-400/30",
    "hover:border-yellow-400/30",
  ],
} satisfies Config

export default config
