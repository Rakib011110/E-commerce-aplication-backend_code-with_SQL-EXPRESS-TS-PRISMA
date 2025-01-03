# E-commerce-aplication-backend_code-with_SQL-EXPRESS-TS-PRISMA

### **Backend Roadmap for E-Commerce Application**

#### **Step 1: Setup and Initialization**

1. **Initialize the Project:**

---

#### **Step 6: API Endpoints**

Define RESTful endpoints for each functionality. For example:

- **Authentication:** `/api/auth/login`, `/api/auth/register`
- **Admin Operations:** `/api/admin/users`, `/api/admin/categories`
- **Vendor Operations:** `/api/vendor/products`, `/api/vendor/orders`
- **Customer Operations:** `/api/customer/cart`, `/api/customer/checkout`
  Here’s a **professional representation of entities and relationships** as a text-based ER visualization, structured for clarity and use in documentation like a README file.

---

## **Entities and Relationships: Visual Representation**

### **1. User Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `email` | `String` | Unique |
| `password` | `String` | Encrypted using bcrypt |
| `role` | `ENUM` | `ADMIN`, `VENDOR`, `CUSTOMER`|
| `status` | `ENUM` | `ACTIVE`, `BLOCKED` |
| `isDeleted` | `Boolean` | Soft delete flag |
| `createdAt` | `DateTime` | Timestamp of creation |
| `updatedAt` | `DateTime` | Auto-updated on modification |

**Relationships:**

- **1-to-1:** User → Admin
- **1-to-1:** User → Vendor

---

### **2. Admin Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `name` | `String` | Admin name |
| `email` | `String` | Unique, links to User.email |
| `profilePhoto` | `String (URL)` | Optional |
| `createdAt` | `DateTime` | Timestamp of creation |
| `updatedAt` | `DateTime` | Auto-updated on modification |

**Relationships:**

- **1-to-1:** Admin → User

---

### **3. Vendor Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `shopName` | `String` | Vendor’s shop name |
| `email` | `String` | Unique, links to User.email |
| `contactNumber` | `String` | Vendor’s phone number |
| `shopLogo` | `String (URL)` | Shop logo URL |
| `createdAt` | `DateTime` | Timestamp of creation |
| `updatedAt` | `DateTime` | Auto-updated on modification |

**Relationships:**

- **1-to-1:** Vendor → User
- **1-to-Many:** Vendor → Shop

---

### **4. Shop Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `name` | `String` | Name of the shop |
| `description` | `Text` | Optional |
| `logo` | `String (URL)` | Shop logo |
| `vendorId` | `UUID` | Foreign Key, links to Vendor |
| `createdAt` | `DateTime` | Timestamp of creation |
| `updatedAt` | `DateTime` | Auto-updated on modification |

**Relationships:**

- **1-to-Many:** Shop → Product

---

### **5. Product Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `name` | `String` | Product name |
| `price` | `Decimal` | Product price |
| `categoryId` | `UUID` | Foreign Key, links to Category |
| `inventoryCount` | `Int` | Quantity in stock |
| `shopId` | `UUID` | Foreign Key, links to Shop |
| `discount` | `Decimal` | Optional |
| `createdAt` | `DateTime` | Timestamp of creation |
| `updatedAt` | `DateTime` | Auto-updated on modification |

**Relationships:**

- **Many-to-One:** Product → Shop
- **Many-to-One:** Product → Category
- **One-to-Many:** Product → Review

---

### **6. Category Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `name` | `String` | Category name |

**Relationships:**

- **1-to-Many:** Category → Product

---

### **7. Cart Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `userId` | `UUID` | Foreign Key, links to User |

**Relationships:**

- **Many-to-Many:** Cart ↔ Product

---

### **8. Order Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `userId` | `UUID` | Foreign Key, links to User |
| `totalAmount` | `Decimal` | Total cost of the order |
| `status` | `ENUM` | `PENDING`, `COMPLETED`, `CANCELED` |
| `createdAt` | `DateTime` | Timestamp of creation |
| `updatedAt` | `DateTime` | Auto-updated on modification |

**Relationships:**

- **1-to-Many:** Order → OrderItem

---

### **9. OrderItem Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `orderId` | `UUID` | Foreign Key, links to Order |
| `productId` | `UUID` | Foreign Key, links to Product |
| `quantity` | `Int` | Quantity ordered |

**Relationships:**

- **Many-to-One:** OrderItem → Order
- **Many-to-One:** OrderItem → Product

---

### **10. Review Table**

**Fields:**  
| **Field** | **Type** | **Notes** |
|-------------------|-----------------|------------------------------|
| `id` | `UUID` | Primary Key |
| `productId` | `UUID` | Foreign Key, links to Product |
| `userId` | `UUID` | Foreign Key, links to User |
| `rating` | `Float` | Rating score (e.g., 4.5) |
| `comment` | `Text` | Optional review comment |

**Relationships:**

- **Many-to-One:** Review → Product
- **Many-to-One:** Review → User

---

### **Summary of Relationships**

- **One-to-One:** `User → Admin`, `User → Vendor`
- **One-to-Many:** `Vendor → Shop`, `Shop → Product`, `Order → OrderItem`, `Product → Review`
- **Many-to-Many:** `Cart ↔ Product`

---

For a **README.md**, you can use Markdown tables to represent the models and their fields. Arrows indicating relationships can be described in plain text or depicted using ASCII art. Here's how you can structure it:

### Example Markdown Table for Models

### Relationships

- User ↔ Admin : One-to-One
- User ↔ Vendor : One-to-One
- User ↔ Customer : One-to-One
- Vendor ↔ Shop : One-to-One
- Shop ↔ Product : One-to-Many
- Customer ↔ Shop : Many-to-Many (Followers)
- Product ↔ Review : One-to-Many

### ASCII Diagram for Relationships

```

User
├── Admin
├── Vendor ──┬── Shop ──┬── Product ──┬── Review
└── Customer │ └── Followers └── Images
├── Cart ──┬── CartItem
└── Order ─┬── OrderItem

```

```

```
