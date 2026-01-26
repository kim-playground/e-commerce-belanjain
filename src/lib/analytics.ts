import ReactGA from "react-ga4";

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  try {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        debug_mode: process.env.NODE_ENV === "development",
      },
    });
    console.log("Google Analytics initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Google Analytics:", error);
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  try {
    ReactGA.send({
      hitType: "pageview",
      page: path,
      title: title || document.title,
    });
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
};

// Track custom events
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  try {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
};

// E-commerce tracking
export const trackPurchase = (
  transactionId: string,
  value: number,
  items: any[]
) => {
  try {
    ReactGA.event("purchase", {
      transaction_id: transactionId,
      value,
      items,
    });
  } catch (error) {
    console.error("Failed to track purchase:", error);
  }
};

export const trackAddToCart = (item: {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}) => {
  try {
    ReactGA.event("add_to_cart", {
      currency: "IDR",
      value: item.price * item.quantity,
      items: [item],
    });
  } catch (error) {
    console.error("Failed to track add to cart:", error);
  }
};

export const trackRemoveFromCart = (item: {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}) => {
  try {
    ReactGA.event("remove_from_cart", {
      currency: "IDR",
      value: item.price * item.quantity,
      items: [item],
    });
  } catch (error) {
    console.error("Failed to track remove from cart:", error);
  }
};

export const trackViewItem = (item: {
  item_id: string;
  item_name: string;
  price: number;
}) => {
  try {
    ReactGA.event("view_item", {
      currency: "IDR",
      value: item.price,
      items: [item],
    });
  } catch (error) {
    console.error("Failed to track view item:", error);
  }
};

export const trackSearch = (searchTerm: string) => {
  try {
    ReactGA.event("search", {
      search_term: searchTerm,
    });
  } catch (error) {
    console.error("Failed to track search:", error);
  }
};

export const trackLogin = (method: string) => {
  try {
    ReactGA.event("login", {
      method,
    });
  } catch (error) {
    console.error("Failed to track login:", error);
  }
};

export const trackSignUp = (method: string) => {
  try {
    ReactGA.event("sign_up", {
      method,
    });
  } catch (error) {
    console.error("Failed to track sign up:", error);
  }
};
