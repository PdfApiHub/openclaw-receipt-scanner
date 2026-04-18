# Receipt Scanner — OpenClaw Plugin

Scan, OCR, and digitize paper receipts using the [PDFAPIHub](https://pdfapihub.com) API. This OpenClaw plugin gives your AI agent the ability to enhance receipt photos, extract text and amounts via OCR, and convert receipts to archival PDFs.

## What It Does

Turn paper receipt photos into clean digital records. Enhance image quality, extract text and amounts with OCR, and produce archival-quality PDFs — all optimized for receipt processing workflows.

### Features

- **Receipt Enhancement** — Sharpen and improve contrast at 300 DPI for clear, readable receipts
- **Full OCR** — Extract all text: store name, items, prices, tax, totals, date, payment method
- **Amount Extraction** — Pull just the numbers: prices, totals, tax amounts, percentages
- **PDF Conversion** — Convert receipt photos to black-and-white archival PDFs
- **Multi-Language** — OCR supports English, German, French, Spanish, and many more
- **Grayscale Processing** — Automatic grayscale and sharpening for best OCR accuracy
- **Flexible Input** — Accept image URLs or base64-encoded images

## Tools

| Tool | Description |
|------|-------------|
| `scan_receipt` | Scan and enhance a receipt photo at 300 DPI |
| `ocr_receipt` | Extract all text from a receipt via OCR |
| `extract_receipt_amounts` | Extract only numeric amounts and prices |
| `receipt_to_pdf` | Convert receipt to a black-and-white archival PDF |

## Installation

```bash
openclaw plugins install clawhub:receipt-scanner
```

## Configuration

**Privacy note:** Receipt images are uploaded to PDFAPIHub's cloud service for OCR and enhancement. Files are auto-deleted after 30 days.

```json
{
  "plugins": {
    "entries": {
      "receipt-scanner": {
        "enabled": true,
        "apiKey": "your-api-key-here"
      }
    }
  }
}
```

Or use the `env` approach:

```json
{
  "plugins": {
    "entries": {
      "receipt-scanner": {
        "enabled": true,
        "env": {
          "PDFAPIHUB_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

Get your **free API key** at [https://pdfapihub.com](https://pdfapihub.com).

## Usage Examples

Just ask your OpenClaw agent:

- *"Scan this receipt: https://example.com/receipt.jpg"*
- *"What does this receipt say? Extract all text"*
- *"What are the amounts on this receipt?"*
- *"Convert this receipt to a PDF for my expense report"*
- *"Read the text from this German receipt"*

## Use Cases

- **Expense Tracking** — Digitize receipts for expense reports and reimbursements
- **Bookkeeping** — Extract amounts from receipts for accounting and bookkeeping
- **Tax Documentation** — Scan and archive receipts for tax filing purposes
- **Travel Expenses** — Process hotel, meal, and transport receipts while traveling
- **Small Business** — Digitize paper receipts for small business record keeping
- **Personal Finance** — Track spending by scanning and OCR-ing purchase receipts

## API Documentation

Full API docs: [https://pdfapihub.com/docs](https://pdfapihub.com/docs)

## License

MIT
