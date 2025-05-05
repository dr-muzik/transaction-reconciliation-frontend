## Project Desc:

Building a backend service and a simple frontend interface to reconcile and
report discrepancies in financial transaction records between two systems: SourceSystemA
and SourceSystemB. Each system provides daily CSV files (potentially with 1 million+ rows)
that list transaction IDs, timestamps, amounts, currencies, and status (e.g., SUCCESS,
FAILED).

## Goals:

1. Load and parse both files efficiently.
2. Detect and return:
   ○ Transactions present in A but missing in B (and vice versa)
   ○ Amount mismatches
   ○ Status mismatches
3. Expose the results via a REST API.
4. Build a simple dashboard that allows uploading the CSVs and viewing a summary report.

## Expected Deliverables:

● Frontend (React/Next.js or Vue.js) to upload CSVs and display results
● README with setup instructions

## Evaluation Criteria:

● Efficiency and memory use when handling large files
● Clean RESTful architecture and code structure
● UI/UX of the dashboard
● Error handling and validations

## Bonus:

● Implement pagination or virtual scrolling for results
● Use Web Workers or threading to handle large file parsing in the frontend
