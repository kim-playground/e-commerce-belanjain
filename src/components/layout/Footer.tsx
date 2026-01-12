import { ShoppingBag } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-secondary/30">
      <div className="container-wide py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <ShoppingBag className="h-5 w-5" />
            <span>Belanjain</span>
          </div>

          {/* Links */}
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Belanjain
          </p>
        </div>
      </div>
    </footer>
  );
}
