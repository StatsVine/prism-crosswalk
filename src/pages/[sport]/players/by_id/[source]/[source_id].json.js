import players from '@data/exports/mlb/players/ids/players.json'

export async function GET({ params }) {
  const sourceId = params.source_id
  const source = params.source
  const sourcePrefixed = source + '_id'
  const player = players.find((p) => p[sourcePrefixed] === sourceId)

  if (!player) {
    return new Response(JSON.stringify({ error: 'Player not found' }), {
      status: 404,
    })
  }

  return new Response(JSON.stringify(player), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function getStaticPaths() {
  return players
    .map((player) => {
      const sourceIds = Object.keys(player).filter((k) => k.endsWith('_id'))
      return sourceIds
        .filter((sourceId) => player[sourceId] != null)
        .map((sourceId) => ({
          params: {
            sport: 'mlb',
            source: sourceId.replace('_id', ''),
            source_id: String(player[sourceId]),
            player_id: String(player['prism_id']),
          },
        }))
    })
    .flat()
}
