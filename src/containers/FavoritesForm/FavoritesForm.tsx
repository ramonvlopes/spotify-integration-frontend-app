import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { favoritesSchema, type FavoritesFormData } from './FavoritesForm.schema'
import type { FavoritesFormProps } from './FavoritesForm.types'

export function FavoritesForm({ onAdd }: FavoritesFormProps) {
  const { t } = useTranslation('favorites')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FavoritesFormData>({
    resolver: zodResolver(favoritesSchema),
  })

  const onSubmit = (data: FavoritesFormData) => {
    onAdd(data)
    toast.success(t('added'))
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-text-primary">{t('addFavorite')}</h2>
      <Input
        label={t('artistName')}
        placeholder={t('artistName')}
        error={errors.artistName?.message}
        {...register('artistName')}
      />
      <Input
        label={t('trackName')}
        placeholder={t('trackName')}
        error={errors.trackName?.message}
        {...register('trackName')}
      />
      <Input
        label={t('albumName')}
        placeholder={t('albumName')}
        error={errors.albumName?.message}
        {...register('albumName')}
      />
      <Button type="submit" isLoading={isSubmitting} className="self-end">
        {t('save')}
      </Button>
    </form>
  )
}
