import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Package,
  Heart,
  ShoppingCart,
  GitCompare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Header() {
  const location = useLocation();
  const { getItemCount } = useCart();
  const { wishlist } = useWishlist();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/orders", label: "Orders" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-xl font-semibold text-foreground transition-opacity hover:opacity-70"
          >
            <ShoppingBag className="h-6 w-6" />
            <span>Belanjain</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative font-body text-sm font-medium transition-colors hover:text-foreground",
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-foreground" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {wishlist.length}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {getItemCount()}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Admin Link */}
            <Link
              to="/admin"
              className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Manage</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
