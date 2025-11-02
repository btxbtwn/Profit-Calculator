# Profit Calculator - User Guide

## Overview

The **Profit Calculator** is a tool designed to help you optimize pricing across multiple resale platforms (Etsy, eBay, Depop, Poshmark, and Mercari). It calculates the exact prices you need to list items at to achieve your target profit, while accounting for each platform's unique fee structure.

## How It Works

### The Core Logic

The calculator uses this fundamental formula:

```
Required Price = (Target Profit + COGS + Material + Shipping*) / (1 - Total Fees) + Flat Fee
List Price = Required Price × (1 + Markup%)
```

*Shipping is only included if the seller pays for it on that platform.

**Then it calculates:**
```
Net Profit = List Price - Fees - Shipping* - COGS - Material
```

This ensures that no matter which platform you sell on, if you list at the calculated price, you'll hit your target profit after all costs and fees.

---

## Input Parameters Section

### Cost of Goods (COGS)
The amount you paid to purchase the item. This is your base cost before any preparation.

**Example:** You buy a used jacket for $1.25

### Material Cost
The cost of packaging materials needed to ship the item safely.

**Example:** Poly mailer ($0.30) + thermal label ($0.40) + paper ($0.25) = $0.95

### Shipping Cost (Seller)
The cost you pay to ship the item. This is what **you** pay out of pocket.

**Example:** USPS Priority Mail costs $6.00

### Average Sold Comps ⭐ NEW
Enter the average price similar items are **currently selling for** on your chosen platform. When you enter this value:
- The app automatically calculates your Target Profit
- The Target Profit field becomes **grayed out** (disabled)
- Formula: `Target Profit = Average Sold Comps - COGS - Material - Shipping Cost`

**Why use this?**
Instead of guessing a target profit, let the market tell you. If similar items sell for $20 and your costs are $8, then $12 is available for profit.

**Example:** If comps are selling for $20:
```
$20 - $1.25 - $0.95 - $6.00 = $11.80 target profit
```

### Target Profit
Your desired profit per sale. This becomes **active only when Average Sold Comps is empty**.

**Example:** You want to make $5.00 per item sold

*If you use Average Sold Comps, this field will be auto-calculated and disabled.*

### Markup Percentage
A buffer percentage above the required price. This gives you room for:
- Sales and discounts
- Offers customers might make
- Price competitiveness

**Example:** 50% markup means if required price is $10, you list at $15.

**Why?** If someone offers 25% off, you still hit your target profit. Plus it leaves room for automatic offers.

---

## Pricing Results Section

This table shows what you need to list your item at on each platform to achieve your target profit.

### Columns Explained

| Column | Meaning |
|--------|---------|
| **Platform** | Etsy, eBay, Depop, Poshmark, Mercari |
| **Required Price** | Minimum price needed to hit your target profit (before markup) |
| **List (Markup)** | What you actually list at (Required Price × Markup) |
| **Fees @ List** | Total platform fees at your list price |
| **Net Profit @ List** | Your profit after all costs and fees |
| **Assumptions** | Whether seller pays shipping + default rounding |

### Color Coding

- 🟢 **Green**: You'll hit or exceed your target profit
- 🟠 **Orange/Yellow**: You'll fall short of your target profit

---

## Platform Fee Table

This shows the fee structure for each platform. You can edit any value to see how fee changes impact your pricing.

### Editable Columns

| Column | What It Controls |
|--------|------------------|
| **Fee %** | Percentage commission the platform takes |
| **Promo %** | Promotional/advertisement fees |
| **Flat Fee $** | Fixed fee per transaction |
| **Seller Pays Ship?** | Does the seller cover shipping costs? |
| **Default Rounding** | .99 (like $9.99) or whole dollars (like $10) |

### How to Edit

1. **Click any cell** to edit directly
2. **Use arrow buttons** (▲▼) to increase/decrease by small increments
3. **Use dropdowns** for Yes/No selections and rounding preference
4. **Changes apply instantly** - watch the pricing results update in real-time

### Platform Defaults

| Platform | Fee % | Promo % | Flat Fee | Seller Pays Ship? | Rounding |
|----------|-------|---------|----------|-------------------|----------|
| Etsy | 9.5% | 0% | $0.45 | Yes | .99 |
| eBay | 13.6% | 12% | $0.30 | Yes | .99 |
| Depop | 3.3% | 8% | $0.45 | No | Whole |
| Poshmark | 20%* | 0% | $2.95* | No | Whole |
| Mercari | 10% | 0% | $0 | No | Whole |

*Poshmark: $2.95 flat fee if under $15, then 20% over $15

---

## Practical Example

Let's walk through a complete scenario:

### Your Item
- **What:** Lightly used designer shirt
- **Purchase Price (COGS):** $1.25
- **Packaging (Material):** $0.95
- **Shipping Cost:** $6.00

### Market Research
- **Average Sold Comps:** $18.00

### Setup
1. Enter COGS: $1.25
2. Enter Material: $0.95
3. Enter Shipping: $6.00
4. Enter Average Sold Comps: $18.00 ← This auto-calculates target
5. Set Markup: 50%

### Results
- Target Profit auto-calculated: **$9.80**
- Required Price: ~$11.80
- With 50% markup, you list at: ~$17.70

### At This Price
- **Etsy**: List $17.99 → Profit $9.60 ✓ (hits target)
- **eBay**: List $17.99 → Profit $8.90 (slightly below due to higher fees)
- **Depop**: List $18 → Profit $10.20 ✓ (hits target easily)

---

## Key Takeaways

✅ **Use Average Sold Comps** to automatically calculate realistic profit targets based on market prices

✅ **Adjust Markup** to balance profit with competitiveness (50% is a good starting point)

✅ **Different platforms = Different prices** because each has unique fee structures

✅ **Edit platform fees** if they change or if your account has different tier pricing

✅ **Watch the color coding** - orange means you need to adjust markup or your costs are too high

✅ **Real-time updates** - see results instantly as you change any value

---

## Tips for Success

1. **Research Comps Thoroughly** - Check 5-10 similar listings across your chosen platform to get an accurate average
2. **Factor in Shipping Correctly** - Use actual costs, not estimates
3. **Use Markup Wisely** - Higher markup gives more cushion, but prices should still be competitive
4. **Monitor Platform Fees** - Fees change; update them here when they do
5. **Test Different Scenarios** - Try different markup percentages to see the impact
6. **Round Strategically** - .99 pricing often performs better, but whole dollars are cleaner

---

## Theme Toggle

Click the **theme toggle button** (top right) to switch between:
- 🌙 **Dark Mode** (default) - Easy on the eyes
- ☀️ **Light Mode** - High contrast

Your preference is stored while using the app.

---

## Troubleshooting

**Q: Why is my profit orange instead of green?**
A: Your list price isn't high enough to hit your target profit given the platform's fees. Either increase markup, lower costs, or accept a lower profit target.

**Q: Why are prices different on each platform?**
A: Each platform charges different fees and has different shipping policies. Higher-fee platforms need higher list prices to achieve the same profit.

**Q: Can I edit platform fees?**
A: Yes! Click any cell in the Platform Fee Table. This is useful if your fees are tier-based or if they change.

**Q: What if I want to override Average Sold Comps?**
A: Just clear the Average Sold Comps field - the Target Profit field will become active again and you can set it manually.

---

## Formulas Reference

For those interested in the math behind the scenes:

```
Profit = Sale Price - Fees - COGS - Material - Shipping Cost

For generic platforms:
Required Price = (Profit + COGS + Material + Shipping) / (1 - Fee% - Promo%) + Flat Fee

For Poshmark (special logic):
If < $15: Required = Profit + COGS + Material + $2.95
If ≥ $15: Required = (Profit + COGS + Material) / (1 - 0.20)

List Price = Required Price × (1 + Markup%)

Applied rounding: .99 pricing or whole dollars based on platform defaults
```

---

**Last Updated:** November 2025  
**Version:** 1.0 with Average Sold Comps feature