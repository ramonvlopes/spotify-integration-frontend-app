import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getArtistTopTracks } from '@/services/artists'
import { QUERY_KEYS } from '@/commons/constants'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import type { PopularityChartProps } from './PopularityChart.types'

export function PopularityChart({ artistId }: PopularityChartProps) {
  const { t } = useTranslation('artists')
  const { data: tracks, isLoading } = useQuery({
    queryKey: QUERY_KEYS.ARTIST_TOP_TRACKS(artistId),
    queryFn: () => getArtistTopTracks(artistId),
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  const chartData = (tracks ?? []).slice(0, 8).map((track) => ({
    name: track.name.length > 18 ? track.name.slice(0, 18) + '…' : track.name,
    popularity: track.popularity,
  }))

  return (
    <section>
      <h2 className="text-xl font-bold text-text-primary mb-4">{t('popularity')}</h2>
      <div className="bg-surface rounded-xl p-4 border border-border">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#A0A0B8', fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fill: '#A0A0B8', fontSize: 11 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#12121A',
                border: '1px solid #2A2A3E',
                borderRadius: 8,
              }}
              labelStyle={{ color: '#FFFFFF' }}
              itemStyle={{ color: '#1DB954' }}
            />
            <Bar dataKey="popularity" fill="#1DB954" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
