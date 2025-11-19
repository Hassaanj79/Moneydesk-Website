"use client";

import { useEffect } from "react";

export function TawkChat() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Check if script is already added
    const existingScript = document.querySelector('script[src*="embed.tawk.to"]');
    if (existingScript) {
      console.log("Tawk.to script already loaded");
      return;
    }

    // Initialize Tawk_API object before script loads
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Auto-show chat widget after it loads
    window.Tawk_API.onLoad = function() {
      console.log("Tawk.to loaded successfully");
      
      // Set widget colors to match website theme after widget loads
      // Primary: #00947c (teal), Accent: #f59e0b (orange)
      setTimeout(function() {
        try {
          // Use Tawk.to's customization API
          if (window.Tawk_API && window.Tawk_API.setAttributes) {
            window.Tawk_API.setAttributes({
              'widget-color': '#00947c', // Primary teal color
              'widget-text-color': '#ffffff',
              'widget-bg-color': '#ffffff'
            }, function(error: any) {
              if (error) {
                console.error("Error setting Tawk.to widget colors:", error);
              } else {
                console.log("Tawk.to widget colors set to match website theme");
              }
            });
          }
          
          // Also try to customize via CSS injection (for launcher button)
          const tawkContainer = document.getElementById('tawkchat-container');
          if (tawkContainer) {
            const style = document.createElement('style');
            style.textContent = `
              #tawkchat-container iframe {
                border-radius: 12px !important;
              }
              /* Style the launcher button wrapper */
              #tawkchat-container > div:last-child {
                filter: none !important;
              }
            `;
            document.head.appendChild(style);
          }
        } catch (e) {
          console.error("Error customizing Tawk.to widget:", e);
        }
      }, 1000);
    };
    
    // Handle connection status
    window.Tawk_API.onStatusChange = function(status: string) {
      console.log("Tawk.to status:", status);
    };

    // Create and inject the script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/691d27650da0be19640f5f33/1jad7lke2";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    
    // Add error handling
    script.onerror = function() {
      console.error("Failed to load Tawk.to script");
    };
    
    script.onload = function() {
      console.log("Tawk.to script loaded successfully");
    };
    
    // Add custom CSS to style Tawk.to widget launcher button (outside iframe)
    // Note: Widget content inside iframe must be styled via Tawk.to dashboard
    const style = document.createElement("style");
    style.id = "tawk-custom-styles";
    style.textContent = `
      /* Tawk.to Widget Custom Colors - Match Website Theme */
      /* Style the launcher button container */
      #tawkchat-container {
        border-radius: 12px !important;
      }
      
      /* Target the launcher button if it exists outside iframe */
      #tawkchat-container > div:last-child button,
      #tawkchat-container button {
        background-color: #00947c !important; /* Primary teal */
        border-color: #00947c !important;
        color: #ffffff !important;
      }
      
      #tawkchat-container > div:last-child button:hover,
      #tawkchat-container button:hover {
        background-color: #007663 !important; /* Darker teal on hover */
      }
    `;
    
    // Check if style already exists
    if (!document.getElementById('tawk-custom-styles')) {
      document.head.appendChild(style);
    }

    // Insert script before the first script tag (as per Tawk.to documentation)
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Don't remove script on cleanup to avoid reloading
    };
  }, []);

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

