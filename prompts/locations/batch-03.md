# LOCATIONS Content Generation — BATCH 03 Items 15 to 20

## Your Mission
Generate SEO optimized content for 6 locations near San Jose, CA that help users find replacement properties nationwide.

**Critical**
- No boilerplate
- Include San Jose, CA once in each body
- Rank and rent compliant language only
- Emphasize nationwide property identification support
- Use the assigned layout key

## Research Requirements
1) Search "[Location] [STATE] population 2024 2025"
2) Search "[Location] [STATE] major employers industries"
3) Search "[Location] [STATE] neighborhoods business districts"
4) Confirm map location and radius

## Locations In This Batch (6 total)
1) redwood-city — Redwood City, CA Layout: property-focused
2) menlo-park — Menlo Park, CA Layout: neighborhood-guide
3) foster-city — Foster City, CA Layout: comparison-grid
4) san-mateo — San Mateo, CA Layout: executive-summary
5) burlingame — Burlingame, CA Layout: map-first
6) remote — Remote Layout: market-overview

## Content Requirements for EACH Location

### 1. Main Description 180 to 260 words
- Local exchange drivers, asset types, any transfer or documentary tax notes
- One reference to San Jose, CA
- Mention national identification support
- Follow the assigned layout sections

### 2. Popular Paths rank 1 to 6
- Order services or property types with 2 to 3 sentence rationale each

### 3. FAQs 4 items
- Include the location and state abbreviation in each answer

### 4. Example Capability
{ "disclaimer":"Example of the type of engagement we can handle", "location":"[Location, STATE]", "situation":"...", "ourApproach":"...", "expectedOutcome":"..." }

## Output Format TypeScript write to /data/batches/locations/batch-03.ts
export const locationsBatch03 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    popularPaths:[{rank:1,type:"service or propertyType",slug:"...",name:"...",whyPopular:"..."}],
    faqs:[{question:"...",answer:"..."}],
    exampleCapability:{ ... }
  }
}


