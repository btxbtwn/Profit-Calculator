# Resale Pricing Calculator - User Guide & Technical Documentation

## Overview

The Resale Pricing Calculator is a dynamic web application designed to help clothing resellers optimize pricing strategies across multiple online marketplaces. It calculates the minimum list price required to achieve your target profit after accounting for platform fees, promotional discounts, and all your business costs.

**Key Feature:** Enter your costs once, and instantly see the required price on every marketplace automatically adjusting for platform-specific fee structures, rounding rules, and shipping policies.

---

## How to Use the App

### Step 1: Enter Your Costs

Fill in the **Input Parameters** section at the top of the app:

| Field | Description | Example |
|-------|-------------|---------|
| **Cost of Goods (COGS)** | What you paid for the item | $5.00 |
| **Material Cost** | Packaging materials (poly mailer, label, sheet) | $0.15 |
| **Shipping Cost (seller)** | What you pay to ship the item | $6.00 |
| **Target Profit** | Your desired profit per sale | $5.00 |
| **Markup Percentage (%)** | Optional: Apply a percentage markup to COGS | 50% |

**Note:** You only need to fill in either **Target Profit** OR **Markup Percentage**, not both. If you enter a markup percentage, the target profit will be calculated automatically.

### Step 2: Choose Your Platform

Select which marketplace you want to analyze from the dropdown:
- **Etsy** - 9.5% + promotional fee + $0.45 flat fee
- **eBay** - 13.6% + 12% promotional fee + $0.30 flat fee
- **Depop** - 3.3% + 8% promotional fee + $0.45 flat fee
- **Poshmark** - 20% fee (tiered: $2.95 flat under $15, then 20% above)
- **Mercari** - 10% fee, no flat fee

### Step 3: Review Results

The **Pricing Results** table shows you:

| Column | Meaning |
|--------|---------|
| **Required Price** | Minimum list price to hit your target profit (BEFORE rounding) |
| **List (Markup)** | The actual price to list (after rounding to platform defaults) |
| **Fees @ List** | Total fees charged by the platform at your listed price |
| **Net Profit @ List** | Your actual profit after all costs and fees |

### Step 4: Edit & Compare

- **Click any cell** in the Pricing Results table to edit platform fee structures, promotional rates, or rounding preferences
- **Changes update instantly** across all calculations
- Use arrow buttons (↑/↓) to adjust values by 0.1% increments
- Platform assumptions are listed in the rightmost column

### Step 5: Copy & Paste Strategy

Once you've found your optimal prices:
1. Note the **List (Markup)** prices for each platform
2. Use these values when creating listings on each marketplace
3. Apply your auto-offer strategies in Vendoo (e.g., 25% offers on top of these prices)

---

## The Formulas: Deep Dive

### 1. Understanding Your Costs

Your **Total Cost Base** consists of:

```
Total Cost Base = COGS + Material Cost + Shipping Cost (if seller pays)
```

This is the absolute minimum you need to recover before making profit.

**Shipping Note:** 
- If you select a platform where the **seller pays shipping**, the shipping cost is included in your cost base
- If the **buyer pays shipping** (Depop, Poshmark, Mercari), shipping cost is NOT included in the required price calculation, but you should still account for it in your profit planning

### 2. Generic Platform Formula

For most platforms (Etsy, eBay, Depop, Mercari), the required price is calculated as:

```
Required Price = (Total Cost Base + Flat Fee) / (1 - Fee% - Promo%)
```

**Where:**
- **Fee%** = Platform's transaction fee percentage (e.g., eBay = 0.136)
- **Promo%** = Promotional/advertising fee percentage (e.g., eBay = 0.12)
- **Flat Fee** = Fixed dollar fee per sale (e.g., Etsy = $0.45)
- **Total Cost Base** = COGS + Material + (Shipping if applicable)

**Example (eBay):**
```
Required Price = ($5.00 + $0.15 + $6.00 + $0.30) / (1 - 0.136 - 0.12)
               = $11.45 / 0.744
               = $15.39
→ Rounded to .99 rounding: $15.99
```

### 3. Poshmark Special Formula

Poshmark has a **tiered fee structure** that requires special handling:

- **Under $15:** Flat $2.95 fee
- **$15 and above:** 20% fee

The calculator tests BOTH pricing scenarios:

**Scenario A (Flat $2.95 fee):**
```
Scenario A = (Total Cost Base + $2.95)
           = ($5.00 + $0.15 + $2.95)
           = $8.10
→ Rounded to whole dollar: $9.00
→ Valid if $9.00 < $15 ✓
```

**Scenario B (20% fee):**
```
Scenario B = (Total Cost Base) / (1 - 0.20)
           = ($5.00 + $0.15) / 0.80
           = $5.15 / 0.80
           = $6.44
→ Rounded to whole dollar: $7.00
→ Valid if $7.00 ≥ $15? ✗
```

**Decision Logic:**
- If both scenarios are valid: Choose the **minimum price** (better for customer)
- If only one is valid: Use that scenario
- If neither is valid: Use the 20% fee scenario as fallback

### 4. Rounding Rules

Different platforms have different rounding conventions:

**`.99 Rounding` (Etsy, eBay):**
```
Round up to nearest X.99
Example: $15.39 → $15.99
         $15.01 → $15.99
         $14.99 → $14.99 (already ends in .99)
```

**`Whole Dollar Rounding` (Depop, Poshmark, Mercari):**
```
Round up to nearest whole dollar
Example: $15.39 → $16.00
         $15.01 → $16.00
         $15.00 → $15.00 (already whole)
```

### 5. Profit Calculation

Your actual **Net Profit @ List** is calculated as:

```
Net Profit = List Price - Total Cost Base - Fees @ List
```

**Where:**
- **List Price** = Your actual listed price (after rounding)
- **Total Cost Base** = COGS + Material + Shipping (if applicable)
- **Fees @ List** = Platform fees calculated on your list price

**Example (eBay at $15.99):**
```
Fees @ List = $15.99 × (0.136 + 0.12) + $0.30
            = $15.99 × 0.256 + $0.30
            = $4.09 + $0.30
            = $4.39

Net Profit = $15.99 - $5.00 - $0.15 - $6.00 - $4.39
           = $0.45
```

### 6. Markup Percentage Logic

If you enter a **Markup Percentage** instead of a target profit:

```
Target Profit = COGS × (Markup % / 100)
```

**Example (50% markup):**
```
Target Profit = $5.00 × 0.50 = $2.50
```

This target profit is then fed into your cost base for the required price calculation.

---

## Platform Fee Breakdown

### Etsy
- **Fee:** 9.5% transaction fee + $0.45 flat fee
- **Promotional:** 0% (no separate promo fee)
- **Shipping:** Seller pays
- **Rounding:** .99
- **Formula:** `(Cost + $0.45) / (1 - 0.095) = Required Price`

### eBay
- **Fee:** 13.6% final value fee + 12% promotional fee + $0.30 flat fee
- **Shipping:** Seller pays
- **Rounding:** .99
- **Formula:** `(Cost + $0.30) / (1 - 0.136 - 0.12) = Required Price`
- **Total Platform Take:** Up to 25.6% + flat fees

### Depop
- **Fee:** 3.3% transaction fee + 8% promotional fee + $0.45 flat fee
- **Shipping:** Buyer pays (doesn't factor into pricing)
- **Rounding:** Whole dollar
- **Formula:** `(Cost + $0.45) / (1 - 0.033 - 0.08) = Required Price`

### Poshmark
- **Fee:** Tiered - $2.95 flat (under $15) OR 20% (at or above $15)
- **Shipping:** Buyer pays (doesn't factor into pricing)
- **Rounding:** Whole dollar
- **Formula:** Two scenarios tested, minimum valid price chosen

### Mercari
- **Fee:** 10% transaction fee, no flat fee
- **Shipping:** Buyer pays (doesn't factor into pricing)
- **Rounding:** Whole dollar
- **Formula:** `Cost / (1 - 0.10) = Required Price`

---

## Advanced Features

### Editing Fee Structures

Want to test different fee rates or prepare for promotional periods?

1. Click any cell in the **Pricing Results** table (Platform, Fee %, Promo %, Flat Fee $, Rounding)
2. Enter the new value
3. Press Enter to save
4. All calculations update automatically
5. Use ↑/↓ arrow buttons to increment/decrement by 0.1%

This is useful for:
- Testing seasonal promotions
- Comparing against new fee structures
- Planning for fee increases
- Analyzing competitor pricing strategies

### Light/Dark Mode

Toggle between light and dark themes using the theme button in the top-right corner. Your preference is saved automatically.

---

## Real-World Workflow Example

**You found a bulk lot of clothing with average COGS of $3.00 per item:**

### Step 1: Set Your Costs
- COGS: $3.00
- Material Cost: $0.15 (poly mailer, label, sheet)
- Shipping Cost: $6.00 (average USPS Priority Mail)
- Target Profit: $3.00 (20% margin on total costs)

### Step 2: View All Platforms
- Etsy: List at $12.99
- eBay: List at $12.99
- Depop: List at $10.00
- Poshmark: List at $8.00
- Mercari: List at $10.00

### Step 3: Set Up Vendoo Auto-Offers
Using a 50% markup strategy with 25% auto-offer room:
- Etsy: List $12.99, accept offers down to $9.74 (25% off)
- eBay: List $12.99, accept offers down to $9.74
- Depop: List $10.00, accept offers down to $7.50
- Poshmark: List $8.00, accept offers down to $6.00
- Mercari: List $10.00, accept offers down to $7.50

### Step 4: Monitor & Adjust
- Track which platforms sell fastest at your list prices
- Lower prices on slow-selling platforms
- Increase prices on hot items with multiple watchers
- Use the calculator to ensure profitability at any adjusted price

---

## Troubleshooting

**Q: Why is my profit sometimes $0 or negative?**
A: This means your target profit is too high for that platform's fees. Lower your target profit or increase your list price using the rounding rules.

**Q: Why do I see different required prices across platforms?**
A: Platform fee structures are different. Poshmark and Mercari have lower buyer-paid shipping, so listing prices can be lower while maintaining the same profit.

**Q: What if I want to use a different shipping cost for different items?**
A: Update the shipping cost field for each item category and recalculate. The app recalculates instantly.

**Q: Should I always use the List (Markup) price?**
A: Not necessarily. You can list higher to account for negotiation on platforms that allow offers (Mercari, Poshmark). The List (Markup) is the minimum to hit your target profit.

---

## Technical Notes

- All calculations are performed in real-time using JavaScript
- Fees are calculated with decimal precision; prices are rounded per platform conventions
- Theme preference is stored in browser local storage
- Fully responsive design works on mobile, tablet, and desktop
- No data is sent to external servers; all processing happens in your browser

---

## Support & Updates

This calculator is designed for resellers using Vendoo to manage multi-platform listings. Updates and improvements are made regularly based on marketplace fee changes and user feedback.

**Last Updated:** November 2025
