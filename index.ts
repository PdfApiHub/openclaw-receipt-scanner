import type { PluginEntry } from "@anthropic/openclaw-plugin-sdk";

const API_BASE = "https://pdfapihub.com/api";

async function callApi(
  endpoint: string,
  body: Record<string, unknown>,
  apiKey: string
): Promise<unknown> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CLIENT-API-KEY": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(`PDFAPIHub API error (${res.status}): ${text}`);
    }
    throw new Error(
      `PDFAPIHub API error (${res.status}): ${(parsed as any).error || text}`
    );
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return {
    success: true,
    content_type: contentType,
    message: "Binary file returned. Use output='url' or output='base64' for usable results.",
  };
}

function getApiKey(config: Record<string, unknown>): string {
  const key = (config.apiKey as string) || "";
  if (!key) {
    throw new Error(
      "PDFAPIHub API key not configured. Get a free key at https://pdfapihub.com"
    );
  }
  return key;
}

function buildBody(params: Record<string, unknown>): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      body[key] = value;
    }
  }
  return body;
}

const plugin: PluginEntry = {
  id: "pdfapihub-receipt-scanner",
  name: "Receipt Scanner",
  register(api) {
    // ─── Scan Receipt ────────────────────────────────────────
    api.registerTool({
      name: "scan_receipt",
      description:
        "Scan and enhance a receipt photo. Improves contrast, sharpness, and readability. Outputs a clean, high-resolution color image at 300 DPI suitable for archiving or further OCR processing.",
      parameters: {
        type: "object",
        properties: {
          image_url: {
            type: "string",
            description: "URL of the receipt image to scan.",
          },
          base64_image: {
            type: "string",
            description: "Base64-encoded receipt image.",
          },
          output_format: {
            type: "string",
            enum: ["url", "base64"],
            description: "Output format. Default: 'url'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body: Record<string, unknown> = {
          ...buildBody(params),
          color_mode: "color",
          sharpen: true,
          dpi: 300,
        };
        if (!body.output_format) body.output_format = "url";
        return callApi("/v1/scan-enhance", body, apiKey);
      },
    });

    // ─── OCR Receipt ─────────────────────────────────────────
    api.registerTool({
      name: "ocr_receipt",
      description:
        "Extract text from a receipt image using OCR. Reads all visible text including store name, items, prices, tax, total, date, and payment method. Supports multiple languages. Applies grayscale and sharpening for best accuracy.",
      parameters: {
        type: "object",
        properties: {
          image_url: {
            type: "string",
            description: "URL of the receipt image.",
          },
          base64_image: {
            type: "string",
            description: "Base64-encoded receipt image.",
          },
          lang: {
            type: "string",
            description:
              "OCR language code (e.g. 'eng', 'deu', 'fra', 'spa'). Default: 'eng'.",
          },
          char_whitelist: {
            type: "string",
            description: "Restrict OCR to these characters only.",
          },
          detail: {
            type: "string",
            enum: ["text", "words"],
            description:
              "'text' returns full text block. 'words' returns individual words with positions. Default: 'text'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body: Record<string, unknown> = {
          ...buildBody(params),
          grayscale: true,
          sharpen: true,
        };
        if (!body.lang) body.lang = "eng";
        return callApi("/v1/image/ocr/parse", body, apiKey);
      },
    });

    // ─── Extract Receipt Amounts ─────────────────────────────
    api.registerTool({
      name: "extract_receipt_amounts",
      description:
        "Extract only numeric amounts and prices from a receipt image. Uses OCR with a character whitelist restricted to digits, dollar signs, commas, periods, hyphens, and percent signs. Ideal for extracting totals, subtotals, tax, and individual item prices.",
      parameters: {
        type: "object",
        properties: {
          image_url: {
            type: "string",
            description: "URL of the receipt image.",
          },
          base64_image: {
            type: "string",
            description: "Base64-encoded receipt image.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body: Record<string, unknown> = {
          ...buildBody(params),
          char_whitelist: "0123456789.$,-%",
          grayscale: true,
        };
        return callApi("/v1/image/ocr/parse", body, apiKey);
      },
    });

    // ─── Receipt to PDF ──────────────────────────────────────
    api.registerTool({
      name: "receipt_to_pdf",
      description:
        "Scan a receipt photo and convert it to an archival black-and-white PDF. Applies sharpening and high DPI (300) for crisp, print-ready output. Ideal for expense reports and record keeping.",
      parameters: {
        type: "object",
        properties: {
          image_url: {
            type: "string",
            description: "URL of the receipt image.",
          },
          base64_image: {
            type: "string",
            description: "Base64-encoded receipt image.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body: Record<string, unknown> = {
          ...buildBody(params),
          color_mode: "bw",
          dpi: 300,
          output_format: "pdf",
        };
        return callApi("/v1/scan-enhance", body, apiKey);
      },
    });
  },
};

export default plugin;
