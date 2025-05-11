# PRISM Crosswalk

**PRISM (Player Record Identity Standard Mapping)** provides a registry of player identity mappings across major sports data providers. It aims to standardize the messy, inconsistent world of player identity across sports and data providers. By maintaining a clean core dataset, we enable better interoperability for developers, researchers, and sports data enthusiasts. By using automation and strict validation, we can provide timely updates to player data.

prism-crosswalk is a minimal, curated dataset that provides stable identifier mappings to reliably link baseball players across multiple data sources. It's intented as a starting point for aggregating data and adding additional player metadata.

Learn more about the full PRISM ecosystem (including the richer roster dataset and tooling for the data repos) at [prism-tools](https://github.com/statsvine/prism-tools).

## Overview
This repository mixes the raw player mapping data from [prism-crosswalk-data](https://github.com/statsvine/prism-crosswalk-data) into a variety of consumable data formats. It's intended to be the foundational dataset for player identity mappings, acting as the source of truth for standardized player IDs across various sports data sources.

### Philosophy
- **Flexible** – Produces JSON, CSV, NDJSON, minified variants, and others for flexible consumption.
- **Stable schema**: The schema (including file and directory structure) should remain stable over time, with changes only made when absolutely necessary. This ensures consistent mappings and minimal disruption to downstream systems.
- **Downstream Friendly** – Designed for integration into tools, pipelines, and workflows that require stable ID mapping.
- **Automated Builds** – Uses scripts and GitHub Actions to generate exports reliably and consistently.
- **Minimal by Design** – Outputs include only identifiers and basic structure — no stats, no metadata enrichment. 
- **Single Source of Truth** - Intended to consume only [prism-crosswalk-data](https://github.com/statsvine/prism-crosswalk-data).
- **Separation of Concerns** – Keeps raw data and build artifacts in distinct repos to simplify maintenance.

### Who this is for
If you already have detailed player metadata and are dealing with player identity mismatches across sources:

- **Data Engineers** needing consistent player IDs for their pipelines.
- **Sports Data Enthusiasts** cross-referencing player data.
- **API Builders** integrating player identity mappings into their APIs.
- **Researchers** analyzing player data across sources.
- **App Developers** building sports apps that require consistent player identifiers.

### Who this isn't for
- This repo is a relatively low-level dataset focused on player identity mapping, and is generally used as a starting point for merging and reconciling data from different sources. If you need more detailed player data, we suggest using prism-registry instead, which has richer metadata.
- Historical data is limited: As of now, PRISM primarily focuses on active players and does not provide extensive historical player data.

## Repo Structure & Dataset Types
This repository provides both comprehensive and minimal datasets to support a variety of downstream use cases. All exports are found in the `exports/` directory and follow a consistent naming convention.

### Dataset Types
#### `full` datasets
- **Description**: Mapping records that include some identifying metadata such as names and birthdates.
- **Use Case**: Useful for human inspection, quality control, and merging records across sources.
- **Note**: This metadata is not normalized or authoritative — it is provided for context only and may vary by source.

#### `ids` datasets (preferred)
- **Description**: Minimalist mapping between known player identifiers (e.g., `mlbam`, `retro`, `fg`, `bbref`, etc.).
- **Use Case**: Optimized for fast lookups and merging datasources in pipelines or sheets. This is the recommended format for production use.

### `by_id` JSON Files
For both dataset types (`full` and `ids`), we also provide **`by_id`** variants in JSON format:

- **Description**: Instead of a list of player objects, these files are JSON key-value maps where the key is an identifier from a specific source (e.g., MLBAM ID), and the value is the full player object.
- **Use Case**: Ideal for consumers needing to map a single identifier (like an MLB ID) to all available identifiers or metadata.

#### Example:
- `by_id/players.fg_id.json`  
  - Keyed by **FanGraphs ID** → maps to all known IDs for that player.

This structure enables simple and performant lookups from any known identifier namespace.

## File Formats
The `prism-crosswalk` repository provides several output formats tailored for different use cases and consumers. All formats are automatically generated from the canonical `prism-crosswalk-data` dataset.

### `.csv`
- **Description**: Flat CSV file with one row per player and columns for each supported ID type.
- **Use Case**: Ideal for Google Sheets/Excel users, manual inspection, and systems expecting tabular data.

### `.json`
- **Description**: Full JSON array containing one object per player, with all known identifiers as key-value pairs.
- **Use Case**: Suitable for both human use and applications expecting structured, readable JSON with full context.

### `.min.json`
- **Description**: Minified version of `.json` with whitespace removed.
- **Use Case**: Optimized for bandwidth-sensitive environments, deployments, or client-side usage.

### `.ndjson`
- **Description**: Newline-delimited JSON, where each line is a standalone player record.
- **Use Case**: Useful for streaming pipelines, command-line tools (`jq`, etc.), and systems ingesting JSON line-by-line.

### `.gz` Variants
- All of the above formats are also available as `.gz`-compressed versions (e.g., `players.csv.gz`, `players.min.json.gz`).
- Reduces file transfer size significantly, especially useful for automation or API consumers.

All formats are rebuilt automatically and are guaranteed to reflect the latest `main` branch of the source data repository.

## Attribution
The contents of this repository are built entirely from the canonical dataset in [`prism-crosswalk-data`](https://github.com/your-org/prism-crosswalk-data). That repository serves as the source of truth for player ID mappings.

All identifier data originates from public or open-access sources and is compiled manually or through automation into a consistent cross-reference structure. We aim to attribute individual data sources where possible within the [`prism-crosswalk-data`](https://github.com/your-org/prism-crosswalk-data) README and accompanying documentation.

If you use this data, we encourage you to credit the original sources listed in the data repo and cite [`prism-crosswalk`](https://github.com/your-org/prism-crosswalk).

PRISM Crosswalk stands on the shoulders of giants and builds on open community data projects, including:

- MLB: 
    - [Chadwick Bureau / Register](https://github.com/chadwickbureau/register) (Open Data Commons Attribution License)
    - [SmartFantasyBaseball's Player ID Map](https://www.smartfantasybaseball.com/tools/)

We thank these projects for providing foundational sports research resources.

## License
- Data and schemas in this repo are licensed under the [Open Data Commons Attribution License (ODC-By 1.0)](https://opendatacommons.org/licenses/by/1-0/).

## Contributing

Pull requests are welcome!

### We especially welcome:
- Validation improvements.
- Improvements to build process.
- Suggestions for new output formats.

### Pull Requests Likely to Be Rejected:
- **Schema changes**: Changing schemas, including file paths and names, is disruptive to downstream consumers and changes are very carefully considered for impact.
- **Data changes**: This repo uses [prism-crosswalk-data](https://github.com/statsvine/prism-crosswalk-data) as a primary data source. Any errors, corrections, or data changes should be made in that repository.
- **Tooling changes**: This repo uses [prism-tools](https://github.com/statsvine/prism-tools) to generate output. Any issues, bugs or improvements to code should likely be made in that repository.

When in doubt, open an issue to discuss your proposed change before submitting a PR.