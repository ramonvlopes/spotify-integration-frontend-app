import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { ArrowLeftIcon } from '@/commons/icons'
import { ArtistDetailHeader } from '@/containers/ArtistDetailHeader'
import { TopTracksSection } from '@/containers/TopTracksSection'
import { PopularityChart } from '@/containers/PopularityChart'
import { AlbumSection } from '@/containers/AlbumSection'

export function ArtistDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (!id) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="self-start">
          <ArrowLeftIcon />
          {t('back')}
        </Button>
        <ArtistDetailHeader artistId={id} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopTracksSection artistId={id} />
          <PopularityChart artistId={id} />
        </div>
        <AlbumSection artistId={id} />
      </main>
    </div>
  )
}
