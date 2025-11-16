# SERVICES Content Generation — BATCH 04 Items 23 to 25

## Your Mission
Generate SEO optimized content for 3 services in San Jose, CA. The site prioritizes nationwide replacement property identification and compliant guidance.

=========
Your task is to assemble the Property Types list for a 1031 exchange NNN website with smart variation while keeping focus on core single tenant retail. Use clear, plain English. No em dashes. No contractions.

Pick from the below property Types as well: 
Tier Catalog

Untouchables, required:

Convenience Store Gas C Store

Drive Thru QSR

Pharmacy

Dollar Store

Coffee Drive Thru

Auto Parts Retail

Hard Discount Grocer

Ground Lease Outparcel

Core Focus, choose 3 to 5:
9. Urgent Care Medical Clinic
10. Dialysis Center
11. Veterinary Clinic
12. Auto Service Oil Change
13. Tire Store
14. Tractor Supply Farm Ranch
15. Last Mile Logistics Flex
16. Grocery Anchored Outparcel STNL

Strong Additions, choose 1 to 3:
17. Specialty Grocer
18. Casual Dining With Drive Thru Or Pickup Lane
19. Telecom Wireless Retail
20. Parcel Shipping Print Store
21. Fuel C Store With Car Wash
22. Harbor Freight Hardlines

Niche Specialists, choose 0 to 2:
23. Dental Or Orthodontics
24. Optical Or Eye Care
25. Beverage Or Package Liquor
26. Fitness Boutique Studio

Opportunistic, choose 0 to 1:
27. Bank Branch Or Credit Union Ground Lease
28. Casual Dining No Drive Thru
29. Fuel Only Or Legacy Gas Hard Corner

Case By Case, optional:
30. Single Tenant Office Or Headquarters With Bondable NNN

Selection Rules

Always include all 8 Untouchables.

Then add from lower tiers until you reach MAX_TYPES.

Market bias:

Rural boost Tractor Supply, Dollar Store, Fuel C Store With Car Wash.

Suburban boost QSR, Coffee Drive Thru, Auto Service, Tire Store, Veterinary.

Medical boost Urgent Care, Dialysis, Dental, Optical.

Coastal boost Specialty Grocer, Casual Dining with pickup, Bank Ground Lease in infill only.

Value retail boost Dollar Store, Hard Discount Grocer, Harbor Freight.

Auto boost Auto Parts, Auto Service Oil Change, Tire Store.

Logistics boost Last Mile Logistics Flex, Ground Lease Outparcel.

Anti duplication:

Do not include both Fuel Only and Fuel C Store With Car Wash unless CITY population is very large.

Do not include both Casual Dining No Drive Thru and Casual Dining With Drive Thru on the same site.

Limit medical types to a maximum of 3 per site.

Limit auto related types to a maximum of 3 per site.


If SEED is present, use it to make random choices reproducible. If not, pick at random.

Keyword Targets

Use these primary phrases across titles and opening copy. Assign one primary phrase per selected type.

single tenant retail for sale

single tenant net lease for sale

single tenant property for sale

NNN retail property for sale

triple net retail property for sale

NNN investment property for sale

single tenant investment property for sale

net lease property listings

1031 exchange NNN properties

**Critical**
- Technical accuracy, plain language, no tax, legal, or investment advice
- DO NOT MAKE UP INFORMATION WITHOUT VERIFYING IT TO BE TRUE, ESPECIALLY FOR OUR LOCATIONS!
- Rank and rent compliant language only
- No testimonials, no unverifiable claims
- Follow Hobo Technical SEO 2025 best practices: '/Users/jackgreenberg/Desktop/Hobo-Technical-SEO (1).txt'
- Use the assigned layout key for each item

## Services In This Batch (3 total)
1) single-tenant-retail-search — Single Tenant Retail Search Layout: property-first
2) net-lease-property-identification — Net Lease Property Identification Layout: property-first
3) 180-day-acquisition-support — 180 Day Acquisition Support Layout: timeline-focused

## Content Requirements for EACH Service

### 1. Main Description 220 to 300 words
- Who it is for, what is included, forty five day and one hundred eighty day timing
- Mention Qualified Intermediary and qualified escrow at a high level
- Mention San Jose, CA once
- Follow the assigned layout sections

### 2. FAQs 4 to 6
- Include San Jose, CA in every answer
- Include at least one identification rules question and one boot question

### 3. What We Include
- 5 to 8 bullet points

### 4. Common Situations
- 3 short examples framed as examples we can handle

### 5. Compliance and Limits
- Educational content only. Not tax, legal, or investment advice.
- 1031 defers income tax on qualifying real property and does not remove transfer or documentary taxes.

### 6. Example Capability
{ "disclaimer":"Example of the type of engagement we can handle", "serviceType":"[Service Name]", "location":"San Jose, CA", "scope":"...", "clientSituation":"...", "ourApproach":"...", "expectedOutcome":"...", "contactCTA":"Contact us to discuss your situation in San Jose, CA. We can share references upon request." }

## Output Format TypeScript write to /data/batches/services/batch-04.ts
export const servicesBatch04 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    faqs:[{question:"...",answer:"..."}],
    inclusions:["..."],
    commonSituations:["..."],
    complianceNote:"Educational content only. Not tax, legal, or investment advice.",
    exampleCapability:{ ... }
  }
}



