"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Save, Plus, Edit, Trash2, Eye, X, Mail, Download, MessageSquare, Bold, Italic, Underline, Link as LinkIcon, Heading1, Heading2, Heading3, List, AlignLeft, FileText, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import mammoth from "mammoth";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  published: boolean;
  coverPhoto?: string;
}

interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
  date: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  date: string;
}

const ADMIN_EMAIL = "Hassyku786@gmail.com";
const ADMIN_PASSWORD = "Hassaan@786";

export default function BlogAdmin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);
  const [isLoadingContact, setIsLoadingContact] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    published: false,
    coverPhoto: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [documentPreview, setDocumentPreview] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem("blogAdminAuth");
    const authEmail = sessionStorage.getItem("blogAdminEmail");
    if (auth === "authenticated" && authEmail === ADMIN_EMAIL) {
      setIsAuthenticated(true);
      loadBlogs();
      loadCategories();
      loadSubscribers();
      loadContactSubmissions();
    } else {
      // Clear invalid session
      sessionStorage.removeItem("blogAdminAuth");
      sessionStorage.removeItem("blogAdminEmail");
    }
  }, []);


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify email and password
    if (email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("blogAdminAuth", "authenticated");
      sessionStorage.setItem("blogAdminEmail", ADMIN_EMAIL);
      setIsAuthenticated(true);
      loadBlogs();
      loadCategories();
      loadSubscribers();
      loadContactSubmissions();
    } else {
      alert("Invalid email or password. Access denied.");
      setPassword("");
    }
  };

  const loadBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      if (data.success && data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
      // Fallback to localStorage
      const storedBlogs = localStorage.getItem("moneydesk_blogs");
      if (storedBlogs) {
        setBlogs(JSON.parse(storedBlogs) as BlogPost[]);
      }
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const loadCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data.success && data.categories) {
        const categoryNames = data.categories.map((cat: any) => cat.name);
        setCategories(categoryNames);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      // Fallback: extract categories from blogs
      const categoriesFromBlogs = new Set(blogs.map((blog: BlogPost) => blog.category).filter(Boolean) as string[]);
      setCategories(Array.from(categoriesFromBlogs).sort());
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const getExistingCategories = (): string[] => {
    const categorySet = new Set(categories);
    // If editing, ensure the current blog's category is included
    if (editingBlog && editingBlog.category && !categorySet.has(editingBlog.category)) {
      categorySet.add(editingBlog.category);
    }
    // Also include the current formData category if it exists and is not in the list
    if (formData.category && formData.category.trim() && !categorySet.has(formData.category)) {
      categorySet.add(formData.category);
    }
    return Array.from(categorySet).sort();
  };

  const loadSubscribers = async () => {
    setIsLoadingSubscribers(true);
    try {
      const response = await fetch("/api/newsletter/subscribers");
      const data = await response.json();
      if (data.success && data.subscribers) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error("Error loading subscribers:", error);
      // Fallback to localStorage
      const storedSubscribers = localStorage.getItem("moneydesk_newsletter_subscribers");
      if (storedSubscribers) {
        const subs = JSON.parse(storedSubscribers) as NewsletterSubscriber[];
        subs.sort((a: NewsletterSubscriber, b: NewsletterSubscriber) => 
          new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
        );
        setSubscribers(subs);
      }
    } finally {
      setIsLoadingSubscribers(false);
    }
  };

  const loadContactSubmissions = async () => {
    setIsLoadingContact(true);
    try {
      const response = await fetch("/api/contact/submissions");
      const data = await response.json();
      if (data.success && data.submissions) {
        setContactSubmissions(data.submissions);
      }
    } catch (error) {
      console.error("Error loading contact submissions:", error);
      // Fallback to localStorage
      const storedSubmissions = localStorage.getItem("moneydesk_contact_submissions");
      if (storedSubmissions) {
        const subs = JSON.parse(storedSubmissions) as ContactSubmission[];
        subs.sort((a: ContactSubmission, b: ContactSubmission) => 
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
        setContactSubmissions(subs);
      }
    } finally {
      setIsLoadingContact(false);
    }
  };

  const exportContactSubmissions = () => {
    if (contactSubmissions.length === 0) {
      alert("No contact submissions to export.");
      return;
    }
    
    const csv = [
      ["Name", "Email", "Subject", "Message", "Submitted Date", "Submitted At"],
      ...contactSubmissions.map(sub => [
        sub.name,
        sub.email,
        sub.subject,
        sub.message.replace(/"/g, '""'), // Escape quotes in CSV
        sub.date,
        sub.submittedAt
      ])
    ].map(row => row.map(field => `"${field}"`).join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportSubscribers = () => {
    if (subscribers.length === 0) {
      alert("No subscribers to export.");
      return;
    }
    
    const csv = [
      ["Email", "Subscribed Date", "Subscribed At"],
      ...subscribers.map(sub => [sub.email, sub.date, sub.subscribedAt])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const saveBlogs = async (updatedBlogs: BlogPost[]) => {
    // Save to database via API
    try {
      // Save each blog individually (or batch if needed)
      for (const blog of updatedBlogs) {
        await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blog),
        });
      }
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error("Error saving blogs:", error);
      // Fallback to localStorage
      localStorage.setItem("moneydesk_blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Reduced to 2MB to prevent database issues (base64 encoding increases size by ~33%)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB. Please compress your image or use a smaller file.");
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
        return;
      }
      
      const reader = new FileReader();
      reader.onerror = () => {
        alert("Error reading image file. Please try again.");
      };
      reader.onloadend = () => {
        const result = reader.result as string;
        if (result && result.length > 0) {
          // Check if base64 string is reasonable size (should be ~33% larger than original)
          const base64Size = result.length;
          if (base64Size > 3 * 1024 * 1024) { // 3MB base64 string
            alert("Image is too large after encoding. Please use a smaller image (max 2MB file size).");
            return;
          }
          setFormData({ ...formData, coverPhoto: result });
        } else {
          alert("Failed to read image. Please try again.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateContent = () => {
    if (contentRef.current) {
      const htmlContent = contentRef.current.innerHTML;
      setFormData({ ...formData, content: htmlContent });
    }
  };

  const handleFormat = (command: string, value?: string) => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
    
    // For formatBlock, we need to ensure selection exists
    if (command === "formatBlock" && value) {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        // If no selection, create a paragraph first
        if (contentRef.current) {
          const p = document.createElement(value);
          p.textContent = "Heading";
          contentRef.current.appendChild(p);
          const range = document.createRange();
          range.selectNodeContents(p);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    }
    
    const success = document.execCommand(command, false, value);
    if (!success && command === "formatBlock" && value) {
      // Fallback: wrap selection in heading tag
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const heading = document.createElement(value);
        try {
          heading.appendChild(range.extractContents());
          range.insertNode(heading);
          selection.removeAllRanges();
          const newRange = document.createRange();
          newRange.selectNodeContents(heading);
          newRange.collapse(false);
          selection.addRange(newRange);
        } catch (e) {
          console.error("Error applying heading:", e);
        }
      }
    }
    
    updateContent();
    if (contentRef.current) {
      contentRef.current.focus();
    }
  };

  const handleLink = () => {
    if (!contentRef.current) return;

    const selection = window.getSelection();
    let range: Range | null = null;
    let selectedText = "";
    let existingUrl = "";
    let isExistingLink = false;
    let linkElement: HTMLAnchorElement | null = null;

    // Get selection or create one at cursor position
    if (selection && selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
      selectedText = range.toString();
      
      // Check if selection is already a link
      const parentElement = range.commonAncestorContainer.parentElement;
      if (parentElement && parentElement.tagName === "A") {
        linkElement = parentElement as HTMLAnchorElement;
        existingUrl = linkElement.href;
        isExistingLink = true;
      }
    } else {
      // No selection - create range at cursor position
      if (contentRef.current) {
        range = document.createRange();
        const textNode = document.createTextNode("link text");
        contentRef.current.appendChild(textNode);
        range.selectNodeContents(textNode);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
        selectedText = "link text";
      }
    }

    if (!range) return;

    // Prompt for URL
    const urlPrompt = existingUrl 
      ? `Edit link URL:\n\nCurrent URL: ${existingUrl}\n\nEnter new URL (or leave empty to remove link):`
      : `Enter the URL for "${selectedText}":\n\nExample: https://example.com`;
    
    const url = prompt(urlPrompt, existingUrl);

    if (url === null) {
      // User cancelled - if we created placeholder text, remove it
      if (!selectedText && contentRef.current) {
        const textNodes = Array.from(contentRef.current.childNodes);
        const lastNode = textNodes[textNodes.length - 1];
        if (lastNode && lastNode.textContent === "link text") {
          contentRef.current.removeChild(lastNode);
        }
      }
      return;
    }

    if (url === "" && isExistingLink && linkElement) {
      // Remove link but keep text
      const parent = linkElement.parentNode;
      if (parent) {
        while (linkElement.firstChild) {
          parent.insertBefore(linkElement.firstChild, linkElement);
        }
        parent.removeChild(linkElement);
      }
      updateContent();
      if (contentRef.current) {
        contentRef.current.focus();
      }
      return;
    }

    if (!url || url.trim() === "") {
      // Empty URL - remove placeholder if we created it
      if (selectedText === "link text" && contentRef.current) {
        const textNodes = Array.from(contentRef.current.childNodes);
        const lastNode = textNodes[textNodes.length - 1];
        if (lastNode && lastNode.textContent === "link text") {
          contentRef.current.removeChild(lastNode);
        }
      }
      return;
    }

    // Ensure URL has protocol
    let finalUrl = url.trim();
    if (!finalUrl.match(/^https?:\/\//i)) {
      finalUrl = "https://" + finalUrl;
    }

    if (isExistingLink && linkElement) {
      // Update existing link
      linkElement.href = finalUrl;
      linkElement.target = "_blank";
      linkElement.rel = "noopener noreferrer";
    } else {
      // Create new link
      if (contentRef.current) {
        contentRef.current.focus();
      }
      
      // Try execCommand first
      const success = document.execCommand("createLink", false, finalUrl);
      
      if (!success) {
        // Fallback: manually create link element
        try {
          const link = document.createElement("a");
          link.href = finalUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = selectedText || "link text";
          
          if (range) {
            range.deleteContents();
            range.insertNode(link);
            
            // Select the new link
            const newRange = document.createRange();
            newRange.selectNodeContents(link);
            newRange.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(newRange);
          }
        } catch (e) {
          console.error("Error creating link:", e);
          alert("Error creating link. Please try again.");
          return;
        }
      } else {
        // execCommand succeeded - set attributes
        const links = contentRef.current?.querySelectorAll("a");
        if (links && links.length > 0) {
          const lastLink = links[links.length - 1] as HTMLAnchorElement;
          lastLink.target = "_blank";
          lastLink.rel = "noopener noreferrer";
        }
      }
    }

    updateContent();
    if (contentRef.current) {
      contentRef.current.focus();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate category
    if (!formData.category || !formData.category.trim()) {
      alert("Please select or create a category for the blog post.");
      return;
    }
    
    // Get final content from editor
    const finalContent = contentRef.current?.innerHTML || formData.content;
    
    const blogPost: BlogPost = {
      id: editingBlog?.id || Date.now().toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: finalContent,
      author: formData.author,
      date: editingBlog?.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      readTime: calculateReadTime(contentRef.current?.innerText || finalContent),
      category: formData.category.trim(),
      published: formData.published,
      coverPhoto: formData.coverPhoto || undefined,
    };

    try {
      // Save to database via API
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogPost),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Show the actual error message from the API
        const errorMessage = data.error || `HTTP ${response.status}: ${response.statusText}` || "Failed to save blog";
        console.error("API Error:", errorMessage, data);
        alert(`Error: ${errorMessage}\n\nPlease check:\n1. Database connection\n2. Image size (max 2MB)\n3. All required fields are filled\n\nCheck browser console for details.`);
        return;
      }

      // Update local state
      let updatedBlogs;
      if (editingBlog) {
        updatedBlogs = blogs.map((b) => (b.id === editingBlog.id ? blogPost : b));
      } else {
        updatedBlogs = [...blogs, blogPost];
      }
      setBlogs(updatedBlogs);
      // Reload categories in case a new one was created
      await loadCategories();
      resetForm();
      alert("Blog saved successfully!");
    } catch (error: any) {
      console.error("Error saving blog:", error);
      const errorMessage = error.message || "Failed to save blog. Please try again.";
      alert(`Error: ${errorMessage}\n\nPlease check:\n1. Database connection\n2. Network connection\n3. Browser console for details.`);
    }
  };

  const calculateReadTime = (content: string): string => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };


  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category || "",
      published: blog.published,
      coverPhoto: blog.coverPhoto || "",
    });
    setShowNewCategoryInput(false);
    setNewCategory("");
    setShowEditor(true);
    // Set content in editor after a brief delay to ensure DOM is ready
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.innerHTML = blog.content || '';
      }
    }, 100);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs?id=${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          const updatedBlogs = blogs.filter((b) => b.id !== id);
          setBlogs(updatedBlogs);
        } else {
          throw new Error(data.error || "Failed to delete blog");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog. Please try again.");
        // Fallback to localStorage
        const updatedBlogs = blogs.filter((b) => b.id !== id);
        localStorage.setItem("moneydesk_blogs", JSON.stringify(updatedBlogs));
        setBlogs(updatedBlogs);
      }
    }
  };

  const resetForm = () => {
    setEditingBlog(null);
    setShowEditor(false);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      published: false,
      coverPhoto: "",
    });
    setShowNewCategoryInput(false);
    setNewCategory("");
    setDocumentPreview("");
    setShowPreview(false);
    if (contentRef.current) {
      contentRef.current.innerHTML = "";
    }
  };

  const handleNewBlog = () => {
    resetForm();
    setShowEditor(true);
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // .doc
      'application/vnd.ms-word.document.macroEnabled.12', // .docm
    ];

    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.docx') && !file.name.toLowerCase().endsWith('.doc')) {
      alert('Please upload a Word document (.docx or .doc)');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Convert images to base64
      const imageOptions = {
        convertImage: mammoth.images.imgElement((image) => {
          return image.read("base64").then((imageBuffer: any) => {
            return {
              src: `data:${image.contentType};base64,${imageBuffer}`
            };
          }).catch((error: any) => {
            console.error('Error reading image:', error);
            return { src: '' };
          });
        })
      };

      // Convert document to HTML
      const result = await mammoth.convertToHtml({ arrayBuffer }, imageOptions);
      const html = result.value;
      const messages = result.messages;

      // Show warnings if any
      if (messages.length > 0) {
        console.warn('Document conversion warnings:', messages);
      }

      // Set preview
      setDocumentPreview(html);
      setShowPreview(true);

      // Insert into editor
      if (contentRef.current) {
        const currentContent = contentRef.current.innerHTML || '';
        const newContent = currentContent ? `${currentContent}<br><br>${html}` : html;
        contentRef.current.innerHTML = newContent;
        updateContent();
      }

      alert('Document uploaded successfully! Check the preview and editor.');
    } catch (error) {
      console.error('Error parsing document:', error);
      alert('Error parsing document. Please make sure it\'s a valid Word document.');
    } finally {
      setIsUploading(false);
      // Reset input
      if (documentInputRef.current) {
        documentInputRef.current.value = '';
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Admin Portal</h1>
            <p className="text-gray-600">Authorized access only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Blog Admin Portal</h1>
              <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-semibold">
                {ADMIN_EMAIL}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/careers"
              className="px-4 py-2 bg-primary-100 text-primary-600 rounded-xl font-semibold hover:bg-primary-200 transition-all"
            >
              Manage Careers
            </Link>
            <Link
              href="/admin/feedback"
              className="px-4 py-2 bg-primary-100 text-primary-600 rounded-xl font-semibold hover:bg-primary-200 transition-all"
            >
              Manage Feedback
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem("blogAdminAuth");
                sessionStorage.removeItem("blogAdminEmail");
                window.location.reload();
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Logout
            </button>
            <button
              onClick={handleNewBlog}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              New Blog Post
            </button>
          </div>
        </div>

        {/* Editor */}
        {showEditor && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Cover Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Photo
                </label>
                <div className="space-y-4">
                  {formData.coverPhoto && (
                    <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200">
                      <img
                        src={formData.coverPhoto}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, coverPhoto: "" })}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF or WebP (MAX. 2MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="space-y-2">
                    {!showNewCategoryInput ? (
                      <div className="flex gap-2">
                        <select
                          value={formData.category || ""}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            if (selectedValue === "__new__") {
                              setShowNewCategoryInput(true);
                              setFormData({ ...formData, category: "" });
                            } else if (selectedValue) {
                              setFormData({ ...formData, category: selectedValue.trim() });
                            } else {
                              setFormData({ ...formData, category: "" });
                            }
                          }}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                          required={!formData.category}
                        >
                          <option value="">Select a category</option>
                          {getExistingCategories().map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                          <option value="__new__">+ Create New Category</option>
                        </select>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          onBlur={() => {
                            if (newCategory.trim()) {
                              setFormData({ ...formData, category: newCategory.trim() });
                            }
                          }}
                          onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (newCategory.trim()) {
                                const categoryName = newCategory.trim();
                                // Save category to database
                                try {
                                  const response = await fetch("/api/categories", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ name: categoryName }),
                                  });
                                  const data = await response.json();
                                  if (data.success) {
                                    // Reload categories to get the updated list
                                    await loadCategories();
                                    setFormData({ ...formData, category: categoryName });
                                  } else {
                                    // If category already exists, just use it
                                    if (data.error?.includes("already exists")) {
                                      await loadCategories();
                                      setFormData({ ...formData, category: categoryName });
                                    } else {
                                      alert(`Error creating category: ${data.error || "Unknown error"}`);
                                    }
                                  }
                                } catch (error) {
                                  console.error("Error creating category:", error);
                                  // Still allow using the category locally
                                  setFormData({ ...formData, category: categoryName });
                                }
                                setShowNewCategoryInput(false);
                                setNewCategory("");
                              }
                            } else if (e.key === "Escape") {
                              setShowNewCategoryInput(false);
                              setNewCategory("");
                            }
                          }}
                          className="flex-1 px-4 py-3 border-2 border-primary-500 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter new category name"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (newCategory.trim()) {
                              const categoryName = newCategory.trim();
                              // Save category to database
                              try {
                                const response = await fetch("/api/categories", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ name: categoryName }),
                                });
                                const data = await response.json();
                                if (data.success) {
                                  // Reload categories to get the updated list
                                  await loadCategories();
                                  setFormData({ ...formData, category: categoryName });
                                } else {
                                  // If category already exists, just use it
                                  if (data.error?.includes("already exists")) {
                                    await loadCategories();
                                    setFormData({ ...formData, category: categoryName });
                                  } else {
                                    alert(`Error creating category: ${data.error || "Unknown error"}`);
                                  }
                                }
                              } catch (error) {
                                console.error("Error creating category:", error);
                                // Still allow using the category locally
                                setFormData({ ...formData, category: categoryName });
                              }
                            }
                            setShowNewCategoryInput(false);
                            setNewCategory("");
                          }}
                          className="px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowNewCategoryInput(false);
                            setNewCategory("");
                            setFormData({ ...formData, category: "" });
                          }}
                          className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {formData.category && !showNewCategoryInput && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Selected: <strong className="text-gray-900">{formData.category}</strong></span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, category: "" });
                          }}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Change
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Brief description of the blog post"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Content *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={documentInputRef}
                      type="file"
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleDocumentUpload}
                      className="hidden"
                      id="document-upload"
                    />
                    <label
                      htmlFor="document-upload"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                        isUploading
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload Document
                        </>
                      )}
                    </label>
                    {documentPreview && (
                      <button
                        type="button"
                        onClick={() => setShowPreview(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg font-semibold hover:bg-green-200 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Formatting Toolbar */}
                <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 border-2 border-b-0 border-gray-200 rounded-t-xl">
                  <button
                    type="button"
                    onClick={() => handleFormat("bold")}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat("italic")}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat("underline")}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Underline"
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFormat("formatBlock", "h1");
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Heading 1"
                  >
                    <Heading1 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFormat("formatBlock", "h2");
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Heading 2"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFormat("formatBlock", "h3");
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Heading 3"
                  >
                    <Heading3 className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => handleFormat("insertUnorderedList")}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Bullet List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat("insertOrderedList")}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Numbered List"
                  >
                    <List className="w-4 h-4 rotate-90" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={handleLink}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Insert Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleFormat("foreColor", e.target.value);
                      }
                    }}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    title="Text Color"
                  >
                    <option value="">Color</option>
                    <option value="#000000">Black</option>
                    <option value="#333333">Dark Gray</option>
                    <option value="#666666">Gray</option>
                    <option value="#0066CC">Blue</option>
                    <option value="#009900">Green</option>
                    <option value="#CC0000">Red</option>
                    <option value="#FF6600">Orange</option>
                    <option value="#9900CC">Purple</option>
                  </select>
                </div>

                {/* Rich Text Editor */}
                <div
                  ref={contentRef}
                  contentEditable
                  onInput={updateContent}
                  onBlur={updateContent}
                  onKeyDown={(e) => {
                    // Ensure LTR direction on key events
                    if (contentRef.current) {
                      contentRef.current.style.direction = 'ltr';
                      contentRef.current.style.textAlign = 'left';
                    }
                  }}
                  className="w-full min-h-[400px] px-4 py-3 border-2 border-gray-200 rounded-b-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins text-base bg-white blog-editor"
                  style={{
                    direction: 'ltr',
                    textAlign: 'left',
                    outline: 'none'
                  }}
                  suppressContentEditableWarning
                  data-placeholder="Write your blog content here... You can format text, add headings, links, and more!"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Publish immediately</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Save className="w-5 h-5" />
                  {editingBlog ? "Update Blog" : "Save Blog"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Newsletter Subscribers */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Newsletter Subscribers ({isLoadingSubscribers ? '...' : subscribers.length})
              </h2>
            </div>
            {subscribers.length > 0 && (
              <button
                onClick={exportSubscribers}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-xl font-semibold hover:bg-primary-200 transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
          </div>
          
          {isLoadingSubscribers ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : subscribers.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No newsletter subscribers yet.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {subscribers.map((subscriber, index) => (
                <div
                  key={index}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 transition-all bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-primary-600" />
                        <span className="font-semibold text-gray-900">{subscriber.email}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 ml-7">Subscribed on {subscriber.date}</p>
                    </div>
                    <a
                      href={`mailto:${subscriber.email}`}
                      className="px-3 py-1 bg-primary-100 text-primary-600 rounded-lg text-sm font-semibold hover:bg-primary-200 transition-colors"
                    >
                      Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Form Submissions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Contact Form Submissions ({isLoadingContact ? '...' : contactSubmissions.length})
              </h2>
            </div>
            {contactSubmissions.length > 0 && (
              <button
                onClick={exportContactSubmissions}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-xl font-semibold hover:bg-primary-200 transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
          </div>
          
          {isLoadingContact ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : contactSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No contact form submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {contactSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 transition-all bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className="w-4 h-4 text-primary-600" />
                        <span className="font-bold text-gray-900">{submission.name}</span>
                        <span className="text-sm text-gray-500">({submission.email})</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-sm font-semibold text-gray-700">Subject: </span>
                        <span className="text-sm text-gray-900">{submission.subject}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{submission.message}</p>
                      <p className="text-xs text-gray-500">Submitted on {submission.date}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a
                        href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}
                        className="px-3 py-1 bg-primary-100 text-primary-600 rounded-lg text-sm font-semibold hover:bg-primary-200 transition-colors text-center"
                      >
                        Reply
                      </a>
                      <details className="cursor-pointer">
                        <summary className="text-xs text-primary-600 hover:text-primary-700 font-medium px-2 py-1">
                          View Full
                        </summary>
                        <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 whitespace-pre-wrap max-w-md">
                          {submission.message}
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Blog Posts ({isLoadingBlogs ? '...' : blogs.length})
          </h2>
          
          {isLoadingBlogs ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No blog posts yet. Create your first blog post!</p>
              <button
                onClick={handleNewBlog}
                className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-all"
              >
                <Plus className="w-5 h-5" />
                Create First Blog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{blog.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          blog.published 
                            ? 'bg-success/20 text-success-dark' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {blog.published ? "Published" : "Draft"}
                        </span>
                        <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-semibold">
                          {blog.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>By {blog.author}</span>
                        <span>•</span>
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Preview Modal */}
      {showPreview && documentPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Document Preview</h2>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div
                className="prose prose-lg max-w-none blog-content"
                dangerouslySetInnerHTML={{ __html: documentPreview }}
                style={{
                  direction: 'ltr',
                  textAlign: 'left'
                }}
              />
            </div>
            <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  if (contentRef.current) {
                    contentRef.current.innerHTML = documentPreview;
                    updateContent();
                  }
                  setShowPreview(false);
                }}
                className="px-6 py-2 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
              >
                Use This Content
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

