# Sandboxes

Compare cloud sandbox pricing across providers. Adjust CPU, memory, storage, and bandwidth requirements to find the best deal for your AI agent or code execution workload.

## Sandboxes

- **E2B** — Firecracker microVMs with per-second wall-clock billing
- **Daytona** — Pay-as-you-go sandboxes with persistent storage
- **Deno Sandbox** — Firecracker microVMs on Deno Deploy with network policy controls
- **Modal Sandbox** — Non-preemptible container sandboxes for AI workloads
- **Vercel Sandbox** — Active CPU billing with provisioned memory
- **Cloudflare Sandbox** — Edge sandboxes built on Cloudflare Containers
- **Upstash Box** — Active CPU billing with durable block storage
- **Sprites** — Stateful Firecracker VMs with granular usage billing
- **AWS Lambda MicroVM** — Graviton microVMs with per-second baseline compute and snapshot suspend/resume

## Adding a Sandbox

Sandbox definitions live in `app/app.config.ts`. Each entry includes:

- `id` — Unique slug
- `name` — Display name
- `url` — Link to the provider's pricing page
- `pricing` — Per-unit rates (`cpuPerHour`, `ramPerGBPerHour`, `storagePerGBPerMonth`, `bandwidthPerGB`)
- `notes` — Short description shown on the card

## Contributing

Contributions are welcome — whether it's fixing a pricing error, adding a new sandbox, or improving the UI.

### Getting Started

1. Fork the repository
2. Create a branch for your change (`git checkout -b my-change`)
3. Install dependencies with `pnpm install`
4. Start the dev server with `pnpm dev`
5. Make your changes and verify everything looks correct at `http://localhost:3000`
6. Commit your changes and open a pull request

### Updating Pricing

Sandbox pricing lives in `app/app.config.ts`. If you notice a price is wrong or outdated:

1. Find the sandbox entry in the `providers` array
2. Update the relevant fields under `pricing` or `notes`
3. Add a source link or date in your PR description so maintainers can verify

### Adding a New Sandbox

Add a new object to the `providers` array in `app/app.config.ts` following the existing format:

```ts
{
  id: "sandbox-slug",
  name: "Sandbox Name",
  url: "https://provider.com/pricing",
  color: "#hex",
  pricing: {
    cpuPerHour: 0,
    ramPerGBPerHour: 0,
    storagePerGBPerMonth: 0,
    bandwidthPerGB: 0,
  },
  notes: "Short description of the pricing model.",
}
```

All pricing should be normalized to **per-hour** (CPU, memory), **per-GB per-month** (storage), or **per-GB** (bandwidth). The composable in `app/composables/useSandboxPricing.ts` handles timeframe conversion automatically.

### Removing a Sandbox

If a provider shuts down or their sandbox offering no longer exists, open a PR removing its entry from `app/app.config.ts`.

### Guidelines

- Keep PRs focused — one sandbox or one fix per PR when possible
- Include a link to the provider's official pricing page as a source
- Test with different slider values to make sure the math is correct
- Run `pnpm build` before submitting to catch any build errors

## Disclaimer

Prices shown are approximate and may vary by region. Billing models differ between providers — some charge active CPU only, others bill wall-clock time. Free tiers, included allotments, and platform fees are not included. Always verify final pricing on the provider's official website.
