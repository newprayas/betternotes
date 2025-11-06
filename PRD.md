
---

## **Product Requirements Document (PRD): @Better Notes V2**

*   **Version:** 1.0
*   **Date:** November 5, 2025
*   **Author:** Gemini (for Prayas Raj Ojha)
*   **Status:** Draft

### **1. Introduction & Vision**

This document outlines the requirements for the version 2 website of `@Better Notes`. The current website is a single, long-form page that serves as a basic catalog. The vision for V2 is to create a professional, mobile-first e-commerce platform that enhances the user experience, streamlines the purchasing process, and establishes a scalable foundation for the `@Better Notes` brand.

The new website will be a static-first site built with **Next.js**, managed via a headless CMS (**Sanity.io**), and hosted on **Vercel**.

This will be MOBILE first website - primariy deisgned for mboile user (for mobile phone screens) - NO desktop website veiw is required for now. 
 
### **2. Goals & Objectives**

*   **Business Goal:** To increase the conversion rate of visitors to paying customers by providing a more intuitive and credible shopping experience.
*   **User Goal:** To allow medical students to easily browse, sample, and select medical notes for purchase on their mobile devices.
*   **Technical Goal:** To build a high-performance, maintainable, and scalable website with a decoupled front-end and back-end (CMS).

### **3. Target Audience**

The primary users are medical students in various years of their studies (3rd, 4th, 5th, etc.).

*   **Demographics:** Tech-savvy individuals, primarily in their early-to-mid 20s.
*   **Behavior:** They are heavy mobile users, value-conscious, and need quick access to high-quality, exam-focused study materials. They appreciate peer-to-peer recommendations and trust creators who are in their field.

### **4. User Stories & Journeys**

*   **As a new visitor,** I want to quickly understand what the website offers and who the author is, so I can decide if the notes are credible.
*   **As a prospective customer,** I want to be able to filter notes by my academic year and subject, so I can find relevant material quickly.
*   **As a careful buyer,** I want to see high-quality samples of the notes before I decide to purchase, so I can assess their quality and style.
*   **As a shopper,** I want to add multiple notes to a shopping cart from different sections of the website, so I can purchase them all in one go.
*   **As a savvy student,** I want to be able to apply a discount code during checkout to get a better price.
*   **As a customer ready to buy,** I want a simple way to confirm my order and contact the seller to arrange payment.

### **5. Detailed Feature Requirements**

#### **5.1. Global Elements**

These elements should be present on most pages.

*   **Header:**
    *   Logo (`@Better Notes`) that links to the Homepage.
    *   Navigation links: "Home," "All Notes," "About."
    *   A Shopping Cart icon that displays the number of items currently in the cart.
*   **Footer:**
    *   Logo and copyright information (`@Better Notes © 2025`).
    *   Links to social media or contact information.

#### **5.2. Page: Homepage (`/`)**

*   **Purpose:** To introduce the brand, build credibility, and guide users to the products.
*   **Requirements:**
    1.  **Hero Section:** A prominent heading ("Make Your Exams Easier") and a short, engaging tagline.
    2.  **Author Introduction:** A dedicated section featuring Prayas Raj Ojha's photo, name, and credentials to build trust.
    3.  **Value Propositions:** A section highlighting key benefits (e.g., "Exam Focused," "Quick Review," "Easy Explanations").
    4.  **Featured Products Section:** A curated grid of 3-4 popular notes or bundles to drive users directly to high-value items. Each item must link to its Individual Note Page.
    5.  **Call to Action (CTA):** A visually distinct button prompting users to "Browse All Notes," linking to the `/notes` page.

#### **5.3. Page: Notes & Store (`/notes`)**

*   **Purpose:** The main product catalog for all notes.
*   **Requirements:**
    1.  **Filtering Controls:**
        *   Filter by **Academic Year** (e.g., 3rd Year, 4th Year).
        *   Filter by **Subject** (e.g., Pharmacology, Forensic Medicine).
        *   Applying a filter should dynamically update the displayed products without a full page reload.
    2.  **Product Grid:**
        *   Notes displayed in a responsive grid format.
        *   Each "product card" in the grid must display the note's title, price, and a thumbnail image.
        *   Each card must link to its unique Individual Note Page.

#### **5.4. Page: Individual Note (`/notes/[slug]`)**

*   **Purpose:** A detailed view of a single product to convince the user to buy.
*   **Requirements:**
    1.  **Product Information:** The note's full `Title` and `Price` must be clearly displayed.
    2.  **Image Gallery:**
        *   A gallery displaying the `sampleImages` for the note.
        *   **Must be mobile-friendly and support touch gestures (swipe left/right).**
        *   **Must support a zoom-in/pinch-to-zoom feature** for detailed inspection of the notes.
    3.  **Description:** A section for a detailed description of the note's contents.
    4.  **Add to Cart Button:** A prominent button to add the current item to the shopping cart. The button should provide visual feedback (e.g., changes to "Added!" or updates the cart icon) upon being clicked.

#### **5.5. Feature: Shopping Cart (`/cart`)**

*   **Purpose:** To allow users to review their selections and begin the checkout process.
*   **Requirements:**
    1.  **Order Summary:** Display all items added to the cart in a list. Each item should show its title, price, and a "Remove" button.
    2.  **Dynamic Calculation:** The page must display a subtotal that automatically updates if an item is removed.
    3.  **Discount Code Field:**
        *   An input text box for users to enter a discount code.
        *   An "Apply" button that validates the code against the list of codes in Sanity.
        *   If the code is valid and not yet used, the final total should be recalculated and displayed.
        *   If invalid, an error message should be shown.
    4.  **Total Price:** A clear display of the final calculated price.
    5.  **Checkout Button:** A button that reads "Proceed to Checkout" and links to the `/checkout` page.

#### **5.6. Page: Checkout (`/checkout`)**

*   **Purpose:** To finalize the order and hand it off to the manual payment process.
*   **Requirements:**
    1.  **Final Order Review:** A non-editable summary of the cart items, discount applied, and the final total.
    2.  **Instructions:** A clear, simple text explaining the next step.
    3.  **WhatsApp Redirect Button:**
        *   A prominent button labeled "Confirm & Order on WhatsApp."
        *   Clicking this button **must** generate and open a `whatsapp://` link.
        *   The link must pre-populate a message to your specified phone number with the following format:
            `Hello, I'd like to purchase the following notes from @Better Notes: \n\n[Item 1 Title] - [Price]\n[Item 2 Title] - [Price]\n\nDiscount Applied: [Code]\nTotal Price: [Final Price]\n\nPlease let me know the payment details. Thank you!`

### **6. Content Management (Sanity.io Schemas)**

The following content models (schemas) need to be created in Sanity Studio.

*   **`note` Document:**
    *   `title`: Text (String)
    *   `slug`: Slug (unique, generated from title)
    *   `price`: Number
    *   `academicYear`: Text (String), with a pre-defined list of options (e.g., "3rd Year," "4th Year").
    *   `subject`: Text (String), with a pre-defined list of options.
    *   `description`: Rich Text (Block Content)
    *   `sampleImages`: Array of Images
    *   `inventory`: Number (for tracking stock, if needed in the future)
*   **`discountCode` Document:**
    *   `code`: Text (String) - The actual code to be entered.
    *   `discountValue`: Number - The amount to be deducted.
    *   `isOneTimeUse`: Boolean - Set to `true`.
    *   `isUsed`: Boolean - Default to `false`. *(This will be manually toggled to `true` in Sanity Studio after a purchase is confirmed)*.

### **7. Non-Functional Requirements**

*   **Design:** The website must be **mobile-first**. The UI should be modern, clean, and sleek, taking inspiration from the color scheme (black, yellow, red accents) of the existing site but implemented in a more structured and minimalist way.
*   **Performance:** Pages should load quickly, with optimized images to ensure a smooth experience on mobile networks.
*   **Hosting:** The final application will be deployed on Vercel.

### **8. Out of Scope for V1.0**

*   **Online Payment Integration:** All payments will be handled manually and externally (off-site).
*   **User Accounts:** There will be no customer login, registration, or order history functionality.
*   **Automated Discount Code Management:** The "isUsed" status of discount codes will be updated manually in Sanity after a successful sale.
*   **Automated Inventory Management:** Inventory will be manually tracked.