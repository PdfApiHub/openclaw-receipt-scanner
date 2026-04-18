---
name: receipt-scanner
description: "Scan, OCR, and digitize paper receipts. Enhance receipt photos, extract text and amounts with OCR, and convert receipts to archival black-and-white PDFs for expense tracking and record keeping. Powered by PDFAPIHub."
---

# Receipt Scanner

Scan, OCR, and digitize paper receipts. Enhance photos, extract text and amounts, and convert receipts to archival PDFs.

## Tools

| Tool | Description |
|------|-------------|
| `scan_receipt` | Scan and enhance a receipt photo at 300 DPI with sharpening |
| `ocr_receipt` | Extract all text from a receipt image using OCR |
| `extract_receipt_amounts` | Extract only numeric amounts and prices from a receipt |
| `receipt_to_pdf` | Scan a receipt and convert to a black-and-white archival PDF |

## Setup

Get your **free API key** at [https://pdfapihub.com](https://pdfapihub.com).

**Privacy note:** Receipt images you process are uploaded to PDFAPIHub's cloud service for OCR and enhancement. Files are auto-deleted after 30 days.

Configure your API key in `~/.openclaw/openclaw.json`:

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

Or use the `env` approach (OpenClaw injects it into `config.apiKey` automatically):

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

## Usage Examples

**Scan and enhance a receipt:**
> Scan this receipt photo: https://example.com/receipt.jpg

**Extract all text from a receipt:**
> Read the text from this receipt: https://example.com/receipt.jpg

**Extract just the amounts:**
> What are the amounts on this receipt? https://example.com/receipt.jpg

**Convert receipt to PDF:**
> Convert this receipt to a PDF for my expense report: https://example.com/receipt.jpg

**OCR in another language:**
> Extract text from this German receipt: https://example.com/beleg.jpg

## Documentation

Full API docs: [https://pdfapihub.com/docs](https://pdfapihub.com/docs)
