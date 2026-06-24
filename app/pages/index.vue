<script setup lang="ts">
useSeoMeta({
  title: "Compare Sandbox Pricing",
  description:
    "Compare cloud sandbox pricing across E2B, Daytona, Deno, Modal, Vercel, Cloudflare, AWS Lambda MicroVM, Upstash Box, and Sprites.",
});

const {
  cpu,
  ram,
  storage,
  bandwidth,
  timeframe,
  timeframeLabel,
  results,
  formatCost,
} = useSandboxPricing();

const colorMode = useColorMode();

const timeframeItems = [
  { label: "Second", value: "second" },
  { label: "Minute", value: "minute" },
  { label: "Hour", value: "hour" },
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

function toggleColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const costBarColors: Record<string, string> = {
  cpu: "bg-blue-500",
  ram: "bg-emerald-500",
  storage: "bg-amber-500",
  bandwidth: "bg-violet-500",
};

function getCostSegments(costs: Record<string, number>) {
  const total = costs.total ?? 0;
  if (total === 0) return [];
  return ["cpu", "ram", "storage", "bandwidth"]
    .filter((key) => (costs[key] ?? 0) !== 0)
    .map((key) => ({
      key,
      percent: ((costs[key] ?? 0) / total) * 100,
      color: costBarColors[key] ?? "bg-gray-500",
    }));
}

function getFaviconUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  } catch {
    return "";
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-muted">
    <header
      class="sticky top-0 z-50 bg-default/80 backdrop-blur-lg border-b border-default"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between"
      >
        <div class="flex items-center gap-2.5">
          <UIcon name="i-lucide-box" class="size-5 text-primary" />
          <span class="font-semibold text-highlighted">Sandboxes</span>
        </div>
        <div class="flex items-center gap-1">
          <UButton
            :icon="
              colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'
            "
            color="neutral"
            variant="ghost"
            size="sm"
            @click="toggleColorMode"
          />
          <UButton
            icon="i-lucide-github"
            to="https://github.com/bansal/sandboxes"
            target="_blank"
            color="neutral"
            variant="ghost"
            size="sm"
          />
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-8">
        <div class="text-center space-y-2">
          <h1 class="text-3xl sm:text-4xl font-bold text-highlighted">
            Compare Sandbox Pricing
          </h1>
          <p class="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Compare cloud sandbox pricing across providers. Adjust CPU, memory,
            storage, and bandwidth to find the best fit for your workload.
          </p>
        </div>

        <UCard>
          <div class="space-y-6">
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6"
            >
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label
                    class="text-sm font-medium text-highlighted flex items-center gap-1.5"
                  >
                    <UIcon name="i-lucide-cpu" class="size-4 text-blue-500" />
                    CPU
                  </label>
                  <span class="text-sm font-mono text-primary font-semibold">
                    {{ cpu }} vCPU
                  </span>
                </div>
                <USlider v-model="cpu" :min="0.25" :max="8" :step="0.25" />
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label
                    class="text-sm font-medium text-highlighted flex items-center gap-1.5"
                  >
                    <UIcon
                      name="i-lucide-memory-stick"
                      class="size-4 text-emerald-500"
                    />
                    Memory
                  </label>
                  <span class="text-sm font-mono text-primary font-semibold">
                    {{ ram }} GB
                  </span>
                </div>
                <USlider v-model="ram" :min="0.5" :max="32" :step="0.5" />
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label
                    class="text-sm font-medium text-highlighted flex items-center gap-1.5"
                  >
                    <UIcon
                      name="i-lucide-hard-drive"
                      class="size-4 text-amber-500"
                    />
                    Storage
                  </label>
                  <span class="text-sm font-mono text-primary font-semibold">
                    {{ storage }} GB
                  </span>
                </div>
                <USlider v-model="storage" :min="0" :max="100" :step="1" />
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label
                    class="text-sm font-medium text-highlighted flex items-center gap-1.5"
                  >
                    <UIcon
                      name="i-lucide-arrow-up-down"
                      class="size-4 text-violet-500"
                    />
                    Bandwidth
                  </label>
                  <span class="text-sm font-mono text-primary font-semibold">
                    {{ bandwidth }} GB
                  </span>
                </div>
                <USlider v-model="bandwidth" :min="0" :max="500" :step="1" />
              </div>
            </div>

            <USeparator />

            <div
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <label class="text-sm font-medium text-highlighted"
                >Billing Period</label
              >
              <URadioGroup
                v-model="timeframe"
                :items="timeframeItems"
                orientation="horizontal"
                variant="card"
                indicator="hidden"
                size="sm"
              />
            </div>
          </div>
        </UCard>

        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-highlighted">
              {{ results.length }} Sandboxes
            </h2>
            <span class="text-sm text-muted"
              >Sorted by price, lowest first</span
            >
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <UCard v-for="(result, index) in results" :key="result.id">
              <div class="space-y-4">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-3 min-w-0">
                    <UAvatar
                      :src="getFaviconUrl(result.url)"
                      :alt="result.name"
                      size="md"
                    />
                    <div class="min-w-0">
                      <h3
                        class="font-semibold text-highlighted truncate text-sm"
                      >
                        {{ result.name }}
                      </h3>
                      <span class="text-xs text-muted">#{{ index + 1 }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex items-baseline gap-1">
                    <span class="text-3xl font-bold text-highlighted">
                      {{ formatCost(result.costs.total) }}
                    </span>
                    <span class="text-sm text-muted">{{ timeframeLabel }}</span>
                  </div>
                </div>

                <div
                  v-if="getCostSegments(result.costs).length > 0"
                  class="h-2 rounded-full overflow-hidden flex flex-nowrap bg-muted/20"
                >
                  <div
                    v-for="segment in getCostSegments(result.costs)"
                    :key="segment.key"
                    :class="segment.color"
                    :style="{ width: segment.percent + '%' }"
                  />
                </div>

                <div class="space-y-1.5 text-xs">
                  <div
                    v-if="result.costs.cpu !== 0"
                    class="flex items-center justify-between"
                  >
                    <span class="text-muted flex items-center gap-1.5">
                      <span
                        class="inline-block size-2 rounded-full bg-blue-500"
                      />
                      CPU
                    </span>
                    <span class="font-mono text-default">
                      {{ formatCost(result.costs.cpu) }}
                    </span>
                  </div>
                  <div
                    v-if="result.costs.ram !== 0"
                    class="flex items-center justify-between"
                  >
                    <span class="text-muted flex items-center gap-1.5">
                      <span
                        class="inline-block size-2 rounded-full bg-emerald-500"
                      />
                      Memory
                    </span>
                    <span class="font-mono text-default">
                      {{ formatCost(result.costs.ram) }}
                    </span>
                  </div>
                  <div
                    v-if="result.costs.storage !== 0"
                    class="flex items-center justify-between"
                  >
                    <span class="text-muted flex items-center gap-1.5">
                      <span
                        class="inline-block size-2 rounded-full bg-amber-500"
                      />
                      Storage
                    </span>
                    <span class="font-mono text-default">
                      {{ formatCost(result.costs.storage) }}
                    </span>
                  </div>
                  <div
                    v-if="result.costs.bandwidth !== 0"
                    class="flex items-center justify-between"
                  >
                    <span class="text-muted flex items-center gap-1.5">
                      <span
                        class="inline-block size-2 rounded-full bg-violet-500"
                      />
                      Bandwidth
                    </span>
                    <span class="font-mono text-default">
                      {{ formatCost(result.costs.bandwidth) }}
                    </span>
                  </div>
                </div>

                <p class="text-xs text-muted leading-relaxed">
                  {{ result.notes }}
                </p>

                <UButton
                  :to="result.url"
                  target="_blank"
                  variant="ghost"
                  color="neutral"
                  size="xs"
                  trailing-icon="i-lucide-external-link"
                  :ui="{
                    trailingIcon: 'size-3',
                  }"
                >
                  View Pricing
                </UButton>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </main>

    <footer class="border-t border-default mt-8">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted space-y-2"
      >
        <p>
          Prices shown are approximate and may vary. Billing models differ —
          some providers charge active CPU only, others bill wall-clock time.
          Minimum and maximum resource limits may also differ by provider.
          Additional charges may apply for requests, regional bandwidth, ingress
          traffic, IP addresses, and similar resources. Some providers require
          a paid plan before you can get started. Free tiers, included
          allotments, and platform fees are not included. Always verify final
          pricing on the provider's official website.
        </p>
        <p>
          This project is open source. Found incorrect pricing, want to add a
          new sandbox, or remove an outdated one? Contribute on
          <UButton
            to="https://github.com/bansal/sandboxes"
            target="_blank"
            variant="link"
            size="xs"
            class="align-baseline"
          >
            GitHub </UButton
          >.
        </p>
      </div>
    </footer>
  </div>
</template>
