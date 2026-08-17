import {
  getPlayerData,
  getSourceIds,
  getSourceNames,
  getSportNames,
  playerResponse,
} from '@lib/players'

export function createHandler() {
  return async ({ params }) => {
    const player = await getPlayerData(
      params.sport,
      params.source,
      params.source_id,
    )

    return playerResponse(player)
  }
}

export function createStaticPaths() {
  return async () => {
    const pages = []

    for (const sport of await getSportNames()) {
      for (const source of await getSourceNames(sport)) {
        for (const sourceId of await getSourceIds(sport, source)) {
          pages.push({ params: { sport, source, source_id: sourceId } })
        }
      }
    }

    return pages
  }
}

export const GET = createHandler()
export const getStaticPaths = createStaticPaths()
