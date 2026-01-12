import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const addToWishlist = (item: WishlistItem) => {
    const isAlreadyInWishlist = wishlist.some((w) => w.id === item.id);

    if (isAlreadyInWishlist) {
      toast.info("Product already in wishlist");
      return;
    }

    const newWishlist = [...wishlist, item];
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    toast.success("Added to wishlist!");
  };

  const removeFromWishlist = (id: string) => {
    const newWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    toast.success("Removed from wishlist");
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
    toast.success("Wishlist cleared");
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };
};
