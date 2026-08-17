import {
  getPlayerData,
  getSourceIds,
  getSportNames,
  playerResponse,
} from '@lib/players'

const SOURCE = 'prism'

export function createHandler() {
  return async ({ params }) => {
    const player = await getPlayerData(params.sport, SOURCE, params.player_id)

    return playerResponse(player)
  }
}

export function createStaticPaths() {
  return async () => {
    const pages = []

    for (const sport of await getSportNames()) {
      for (const playerId of await getSourceIds(sport, SOURCE)) {
        pages.push({ params: { sport, player_id: playerId } })
      }
    }

    return pages
  }
}

export const GET = createHandler()
export const getStaticPaths = createStaticPaths()
