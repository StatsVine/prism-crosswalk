import players from '@data/exports/mlb/players/ids/by_id/players.prism_id.json'

export async function GET({ params }) {
  const playerId = params.player_id
  const player = players[playerId]

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
  const playerIds = Object.keys(players)

  return playerIds.map((id) => ({
    params: { sport: 'mlb', player_id: String(id) },
  }))
}
