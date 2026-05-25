const HOURS_PER_MONTH = 730;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MONTH = HOURS_PER_MONTH * SECONDS_PER_HOUR;
const MINUTES_PER_MONTH = HOURS_PER_MONTH * 60;

type Timeframe = "second" | "minute" | "hour" | "day" | "week" | "month";

const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  second: "/sec",
  minute: "/min",
  hour: "/hr",
  day: "/day",
  week: "/wk",
  month: "/mo",
};

/** Seconds of runtime represented by each billing period. */
const ELAPSED_SECONDS: Record<Timeframe, number> = {
  second: 1,
  minute: 60,
  hour: SECONDS_PER_HOUR,
  day: SECONDS_PER_HOUR * 24,
  week: SECONDS_PER_HOUR * 24 * 7,
  month: SECONDS_PER_MONTH,
};

/** Prorate monthly flat fees (storage, bandwidth) to shorter periods. */
const MONTHLY_PRORATION: Record<Timeframe, number> = {
  second: 1 / SECONDS_PER_MONTH,
  minute: 1 / MINUTES_PER_MONTH,
  hour: 1 / HOURS_PER_MONTH,
  day: 1 / 30,
  week: 7 / 30,
  month: 1,
};

type ProviderPricing = {
  cpuPerHour: number;
  ramPerGBPerHour: number;
  storagePerGBPerMonth: number;
  storagePerGBPerSecond?: number;
  bandwidthPerGB: number;
};

function computeCosts(
  pricing: ProviderPricing,
  cpu: number,
  ram: number,
  storage: number,
  bandwidth: number,
  timeframe: Timeframe,
) {
  const elapsed = ELAPSED_SECONDS[timeframe];
  const prorate = MONTHLY_PRORATION[timeframe];

  const cpuCost = cpu * pricing.cpuPerHour * (elapsed / SECONDS_PER_HOUR);
  const ramCost = ram * pricing.ramPerGBPerHour * (elapsed / SECONDS_PER_HOUR);

  const storageCost = pricing.storagePerGBPerSecond
    ? storage * pricing.storagePerGBPerSecond * elapsed
    : storage * pricing.storagePerGBPerMonth * prorate;

  const bandwidthCost = bandwidth * pricing.bandwidthPerGB * prorate;

  return {
    cpu: cpuCost,
    ram: ramCost,
    storage: storageCost,
    bandwidth: bandwidthCost,
    total: cpuCost + ramCost + storageCost + bandwidthCost,
  };
}

export function useSandboxPricing() {
  const appConfig = useAppConfig();

  const cpu = ref(1);
  const ram = ref(1);
  const storage = ref(10);
  const bandwidth = ref(10);
  const timeframe = ref<Timeframe>("month");

  const timeframeLabel = computed(() => TIMEFRAME_LABELS[timeframe.value]);

  const results = computed(() => {
    const providers = appConfig.sandboxes.providers;
    const period = timeframe.value;

    return providers
      .map((provider) => ({
        ...provider,
        costs: computeCosts(
          provider.pricing,
          cpu.value,
          ram.value,
          storage.value,
          bandwidth.value,
          period,
        ),
      }))
      .sort((a, b) => a.costs.total - b.costs.total);
  });

  function formatCost(value: number): string {
    if (!Number.isFinite(value) || value === 0) return "$0.00";

    const abs = Math.abs(value);
    if (abs >= 0.01) return `$${value.toFixed(2)}`;

    const decimals = Math.min(10, Math.ceil(-Math.log10(abs)) + 2);
    return `$${value.toFixed(decimals)}`;
  }

  return {
    cpu,
    ram,
    storage,
    bandwidth,
    timeframe,
    timeframeLabel,
    results,
    formatCost,
  };
}
