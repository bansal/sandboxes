export default defineAppConfig({
  sandboxes: {
    providers: [
      {
        id: "e2b",
        name: "E2B",
        url: "https://e2b.dev/pricing",
        color: "#FF8800",
        pricing: {
          cpuPerHour: 0.000014 * 3600,
          ramPerGBPerHour: 0.0000045 * 3600,
          storagePerGBPerMonth: 0,
          bandwidthPerGB: 0,
        },
        notes:
          "Per-second wall-clock billing while running. 10–20 GiB storage included. Network egress not metered separately.",
      },
      {
        id: "daytona",
        name: "Daytona",
        url: "https://www.daytona.io/pricing",
        color: "#0D0D0D",
        pricing: {
          cpuPerHour: 0.000014 * 3600,
          ramPerGBPerHour: 0.0000045 * 3600,
          storagePerGBPerMonth: 0,
          storagePerGBPerSecond: 0.00000003,
          bandwidthPerGB: 0,
        },
        notes:
          "Pay-as-you-go per second while running. First 5 GiB storage free. Stopped sandboxes bill storage only.",
      },
      {
        id: "deno-sandbox",
        name: "Deno Sandbox",
        url: "https://deno.com/deploy/pricing",
        color: "#70FFAF",
        pricing: {
          cpuPerHour: 0.05,
          ramPerGBPerHour: 0.016,
          storagePerGBPerMonth: 0.2,
          bandwidthPerGB: 0.5,
        },
        notes:
          "Firecracker microVMs on Deno Deploy. Usage draws from org-wide Deno Deploy quotas (Free: 15 CPU-h, 350 GB-h, 1 GiB storage, 20 GB egress/mo). Overage at listed rates. Default sandbox: 2 vCPU, 1.2 GiB RAM, 10 GiB disk.",
      },
      {
        id: "modal",
        name: "Modal Sandbox",
        url: "https://modal.com/products/sandboxes",
        color: "#7FEE64",
        pricing: {
          cpuPerHour: (0.00003942 * 3600) / 2,
          ramPerGBPerHour: 0.00000672 * 3600,
          storagePerGBPerMonth: 0,
          bandwidthPerGB: 0,
        },
        notes:
          "Non-preemptible sandbox rates. 1 physical core = 2 vCPUs. Billed per second while running; idle sandboxes cost nothing.",
      },
      {
        id: "vercel-sandbox",
        name: "Vercel Sandbox",
        url: "https://vercel.com/docs/vercel-sandbox/pricing",
        color: "#0070F3",
        pricing: {
          cpuPerHour: 0.128,
          ramPerGBPerHour: 0.0212,
          storagePerGBPerMonth: 0.08,
          bandwidthPerGB: 0.15,
        },
        notes:
          "Active CPU billing (I/O wait excluded). 2 GB RAM per vCPU. Memory billed for full wall-clock duration.",
      },
      {
        id: "railway",
        name: "Railway",
        url: "https://docs.railway.com/sandboxes",
        color: "#9558D4",
        pricing: {
          cpuPerHour: 0.00000001929012 * 3600,
          ramPerGBPerHour: 0.00000001929012 * 1024 * 3600,
          storagePerGBPerMonth: 0,
          bandwidthPerGB: 0.05,
        },
        notes:
          "Ephemeral Linux VMs billed per second for vCPU, memory, and egress. Idle sandboxes still consume resources.",
      },
      {
        id: "cloudflare-sandbox",
        name: "Cloudflare Sandbox",
        url: "https://developers.cloudflare.com/sandbox/platform/pricing/",
        color: "#F38020",
        pricing: {
          cpuPerHour: 0.00002 * 3600,
          ramPerGBPerHour: 0.0000025 * 3600,
          storagePerGBPerMonth: 0,
          storagePerGBPerSecond: 0.00000007,
          bandwidthPerGB: 0.025,
        },
        notes:
          "Built on Cloudflare Containers. Active CPU + provisioned memory/disk. 1 TB/mo egress included (NA/EU). $5/mo Workers Paid required.",
      },
      {
        id: "upstash-box",
        name: "Upstash Box",
        url: "https://upstash.com/pricing/box",
        color: "#00E9A3",
        pricing: {
          cpuPerHour: 0.1,
          ramPerGBPerHour: 0,
          storagePerGBPerMonth: 0.1,
          bandwidthPerGB: 0,
        },
        notes:
          "Active CPU hour billing at full utilization. RAM is preconfigured with each CPU tier (not billed separately). Auto-pauses when idle; storage persists at low cost.",
      },
      {
        id: "sprites",
        name: "Sprites",
        url: "https://sprites.dev/",
        color: "#6366F1",
        pricing: {
          cpuPerHour: 0.07,
          ramPerGBPerHour: 0.04375,
          storagePerGBPerMonth: 0.000027 * 730,
          storagePerGBPerSecond: 0.000027 / 3600,
          bandwidthPerGB: 0,
        },
        notes:
          "Stateful Firecracker VMs. Bills actual CPU, resident memory, and cold storage. No compute charges while idle.",
      },
      {
        id: "together",
        name: "Together AI",
        url: "https://www.together.ai/pricing#sandbox",
        color: "#0E56E8",
        pricing: {
          cpuPerHour: 0.0446,
          ramPerGBPerHour: 0.0149,
          storagePerGBPerMonth: 0,
          bandwidthPerGB: 0,
        },
        notes:
          "Code Sandbox: hourly vCPU and GiB RAM for VM sandboxes. Code Interpreter also available at $0.03 per 60-minute session.",
      },
      {
        id: "aws-lambda-microvm",
        name: "AWS Lambda MicroVM",
        url: "https://aws.amazon.com/lambda/pricing/",
        color: "#FF9900",
        pricing: {
          cpuPerHour: 0.0000276944 * 3600,
          ramPerGBPerHour: 0.0000036667 * 3600,
          storagePerGBPerMonth: 0.08,
          bandwidthPerGB: 0,
        },
        notes:
          "Graviton baseline compute billed per second while running. Default 2 GB / 1 vCPU (2:1 ratio); scales to 4× peak. Suspend preserves state without compute charges; snapshot read/write billed separately.",
      },
    ],
  },
});
