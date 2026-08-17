import fs from 'node:fs/promises'
import path from 'node:path'
import { getCachedData } from '@lib/fileCache'

const DATA_DIR = '_data/exports'
// The dataset served by the API endpoints. The `full` dataset is only offered
// as a bulk download.
const DATASET = 'ids'

const PREFIX = 'players.'
const SUFFIX = '_id.json'

// Every sport with an exports/<sport>/ directory, e.g. ['mlb', 'nfl'].
export const getSportNames = async () => await fs.readdir(DATA_DIR)

const getByIdDir = (sport) =>
  path.join(DATA_DIR, sport, 'players', DATASET, 'by_id')

export const getByIdPath = (sport, source) =>
  path.join(getByIdDir(sport), `${PREFIX}${source}${SUFFIX}`)

// Sources a sport is keyed by, derived from the by_id/ filenames, e.g.
// players.mlbam_id.json -> 'mlbam'. Includes 'prism'.
export const getSourceNames = async (sport) => {
  const files = await fs.readdir(getByIdDir(sport))
  return files
    .filter((file) => file.startsWith(PREFIX) && file.endsWith(SUFFIX))
    .map((file) => file.slice(PREFIX.length, -SUFFIX.length))
}

export const getSourceIds = async (sport, source) => {
  const data = await getCachedData(getByIdPath(sport, source))
  return Object.keys(data)
}

export const getPlayerData = async (sport, source, sourceId) => {
  let data
  try {
    data = await getCachedData(getByIdPath(sport, source))
  } catch {
    return undefined
  }
  return data[sourceId]
}

export function notFound() {
  return new Response(JSON.stringify({ error: 'Player not found' }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function playerResponse(player) {
  if (!player) {
    return notFound()
  }

  return new Response(JSON.stringify(player), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
