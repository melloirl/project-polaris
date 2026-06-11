import type { CharacterRecord, ResonanceStage } from '~/types/dossier'

export const uid = () => 'id' + Math.random().toString(36).slice(2, 9)

export function stageFor(stages: ResonanceStage[], pct: number): ResonanceStage {
  const bounded = Math.max(0, Math.min(100, pct | 0))
  return stages.find(stage => bounded >= stage.min && bounded <= stage.max) || stages[0] || { min: 0, max: 100, name: '-' }
}

export function nextThreshold(stages: ResonanceStage[], pct: number): string {
  const stage = stageFor(stages, pct)
  const index = stages.indexOf(stage)
  const next = stages[index + 1]
  return next ? `${next.min}% - ${next.name}` : '-'
}

export function karmaPath(value: number, labels: { eden: string, echologist: string, neutral: string }): string {
  return value < 0 ? labels.eden : value > 0 ? labels.echologist : labels.neutral
}

export function karmaStage(depth: Record<string, string>, names: Record<string, string>, value: number): string {
  return names[String(value)] || depth[String(value)] || '-'
}

export function signalMax(character: CharacterRecord): number {
  return Math.max(0, (character.attributes.vontade || 0) + 2 + (character.signal.maxMod || 0))
}

export function getPath(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((target, key) => {
    if (target == null || typeof target !== 'object') {
      return undefined
    }

    return (target as Record<string, unknown>)[key]
  }, source)
}

export function setPath(source: unknown, path: string, value: unknown): void {
  const keys = path.split('.')
  const last = keys.pop()

  if (!last) {
    return
  }

  let target = source as Record<string, unknown>
  for (const key of keys) {
    const next = target[key]
    if (next == null || typeof next !== 'object') {
      target[key] = {}
    }
    target = target[key] as Record<string, unknown>
  }

  target[last] = value
}

export function cloneRecord<T>(record: T): T {
  return JSON.parse(JSON.stringify(record)) as T
}
