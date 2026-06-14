export interface RangedControlOptions {
  modelValue: number
  min: number
  max: number
  signed?: boolean
}

export function clampRange(value: number, min: number, max: number): number {
  const lower = Math.min(min, max)
  const upper = Math.max(min, max)
  return Math.max(lower, Math.min(upper, Number.isFinite(value) ? value : lower))
}

export function formatSignedValue(value: number, signed = false): string {
  return signed && value >= 0 ? `+${value}` : String(value)
}

export function useRangedControl(options: () => RangedControlOptions) {
  const boundedValue = computed(() => {
    const current = options()
    return clampRange(Number(current.modelValue) || 0, current.min, current.max)
  })

  const formattedValue = computed(() => {
    const current = options()
    return formatSignedValue(boundedValue.value, current.signed)
  })

  const isAtMin = computed(() => {
    const current = options()
    return boundedValue.value <= Math.min(current.min, current.max)
  })

  const isAtMax = computed(() => {
    const current = options()
    return boundedValue.value >= Math.max(current.min, current.max)
  })

  function stepBy(delta: number) {
    const current = options()
    return clampRange(boundedValue.value + delta, current.min, current.max)
  }

  return {
    boundedValue,
    formattedValue,
    isAtMin,
    isAtMax,
    stepBy,
  }
}
