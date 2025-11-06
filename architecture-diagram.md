# @Better Notes V2 - Architecture Diagram

## System Architecture Overview

```mermaid
graph TB
    subgraph "Client Side"
        A[Mobile Browser] --> B[Next.js App]
        B --> C[React Components]
        C --> D[UI Components]
        C --> E[Cart Context]
    end
    
    subgraph "Content Management"
        F[Sanity Studio] --> G[Sanity CMS]
        G --> H[Notes Content]
        G --> I[Discount Codes]
    end
    
    subgraph "Hosting & Deployment"
        J[Vercel Platform] --> K[Global CDN]
        J --> L[Edge Functions]
    end
    
    subgraph "External Services"
        M[Telegram] --> N[Order Completion]
    end
    
    B -.->|API Calls| G
    B -.->|Static Generation| J
    E -->|Order Details| M
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style G fill:#e8f5e8
    style J fill:#fff3e0
    style M fill:#fce4ec
```

## Component Architecture

```mermaid
graph LR
    subgraph "Pages"
        A[Homepage] --> B[Notes Catalog]
        B --> C[Individual Note]
        C --> D[Shopping Cart]
        D --> E[Checkout]
    end
    
    subgraph "Shared Components"
        F[Header] --> G[Footer]
        H[Cart Icon] --> I[Navigation]
    end
    
    subgraph "Feature Components"
        J[Image Gallery] --> K[Zoom/Pinch]
        L[Note Card] --> M[Filter Controls]
        N[Cart Item] --> O[Discount Form]
    end
    
    A --> F
    B --> F
    C --> F
    D --> F
    E --> F
    
    B --> M
    C --> J
    D --> N
    E --> O
    
    style A fill:#e3f2fd
    style B fill:#e3f2fd
    style C fill:#e3f2fd
    style D fill:#e3f2fd
    style E fill:#e3f2fd
    style F fill:#f1f8e9
    style J fill:#fff8e1
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant NextJS
    participant Sanity
    participant Cart
    participant Telegram
    
    User->>NextJS: Browse Notes
    NextJS->>Sanity: Fetch Notes Data
    Sanity-->>NextJS: Return Notes
    NextJS-->>User: Display Notes
    
    User->>NextJS: Add to Cart
    NextJS->>Cart: Update Cart State
    Cart-->>NextJS: Cart Updated
    NextJS-->>User: Show Cart Feedback
    
    User->>NextJS: Proceed to Checkout
    NextJS->>Cart: Get Cart Items
    Cart-->>NextJS: Return Cart Data
    NextJS-->>User: Display Checkout
    
    User->>Telegram: Contact for Order
    Telegram-->>User: Order Confirmation
```

## Mobile-First Design Strategy

```mermaid
graph TD
    A[Mobile First Design] --> B[Base Styles 320px+]
    B --> C[Tablet Enhancement 768px+]
    C --> D[Desktop Enhancement 1024px+]
    
    A --> E[Touch Optimization]
    E --> F[44px Minimum Tap Targets]
    E --> G[Gesture Support]
    E --> H[Thumb-Friendly Navigation]
    
    A --> I[Performance Priority]
    I --> J[Optimized Images]
    I --> K[Minimal JavaScript]
    I --> L[Critical CSS]
    
    style A fill:#e8f5e8
    style E fill:#fff3e0
    style I fill:#e3f2fd
```

## Technology Stack Integration

```mermaid
graph TB
    subgraph "Frontend Framework"
        A[Next.js 15] --> B[App Router]
        A --> C[Static Site Generation]
        A --> D[Image Optimization]
    end
    
    subgraph "Styling"
        E[Tailwind CSS] --> F[Mobile-First Breakpoints]
        E --> G[Utility Classes]
        E --> H[Custom Theme]
    end
    
    subgraph "Content Management"
        I[Sanity.io] --> J[Headless CMS]
        I --> K[Real-time Updates]
        I --> L[Custom Schemas]
    end
    
    subgraph "State Management"
        M[React Context] --> N[Shopping Cart]
        M --> O[Global State]
    end
    
    subgraph "Image Handling"
        P[react-zoom-pan-pinch] --> Q[Touch Gestures]
        P --> R[Zoom Functionality]
    end
    
    subgraph "Deployment"
        S[Vercel] --> T[Global CDN]
        S --> U[Automatic Deployments]
    end
    
    A --> E
    A --> I
    A --> M
    A --> P
    A --> S
    
    style A fill:#e3f2fd
    style E fill:#f1f8e9
    style I fill:#fff8e1
    style M fill:#fce4ec
    style P fill:#f3e5f5
    style S fill:#e8f5e8
```

## Implementation Phases

```mermaid
gantt
    title @Better Notes V2 Implementation Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1: Foundation
    Project Setup           :done, setup, 2025-11-05, 2d
    Sanity Configuration     :done, sanity, after setup, 2d
    Basic Structure         :done, structure, after sanity, 2d
    
    section Phase 2: Core Pages
    Header/Footer           :active, header, after structure, 2d
    Homepage               :homepage, after header, 3d
    Notes Catalog          :catalog, after homepage, 3d
    
    section Phase 3: Features
    Individual Notes       :notes, after catalog, 3d
    Image Gallery         :gallery, after notes, 2d
    Shopping Cart         :cart, after gallery, 3d
    
    section Phase 4: Integration
    Checkout & Telegram   :checkout, after cart, 2d
    Mobile Optimization   :mobile, after checkout, 3d
    Performance Tuning    :performance, after mobile, 2d
    
    section Phase 5: Launch
    Testing               :testing, after performance, 2d
    Deployment           :deploy, after testing, 1d